 
import Link from "next/link";

const funciones = [
  {
    numero: "01",
    icono: "♻️",
    titulo: "Consultar tipos de plástico",
    descripcion:
      "Conoce los siete códigos de identificación, las propiedades de cada material y sus recomendaciones de manejo.",
    enlace: "/plastico",
    boton: "Explorar plásticos",
  },
  {
    numero: "02",
    icono: "🔎",
    titulo: "Identificar residuos",
    descripcion:
      "Identifica el tipo de plástico presente en envases y empaques después de su consumo.",
    enlace: "/identificar",
    boton: "Identificar plástico",
  },
  {
    numero: "03",
    icono: "📦",
    titulo: "Catálogo de residuos",
    descripcion:
      "Explora ejemplos de envases y empaques plásticos postconsumo con sus características y fichas informativas.",
    enlace: "/residuos",
    boton: "Ver catálogo",
  },
  {
    numero: "04",
    icono: "📍",
    titulo: "Directorio de recicladores",
    descripcion:
      "Consulta organizaciones recicladoras de Bucaramanga y verifica qué materiales reciben.",
    enlace: "/recicladores",
    boton: "Buscar recicladores",
  },
  {
    numero: "05",
    icono: "🗺️",
    titulo: "Mapa de reciclaje",
    descripcion:
      "Explora la ubicación de puntos y organizaciones de reciclaje disponibles en el mapa de ReCicla.",
    enlace: "/mapa",
    boton: "Abrir mapa",
  },
  {
    numero: "06",
    icono: "🤖",
    titulo: "Asistente inteligente",
    descripcion:
      "Accede al espacio del asistente de ReCicla para consultar información sobre plásticos postconsumo.",
    enlace: "/chatbot",
    boton: "Ir al asistente",
  },
];

export default function FuncionesPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f8f5",
        padding: "65px 24px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            color: "#08733d",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          ← Volver al inicio
        </Link>

        <h1
          style={{
            color: "#104c32",
            fontSize: "clamp(32px, 4vw, 50px)",
            marginTop: "30px",
            marginBottom: "15px",
          }}
        >
          Funciones de ReCicla
        </h1>

        <p
          style={{
            color: "#597568",
            fontSize: "18px",
            maxWidth: "750px",
            lineHeight: 1.7,
            marginBottom: "40px",
          }}
        >
          Descubre las herramientas que ofrece nuestra plataforma
          para identificar, conocer y explorar alternativas de
          aprovechamiento de residuos plásticos postconsumo.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(270px, 1fr))",
            gap: "24px",
          }}
        >
          {funciones.map((funcion) => (
            <article
              key={funcion.numero}
              style={{
                background: "#ffffff",
                border: "1px solid #dce9df",
                borderRadius: "20px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "40px" }}>
                  {funcion.icono}
                </span>

                <span
                  style={{
                    color: "#08733d",
                    fontWeight: 800,
                  }}
                >
                  {funcion.numero}
                </span>
              </div>

              <h2
                style={{
                  fontSize: "23px",
                  color: "#104c32",
                  margin: 0,
                }}
              >
                {funcion.titulo}
              </h2>

              <p
                style={{
                  color: "#597568",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {funcion.descripcion}
              </p>

              <Link
                href={funcion.enlace}
                style={{
                  display: "inline-block",
                  background: "#176b45",
                  color: "white",
                  padding: "13px 18px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {funcion.boton} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
