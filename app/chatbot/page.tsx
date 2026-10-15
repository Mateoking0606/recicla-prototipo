 
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Mensaje = {
  rol: "usuario" | "asistente";
  texto: string;
};

export default function ChatbotPage() {
  const [pregunta, setPregunta] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      rol: "asistente",
      texto:
        "¡Hola! ♻️ Soy el asistente inteligente de ReCicla. Pregúntame sobre envases y empaques plásticos postconsumo, tipos de plástico o cómo separar tus residuos.",
    },
  ]);
  const [cargando, setCargando] = useState(false);

  async function enviarMensaje(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const texto = pregunta.trim();

    if (!texto || cargando) return;

    if (texto.length > 2000) {
      alert("La pregunta no puede superar los 2000 caracteres.");
      return;
    }

    setMensajes((anteriores) => [
      ...anteriores,
      { rol: "usuario", texto },
    ]);
    setPregunta("");
    setCargando(true);

    try {
      const respuesta = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensaje: texto }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || "No se pudo obtener respuesta.");
      }

      setMensajes((anteriores) => [
        ...anteriores,
        { rol: "asistente", texto: datos.respuesta },
      ]);
    } catch (error) {
      const detalle =
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado.";

      setMensajes((anteriores) => [
        ...anteriores,
        {
          rol: "asistente",
          texto: `No pude responder en este momento. ${detalle}`,
        },
      ]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "70px 24px",
        background: "#f4f8f5",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{ color: "#176b45", fontWeight: 700 }}
        >
          ← Volver al inicio
        </Link>

        <h1
          style={{
            color: "#134c35",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            marginTop: "35px",
          }}
        >
          🤖 Asistente inteligente ReCicla
        </h1>

        <p
          style={{
            color: "#526b60",
            fontSize: "18px",
            marginTop: "15px",
            lineHeight: 1.7,
          }}
        >
          Aprende sobre residuos plásticos postconsumo,
          identifica materiales y descubre cómo separarlos
          correctamente.
        </p>

        <section
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "25px",
            marginTop: "35px",
            border: "1px solid #dce9df",
            boxShadow: "0 10px 35px rgba(19,76,53,0.06)",
          }}
        >
          <h2
            style={{
              color: "#134c35",
              fontSize: "23px",
              marginBottom: "20px",
            }}
          >
            ♻️ Chat con ReCicla IA
          </h2>

          <div
            aria-live="polite"
            style={{
              minHeight: "300px",
              maxHeight: "450px",
              overflowY: "auto",
              background: "#f8fbf9",
              borderRadius: "15px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {mensajes.map((mensaje, indice) => (
              <div
                key={indice}
                style={{
                  alignSelf:
                    mensaje.rol === "usuario"
                      ? "flex-end"
                      : "flex-start",
                  background:
                    mensaje.rol === "usuario"
                      ? "#176b45"
                      : "#e5f2e9",
                  color:
                    mensaje.rol === "usuario"
                      ? "white"
                      : "#134c35",
                  padding: "14px 18px",
                  borderRadius: "15px",
                  maxWidth: "85%",
                  lineHeight: 1.7,
                  whiteSpace: "normal",
                  overflowWrap: "anywhere",
                }}
              >
                <strong>
                  {mensaje.rol === "usuario"
                    ? "Tú"
                    : "🤖 ReCicla IA"}
                </strong>
                <div style={{ marginTop: "6px" }}>
                  {mensaje.rol === "asistente" ? (
  <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    p: ({ children }) => (
      <p style={{ margin: "4px 0", lineHeight: 1.5 }}>
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 style={{ margin: "10px 0 5px" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ margin: "8px 0 4px" }}>
        {children}
      </h3>
    ),
    ol: ({ children }) => (
      <ol style={{ margin: "5px 0", paddingLeft: "22px" }}>
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul style={{ margin: "5px 0", paddingLeft: "22px" }}>
        {children}
      </ul>
    ),
    table: ({ children }) => (
  <div
    style={{
      width: "100%",
      overflowX: "auto",
      margin: "15px 0",
      borderRadius: "10px",
      border: "1px solid #c9ded0",
    }}
  >
    <table
      style={{
        width: "100%",
        minWidth: "650px",
        borderCollapse: "collapse",
        fontSize: "14px",
        lineHeight: 1.5,
      }}
    >
      {children}
    </table>
  </div>
),
th: ({ children }) => (
  <th
    style={{
      padding: "12px",
      background: "#176b45",
      color: "white",
      textAlign: "left",
      borderBottom: "1px solid #c9ded0",
    }}
  >
    {children}
  </th>
),
td: ({ children }) => (
  <td
    style={{
      padding: "12px",
      borderBottom: "1px solid #c9ded0",
      verticalAlign: "top",
    }}
  >
    {children}
  </td>
),
    li: ({ children }) => (
  <li
    style={{
      marginBottom: "2px",
      lineHeight: 1.4,
    }}
  >
    {children}
  </li>
),
  }}
>
  {mensaje.texto}
</ReactMarkdown>
) : (
  mensaje.texto
)}
                </div>
              </div>
            ))}

            {cargando && (
              <p style={{ color: "#176b45" }}>
                ♻️ ReCicla está preparando su respuesta...
              </p>
            )}
          </div>

          <form
            onSubmit={enviarMensaje}
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              value={pregunta}
              onChange={(evento) =>
                setPregunta(evento.target.value)
              }
              placeholder="Ejemplo: ¿Cómo puedo reciclar una botella PET?"
              maxLength={2000}
              aria-label="Escribe tu pregunta"
              style={{
                flex: "1 1 250px",
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #c9ded0",
                fontSize: "16px",
                color: "#134c35",
                background: "white",
              }}
            />

            <button
              type="submit"
              disabled={cargando || !pregunta.trim()}
              style={{
                background: "#176b45",
                color: "white",
                padding: "15px 25px",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: 700,
                cursor: cargando ? "wait" : "pointer",
                opacity:
                  cargando || !pregunta.trim() ? 0.6 : 1,
              }}
            >
              {cargando ? "Pensando..." : "Enviar ➤"}
            </button>
          </form>

          <p
            style={{
              color: "#72877b",
              fontSize: "13px",
              marginTop: "18px",
            }}
          >
            ReCicla IA ofrece orientación educativa.
            Confirma los puntos de entrega y las condiciones
            de reciclaje con las organizaciones locales.
          </p>
        </section>
      </div>
    </main>
  );
}
