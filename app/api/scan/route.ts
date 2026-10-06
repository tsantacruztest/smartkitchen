import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    // 1. Verificación e inicialización dinámica de la clave de API de Google
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Error crítico: La variable GEMINI_API_KEY no está configurada en Vercel.");
      return NextResponse.json(
        { error: "El servidor no tiene configuradas las credenciales de Inteligencia Artificial." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // 2. Extracción segura de la imagen enviada por el cliente
    const data = await req.json();
    const { imageBase64 } = data;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No se proporcionó ninguna imagen para escanear." },
        { status: 400 }
      );
    }

    const prompt = `
      Actúa como un extractor experto de ingredientes de cocina. 
      Analiza detalladamente la imagen proporcionada (puede ser una foto de una heladera, ingredientes sueltos sobre la mesa o un ticket impreso de compra del supermercado).
      
      Debes identificar todos los ingredientes alimenticios comestibles y devolverlos en una lista JSON estructurada.
      
      Reglas estrictas de extracción:
      1. Traduce o escribe todos los nombres de los ingredientes en ESPAÑOL, en minúsculas y en singular (ej. si dice 'tomates', extrae 'tomate').
      2. Si es un ticket de compra, ignora los precios, códigos de barra, fechas, marcas de limpieza y nombres de tiendas. Extrae únicamente los alimentos.
      3. Para las cantidades, haz una estimación razonable si es una foto. Si es un ticket, extrae la cantidad comprada. Si no se puede deducir, pon 1 de forma predeterminada.
    `;

    // 3. Consulta a la API de Google utilizando el modelo de producción ultra estable
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Modelo estándar oficial de producción para análisis visual masivo
      contents: [
        prompt,
        {
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64,
          },
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ingredients: {
              type: Type.ARRAY,
              description: "Lista de ingredientes detectados en la imagen",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: {
                    type: Type.STRING,
                    description: "Nombre del ingrediente en español, minúsculas y singular. Ej: 'tomate', 'pollo', 'leche'.",
                  },
                  quantity: {
                    type: Type.INTEGER,
                    description: "Cantidad estimada o leída del ingrediente. Si no se sabe, 1.",
                  },
                },
                required: ["name", "quantity"],
              },
            },
          },
          required: ["ingredients"],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("La IA no devolvió texto legible.");
    }

    const parsedData = JSON.parse(responseText);
    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error("Error en la ruta de escaneo con Gemini en producción:", error);
    return NextResponse.json(
      { error: "Hubo un error al procesar la imagen con Inteligencia Artificial." },
      { status: 500 }
    );
  }
}
