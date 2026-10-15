 
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { mensaje } = await request.json();

    if (typeof mensaje !== "string" || !mensaje.trim()) {
      return NextResponse.json(
        { error: "Escribe una pregunta válida." },
        { status: 400 }
      );
    }

    if (mensaje.length > 2000) {
      return NextResponse.json(
        { error: "La pregunta es demasiado larga." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Falta configurar la clave de Groq." },
        { status: 503 }
      );
    }

    const respuesta = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
model: "openai/gpt-oss-20b",

          messages: [
            {
              role: "system",
              content: `Eres el asistente inteligente de ReCicla,
una plataforma educativa de Bucaramanga, Colombia.

Tu especialidad son los residuos plásticos postconsumo
de envases y empaques de alimentos y bebidas.

Responde siempre en español, de forma clara, amable
y con información técnicamente responsable.

Ayuda a identificar materiales como PET, HDPE,
PVC, LDPE, PP, PS y otros plásticos.

Explica cómo separar, limpiar y disponer los residuos.
Aclara que la reciclabilidad depende del material,
su estado y la infraestructura local.

No inventes direcciones, horarios ni organizaciones
recicladoras. Cuando corresponda, recomienda
verificar la información con cada organización.`,
            },
            {
              role: "user",
              content: mensaje.trim(),
            },
          ],
          temperature: 0.5,
          max_tokens: 1500,
        }),
      }
    );

    
if (!respuesta.ok) {
  const detalle = await respuesta.text();

  console.error("Error de Groq:", respuesta.status, detalle);

  return NextResponse.json(
    {
      error: `Groq respondió con el código ${respuesta.status}. Revisa la terminal de VS Code.`,
    },
    { status: 502 }
  );
}


    const datos = await respuesta.json();

    const texto = datos.choices?.[0]?.message?.content;

    if (typeof texto !== "string") {
      return NextResponse.json(
        { error: "El asistente no devolvió una respuesta válida." },
        { status: 502 }
      );
    }

    return NextResponse.json({ respuesta: texto });
  } catch {
    return NextResponse.json(
      { error: "Ocurrió un error al procesar la pregunta." },
      { status: 500 }
    );
  }
}
