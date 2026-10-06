import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

// 1. Importamos tu lista oficial de ingredientes para que la IA la use como diccionario corrector
import { ingredientsList } from "@/lib/ingredients";

// Función auxiliar para forzar una pausa en milisegundos de forma asíncrona
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Error crítico: La variable GEMINI_API_KEY no está configurada en Vercel.");
      return NextResponse.json(
        { error: "El servidor no tiene configuradas las credenciales de Inteligencia Artificial." },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const data = await req.json();
    const { imageBase64 } = data;

    if (!imageBase64) {
      return NextResponse.json(
        { error: "No se proporcionó ninguna imagen para escanear." },
        { status: 400 }
      );
    }

    // Convertimos tu lista de ingredientes en un texto legible para la IA
    const listaOficialTexto = ingredientsList.join(", ");

    // 2. MEJORA DEL PROMPT: Le entregamos la lista oficial y le ordenamos normalizar los datos
    const prompt = `
      Actúa como un extractor experto de ingredientes de cocina y un normalizador de datos estricto.
      Analiza detalladamente la imagen proporcionada (foto de heladera, alacena o un ticket de supermercado).
      
      Debes identificar todos los alimentos comestibles y devolverlos en una lista JSON estructurada.
      
      REGLAS DE EXTRACCIÓN Y NORMALIZACIÓN ABSOLUTAS:
      1. COMPARACIÓN OBLIGATORIA: Te proporciono una lista de ingredientes oficiales válidos en nuestra aplicación: [${listaOficialTexto}].
         Cada vez que identifiques un alimento en la imagen o ticket, debes buscar su equivalente exacto o más cercano en esa lista oficial.
         - Si el ticket dice abreviaturas o marcas (ej. "tmt perita", "puré arcor", "pllo trozado"), debes transformarlo e inyectarlo usando el término exacto de la lista oficial (ej. "tomate", "puré de tomate", "pollo").
         - Escribe los nombres estrictamente en ESPAÑOL, en minúsculas y en singular.
      2. EXCLUSIÓN: Si es un ticket de compra, ignora por completo los precios, subtotales, fechas, números de sucursal, productos de limpieza (ej. detergente, champú), bolsas y marcas de consumo no comestibles. Extrae ÚNICAMENTE alimentos.
      3. CANTIDADES: Si es un ticket, lee la cantidad comprada que figura al inicio de la línea. Si es una foto de heladera, haz una estimación lógica. Si no se puede deducir, coloca 1 por defecto.
    `;
    // Variables para el control de reintentos en producción
    let response;
    const maxRetries = 3;
    let baseDelay = 1000; // Empezamos esperando 1 segundo si falla

    for (let i = 0; i < maxRetries; i++) {
      try {
        // 3. Consulta a la API utilizando el modelo de producción masivo y estable
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash", // <-- CORREGIDO: Modelo oficial súper estable
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
                  description: "Lista de ingredientes detectados y normalizados según el diccionario oficial",
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: {
                        type: Type.STRING,
                        description: "Nombre del ingrediente mapeado obligatoriamente a la lista oficial provista.",
                      },
                      quantity: {
                        type: Type.INTEGER,
                        description: "Cantidad extraída o estimada del alimento.",
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

        // Si la consulta fue exitosa, rompemos el bucle de reintentos
        break;
      } catch (apiError: any) {
        console.warn(`Intento ${i + 1} fallido por saturación externa de la API.`, apiError.message);
        
        // Si ya es el último intento, lanzamos el error hacia el catch principal
        if (i === maxRetries - 1) throw apiError;
        
        // Espera incremental (backoff): 1s, luego 2s antes del último intento
        await delay(baseDelay * (i + 1));
      }
    }

    const responseText = response?.text;
    if (!responseText) {
      throw new Error("La IA no devolvió texto legible.");
    }

    const parsedData = JSON.parse(responseText);
    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error("Error final en la ruta de escaneo con Gemini en producción:", error);
    return NextResponse.json(
      { error: "La IA de Google está muy saturada en este momento. Por favor, intenta de nuevo en unos segundos." },
      { status: 500 }
    );
  }
}
