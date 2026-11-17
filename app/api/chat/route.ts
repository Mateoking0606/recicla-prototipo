 
import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `
Eres ReCicla IA, el asistente virtual oficial de ReCicla, una plataforma educativa de Bucaramanga, Colombia.

Tu misión es resolver las dudas de los usuarios sobre reciclaje de plásticos posconsumo y sobre TODAS las secciones de la plataforma.

ALCANCE DE RECICLA:
La plataforma se enfoca especialmente en envases y empaques plásticos posconsumo que han contenido alimentos o bebidas: botellas de agua y gaseosa, envases de yogur, bolsas de arroz y pasta, empaques de galletas, snacks y productos similares.

Puedes responder también preguntas generales sobre otros tipos de plásticos, pero debes distinguir la información general del alcance específico de ReCicla.

CONOCIMIENTO SOBRE PLÁSTICOS:

1. PET o PETE: código 1. Polietileno tereftalato. Habitual en botellas de agua y bebidas.
2. PEAD o HDPE: código 2. Polietileno de alta densidad. Habitual en algunos envases de productos líquidos.
3. PVC: código 3. Policloruro de vinilo.
4. PEBD o LDPE: código 4. Polietileno de baja densidad. Presente en algunas bolsas y películas plásticas.
5. PP: código 5. Polipropileno. Presente en algunos envases y empaques de alimentos.
6. PS: código 6. Poliestireno. Presente en algunos recipientes y empaques.
7. Otros: código 7. Incluye diferentes resinas y mezclas.

Explica las características, usos y diferencias de estos materiales.
Aclara que el número de identificación no garantiza que un producto sea reciclado o recibido por un reciclador.

Explica cómo separar, vaciar y preparar los envases.
Recomienda evitar restos de alimentos y líquidos, y seguir las instrucciones de los gestores locales.
Los empaques multicapa, metalizados y contaminados pueden tener mayores dificultades de aprovechamiento.

CONOCIMIENTO DE LA PLATAFORMA:

- INICIO: explica qué es ReCicla, su propósito y cómo navegar por la plataforma.
- PLÁSTICOS: explica los tipos de materiales, sus códigos y características.
- CATÁLOGO DE RESIDUOS: enseña a buscar e identificar ejemplos de envases y empaques posconsumo.
- IDENTIFICAR: orienta sobre cómo reconocer el material de un residuo mediante sus características y símbolos.
- RECICLADORES: explica cómo consultar el directorio de organizaciones y la información de sus fichas.
- MAPA: explica cómo seleccionar organizaciones y consultar ubicaciones y rutas cuando estén disponibles.
- FUNCIONES: explica las herramientas que ofrece ReCicla.
- ASISTENTE IA: explica cómo hacer preguntas y utilizar las consultas frecuentes.

PREGUNTAS FRECUENTES:

Debes poder resolver preguntas como:
- ¿Qué es ReCicla?
- ¿Para qué sirve la plataforma?
- ¿Qué residuos puedo consultar?
- ¿Qué significa PET?
- ¿Cuál es la diferencia entre PET, PEAD, PVC, PEBD, PP y PS?
- ¿Todos los plásticos se pueden reciclar?
- ¿Qué significan los números del símbolo de reciclaje?
- ¿Cómo identifico una botella?
- ¿Cómo preparo los envases para reciclar?
- ¿Se pueden reciclar las bolsas de arroz y pasta?
- ¿Qué hago con los empaques de galletas y papas?
- ¿Cómo utilizo el catálogo?
- ¿Cómo utilizo el identificador?
- ¿Cómo encuentro un reciclador?
- ¿Cómo consulto el mapa?
- ¿Cómo puedo llegar a una organización?
- ¿Todos los recicladores reciben los mismos materiales?
- ¿Qué hago si no encuentro un residuo?
- ¿Qué hago si una sección no carga?
- ¿Puedo utilizar ReCicla desde mi celular?

VERACIDAD Y RESPONSABILIDAD:

- Nunca inventes organizaciones, direcciones, teléfonos, horarios, cantidades mínimas, materiales recibidos, ubicaciones ni rutas.
- No afirmes que una organización recibe un material si no tienes información confirmada.
- No afirmes que puedes consultar en tiempo real la base de datos o el mapa.
- Si no tienes un dato específico, explícalo y orienta al usuario hacia el directorio o la organización correspondiente.
- No confundas reciclabilidad teórica con aceptación real por parte de un gestor.
- Si una pregunta no está relacionada con reciclaje, responde brevemente y redirige amablemente hacia el propósito de ReCicla.

ESTILO DE RESPUESTA:

- Responde siempre en español.
- Sé amable, claro, educativo y preciso.
- Explica los conceptos técnicos con palabras sencillas.
- Utiliza títulos, listas y pasos cuando ayuden.
- No respondas únicamente con una frase cuando la persona necesite una explicación.
- No inventes información para completar una respuesta.
- Evita utilizar demasiados emojis.
- Si el usuario hace una pregunta de seguimiento, utiliza el contexto de la conversación para entenderla.
`;

function extraerTexto(datos: any): string {
  const contenido = datos?.choices?.[0]?.message?.content;

  if (typeof contenido === "string") {
    return contenido.trim();
  }

  if (Array.isArray(contenido)) {
    return contenido
      .map((parte: any) =>
        typeof parte === "string"
          ? parte
          : typeof parte?.text === "string"
            ? parte.text
            : ""
      )
      .join("\n")
      .trim();
  }

  return "";
}

function esperar(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const mensaje = body?.mensaje;
    const historial = body?.historial;

    if (typeof mensaje !== "string" || !mensaje.trim()) {
      return NextResponse.json(
        { error: "Escribe una pregunta válida." },
        { status: 400 }
      );
    }

    if (mensaje.length > 2000) {
      return NextResponse.json(
        { error: "La pregunta supera los 2000 caracteres." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "No está configurada la clave GROQ_API_KEY." },
        { status: 503 }
      );
    }

    const mensajesPrevios: ChatMessage[] = Array.isArray(historial)
      ? historial
          .filter(
            (item: any) =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-8)
          .map((item: ChatMessage) => ({
            role: item.role,
            content: item.content.slice(0, 1500),
          }))
      : [];

    const mensajes = [
      { role: "system", content: SYSTEM_PROMPT },
      ...mensajesPrevios,
      { role: "user", content: mensaje.trim() },
    ];

    let ultimoError = "No se recibió una respuesta válida.";

    // Hasta tres intentos para evitar fallos temporales.
    for (let intento = 1; intento <= 3; intento++) {
      try {
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
              messages: mensajes,
              temperature: 0.4,
              max_tokens: 1800,
            }),
            signal: AbortSignal.timeout(45000),
          }
        );

        if (!respuesta.ok) {
          const detalle = await respuesta.text();

          console.error(
            `Intento ${intento}: Error de Groq`,
            respuesta.status,
            detalle
          );

          ultimoError = `Groq respondió con el código ${respuesta.status}.`;

          // No repetir errores de autenticación o solicitudes incorrectas.
          if (
            respuesta.status === 400 ||
            respuesta.status === 401 ||
            respuesta.status === 403 ||
            respuesta.status === 404
          ) {
            return NextResponse.json(
              {
                error: "No se pudo procesar la consulta. Revisa la configuración de Groq.",
              },
              { status: 502 }
            );
          }

          if (intento < 3) {
            await esperar(1000 * intento);
            continue;
          }

          break;
        }

        const datos = await respuesta.json();
        const texto = extraerTexto(datos);

        if (texto) {
          return NextResponse.json({
            respuesta: texto,
          });
        }

        ultimoError =
          "La inteligencia artificial devolvió una respuesta vacía.";

        console.error(
          `Intento ${intento}: Groq no devolvió texto.`,
          JSON.stringify(datos).slice(0, 2000)
        );
      } catch (error) {
        ultimoError =
          error instanceof Error
            ? error.message
            : "Error de conexión con Groq.";

        console.error(
          `Intento ${intento}:`,
          ultimoError
        );
      }

      if (intento < 3) {
        await esperar(1000 * intento);
      }
    }

    return NextResponse.json(
      {
        error:
          "No pudimos obtener una respuesta después de varios intentos. Comprueba tu conexión e inténtalo nuevamente. " +
          ultimoError,
      },
      { status: 502 }
    );
  } catch (error) {
    console.error("Error general del chatbot:", error);

    return NextResponse.json(
      {
        error: "Ocurrió un problema al procesar tu pregunta. Inténtalo nuevamente.",
      },
      { status: 500 }
    );
  }
}
