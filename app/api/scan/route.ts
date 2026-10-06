// 1. Forzar a Node.js a omitir la validación estricta de certificados SSL en desarrollo local
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// 2. Importaciones únicas
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    // CORRECCIÓN: Inicializamos la Inteligencia Artificial de Google aquí adentro, usando la clave de producción
    const apiKey = process.env.GEMINI_API_KEY;
    const ai = new GoogleGenAI({ apiKey });

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

    // Llamamos a la API de Google Gemini pasándole la imagen y las instrucciones con el modelo solicitado
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
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
    console.error("Error en la ruta de escaneo con Gemini:", error);
    return NextResponse.json(
      { error: "Hubo un error al procesar la imagen con Inteligencia Artificial." },
      { status: 500 }
    );
  }
}
