 
"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./chatbot.css";

type Mensaje = { rol: "usuario" | "asistente"; texto: string };
type Categoria = { nombre: string; icono: string; preguntas: string[] };

const categorias: Categoria[] = [
  {
    nombre: "Conoce ReCicla",
    icono: "⌂",
    preguntas: [
      "¿Qué es ReCicla y para qué sirve?",
      "¿Qué tipo de residuos puedo consultar en la plataforma?",
      "¿Cómo puedo aprovechar todas las funciones de ReCicla?",
    ],
  },
  {
    nombre: "Tipos de plástico",
    icono: "◈",
    preguntas: [
      "¿Qué significa PET y dónde puedo encontrarlo?",
      "¿Cuál es la diferencia entre PET, PEAD, PVC, PEBD y PP?",
      "¿Qué significa el número que aparece dentro del símbolo de reciclaje?",
      "¿Todos los plásticos se pueden reciclar?",
    ],
  },
  {
    nombre: "Catálogo de residuos",
    icono: "▤",
    preguntas: [
      "¿Cómo busco un residuo en el catálogo?",
      "¿Las bolsas de arroz y pasta se pueden reciclar?",
      "¿Qué hago con los empaques de galletas y papas?",
      "¿Cómo preparo una botella de agua para reciclarla?",
    ],
  },
  {
    nombre: "Recicladores y mapa",
    icono: "⌖",
    preguntas: [
      "¿Cómo encuentro un reciclador en Bucaramanga?",
      "¿Cómo puedo consultar una ruta en el mapa?",
      "¿Todos los recicladores reciben los mismos materiales?",
      "¿Qué hago si una organización no aparece en el mapa?",
    ],
  },
  {
    nombre: "Ayuda con la plataforma",
    icono: "?",
    preguntas: [
      "¿Cómo utilizo el identificador de plásticos?",
      "¿Qué hago si no encuentro un residuo?",
      "¿Puedo utilizar ReCicla desde mi celular?",
      "¿Qué hago si una sección no carga?",
    ],
  },
];

function IlustracionReciclaje() {
  return (
    <svg className="eco-illustration" viewBox="0 0 330 230" role="img" aria-label="Ilustración de reciclaje con envases y hojas">
      <defs>
        <linearGradient id="ecoBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e9f7ed" />
          <stop offset="1" stopColor="#ccebd6" />
        </linearGradient>
        <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b9e6ce" />
          <stop offset="1" stopColor="#65b98a" />
        </linearGradient>
      </defs>
      <circle cx="165" cy="112" r="103" fill="url(#ecoBg)" />
      <circle cx="165" cy="112" r="83" fill="#f8fff9" opacity=".72" />
      <path d="M55 174c22-29 36-31 53-24-5 24-22 39-53 24Z" fill="#65ad79" />
      <path d="M62 174c16-11 27-17 42-21" fill="none" stroke="#e9f7ed" strokeWidth="3" strokeLinecap="round" />
      <path d="M250 65c-4-25 9-39 34-42 2 25-9 39-34 42Z" fill="#4d9d68" />
      <path d="M251 63c9-14 18-23 29-32" fill="none" stroke="#e9f7ed" strokeWidth="3" strokeLinecap="round" />
      <path d="M90 193c20-12 40-17 75-17s57 5 76 17" fill="none" stroke="#9acda8" strokeWidth="5" strokeLinecap="round" />
      <g transform="translate(108 63)">
        <path d="M31 0h24v15l9 13v87c0 8-6 14-14 14H22c-8 0-14-6-14-14V28l9-13V0h14" fill="url(#bottle)" stroke="#34845a" strokeWidth="3" strokeLinejoin="round" />
        <path d="M27 0h32v15H27z" fill="#34845a" />
        <path d="M13 51h52v34H13z" fill="#f5fff7" opacity=".9" />
        <path d="M29 68c5-11 16-11 21 0-5 11-16 11-21 0Z" fill="#58a974" />
        <path d="M40 58v20" stroke="#58a974" strokeWidth="2" />
        <path d="M18 104h42" stroke="#e7fff0" strokeWidth="3" opacity=".7" />
      </g>
      <g transform="translate(190 116)">
        <path d="M0 13h63l-6 70H7L0 13Z" fill="#f2c879" stroke="#c18c39" strokeWidth="3" strokeLinejoin="round" />
        <path d="M-2 13h67V2H-2z" fill="#dba84e" stroke="#c18c39" strokeWidth="3" />
        <path d="M16 39c8-13 22-13 30 0-8 13-22 13-30 0Z" fill="#fff7df" />
        <path d="M31 27v25" stroke="#c18c39" strokeWidth="2" />
      </g>
      <path d="M75 90c-17-5-25-17-22-34 17 3 26 15 22 34Z" fill="#78bd87" />
      <path d="M75 89c-5-12-11-20-19-28" fill="none" stroke="#e9f7ed" strokeWidth="2" />
      <path d="M258 151c18-7 30-1 36 15-16 8-29 2-36-15Z" fill="#78bd87" />
    </svg>
  );
}

export default function ChatbotPage() {
  const [pregunta, setPregunta] = useState("");
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [cargando, setCargando] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("Conoce ReCicla");
  const [mostrarPreguntas, setMostrarPreguntas] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [mensajes, cargando]);

  async function enviarPregunta(textoRecibido: string) {
    const texto = textoRecibido.trim();

    if (!texto || cargando) return;

    if (texto.length > 2000) {
      alert("La pregunta no puede superar los 2000 caracteres.");
      return;
    }

    const historialParaEnviar = mensajes.slice(-10).map((m) => ({
      role: m.rol === "usuario" ? "user" : "assistant",
      content: m.texto,
    }));

    setMensajes((anteriores) => [
      ...anteriores,
      { rol: "usuario", texto },
    ]);

    setPregunta("");
    setMostrarPreguntas(false);
    setCargando(true);

    try {
      const respuesta = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mensaje: texto,
          historial: historialParaEnviar,
        }),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error || "No se pudo obtener respuesta."
        );
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

  function enviarDesdeFormulario(
    evento: FormEvent<HTMLFormElement>
  ) {
    evento.preventDefault();
    void enviarPregunta(pregunta);
  }

  const categoriaSeleccionada =
    categorias.find(
      (item) => item.nombre === categoriaActiva
    ) ?? categorias[0];

  return (
    <main className="assistant-page">
      <div className="assistant-shell">
        <header className="assistant-topbar">
          <Link href="/" className="back-home">
            <span aria-hidden="true">←</span> Volver a ReCicla
          </Link>

          <div className="brand-mini">
            <span className="brand-mark">R</span>
            <span>
              ReCicla <b>IA</b>
            </span>
          </div>

          <span className="topbar-status">
            <i /> Asistente disponible
          </span>
        </header>

        <section className="assistant-hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              CENTRO DE ORIENTACIÓN AMBIENTAL
            </span>

            <h1>
              Resuelve tus dudas.
              <br />
              <em>Recicla con propósito.</em>
            </h1>

            <p>
              Soy ReCicla IA. Estoy aquí para ayudarte a reconocer
              plásticos posconsumo, aprender a separarlos y
              descubrir cómo aprovechar nuestra plataforma.
            </p>

            <div className="hero-benefits">
              <span>✓ Información clara</span>
              <span>✓ Guía paso a paso</span>
              <span>✓ Aprende a tu ritmo</span>
            </div>
          </div>

          <div className="hero-art">
            <IlustracionReciclaje />
            <span className="art-caption">
              Cada envase cuenta.
            </span>
          </div>
        </section>

        <section
          className="workspace"
          aria-label="Asistente ReCicla IA"
        >
          <div className="workspace-heading">
            <div>
              <span className="section-kicker">
                TU ESPACIO DE AYUDA
              </span>
              <h2>¿Qué te gustaría saber?</h2>
              <p>
                Elige un tema o escribe tu propia pregunta.
              </p>
            </div>

            <div className="assistant-avatar" aria-hidden="true">
              <span>R</span>
              <i />
            </div>
          </div>

          {mostrarPreguntas && mensajes.length === 0 ? (
            <div className="faq-layout">
              <nav
                className="faq-categories"
                aria-label="Categorías de preguntas"
              >
                {categorias.map((categoria) => (
                  <button
                    key={categoria.nombre}
                    type="button"
                    className={`category-button ${
                      categoriaActiva === categoria.nombre
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setCategoriaActiva(categoria.nombre)
                    }
                  >
                    <span className="category-icon">
                      {categoria.icono}
                    </span>
                    <span>{categoria.nombre}</span>
                    <span className="category-chevron">›</span>
                  </button>
                ))}
              </nav>

              <div className="faq-content">
                <div className="faq-title-row">
                  <div>
                    <span className="section-kicker">
                      PREGUNTAS FRECUENTES
                    </span>
                    <h3>{categoriaSeleccionada.nombre}</h3>
                  </div>

                  <span className="question-count">
                    {categoriaSeleccionada.preguntas.length} preguntas
                  </span>
                </div>

                <div className="question-grid">
                  {categoriaSeleccionada.preguntas.map(
                    (item, index) => (
                      <button
                        type="button"
                        key={item}
                        className="question-card"
                        onClick={() => void enviarPregunta(item)}
                      >
                        <span className="question-number">
                          0{index + 1}
                        </span>
                        <span className="question-text">
                          {item}
                        </span>
                        <span className="question-arrow">↗</span>
                      </button>
                    )
                  )}
                </div>

                <div className="faq-hint">
                  <span>✳</span> También puedes escribir cualquier
                  duda en el cuadro de conversación.
                </div>
              </div>
            </div>
          ) : (
            <div className="conversation-panel">
              <div className="conversation-header">
                <div>
                  <span className="live-dot" />
                  Conversación en curso
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMensajes([]);
                    setMostrarPreguntas(true);
                    setPregunta("");
                  }}
                  className="new-chat-button"
                >
                  ＋ Nueva consulta
                </button>
              </div>

              <div
                className="messages-list"
                ref={chatRef}
                aria-live="polite"
              >
                {mensajes.map((mensaje, indice) => (
                  <div
                    key={`${indice}-${mensaje.rol}`}
                    className={`message-row ${mensaje.rol}`}
                  >
                    {mensaje.rol === "asistente" && (
                      <div className="message-avatar">R</div>
                    )}

                    <div className="message-bubble">
                      <div className="message-author">
                        {mensaje.rol === "usuario"
                          ? "Tú"
                          : "ReCicla IA"}
                      </div>

                      {mensaje.rol === "asistente" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            p: ({ children }) => <p>{children}</p>,
                            h2: ({ children }) => <h2>{children}</h2>,
                            h3: ({ children }) => <h3>{children}</h3>,
                            ul: ({ children }) => <ul>{children}</ul>,
                            ol: ({ children }) => <ol>{children}</ol>,
                            li: ({ children }) => <li>{children}</li>,
                            strong: ({ children }) => (
                              <strong>{children}</strong>
                            ),
                            a: ({ children, href }) => (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {children}
                              </a>
                            ),
                          }}
                        >
                          {mensaje.texto}
                        </ReactMarkdown>
                      ) : (
                        <p>{mensaje.texto}</p>
                      )}
                    </div>

                    {mensaje.rol === "usuario" && (
                      <div className="user-avatar">T</div>
                    )}
                  </div>
                ))}

                {cargando && (
                  <div className="message-row asistente">
                    <div className="message-avatar">R</div>
                    <div className="typing-bubble">
                      <span />
                      <span />
                      <span />
                      <small>
                        ReCicla está preparando una respuesta
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <form
            className="composer"
            onSubmit={enviarDesdeFormulario}
          >
            <div className="composer-input-wrap">
              <span className="composer-symbol">✳</span>

              <input
                value={pregunta}
                onChange={(evento) =>
                  setPregunta(evento.target.value)
                }
                placeholder="Escribe tu pregunta sobre reciclaje, plásticos o ReCicla..."
                maxLength={2000}
                aria-label="Escribe tu pregunta"
                disabled={cargando}
              />

              <span className="character-count">
                {pregunta.length}/2000
              </span>
            </div>

            <button
              className="send-button"
              type="submit"
              disabled={cargando || !pregunta.trim()}
            >
              <span>Enviar</span>
              <span aria-hidden="true">↗</span>
            </button>
          </form>

          <div className="privacy-note">
            <span>✧</span>
            ReCicla IA ofrece orientación educativa. Confirma con
            cada organización las condiciones de recepción de los
            materiales.
          </div>
        </section>

        <footer className="assistant-footer">
          <span>
            RE CICLA <b>·</b> DALE UN DESTINO, NO LO DESECHES
          </span>
          <span>Aprender también es reciclar.</span>
        </footer>
      </div>
    </main>
  );
}
