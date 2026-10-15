 
import Link from "next/link";
import { plasticos } from "@/data/plasticos";

export default function PlasticosPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f3f8f4",
        padding: "55px 20px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Link
          href="/"
          style={{
            color: "#167443",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Volver al inicio
        </Link>

        <h1
          style={{
            fontSize: "clamp(30px, 5vw, 48px)",
            color: "#104c32",
            marginTop: "30px",
          }}
        >
          Tipos de plásticos postconsumo
        </h1>

        <p style={{ color: "#587368", marginBottom: "35px" }}>
          Conoce los siete códigos de identificación de resinas,
          sus características y los residuos que pueden
          encontrarse después del consumo.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "22px",
          }}
        >
          {plasticos.map((p) => (
            <Link
              key={p.slug}
              href={`/plastico/${p.slug}`}
              style={{
                display: "block",
                padding: "28px",
                borderRadius: "18px",
                background: "#ffffff",
                border: "1px solid #dce9df",
                textDecoration: "none",
                color: "#153e2e",
                boxShadow: "0 5px 15px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  fontSize: "55px",
                  textAlign: "center",
                  background: "#e9f5eb",
                  borderRadius: "14px",
                  padding: "20px",
                  marginBottom: "20px",
                }}
              >
                ♻️
              </div>

              <span
                style={{
                  color: "#16804c",
                  fontWeight: 700,
                  fontSize: "13px",
                }}
              >
                CÓDIGO {p.codigo}
              </span>

              <h2 style={{ margin: "12px 0 8px" }}>
                {p.sigla}
              </h2>

              <p style={{ color: "#61766b" }}>
                {p.nombre}
              </p>

              <p
                style={{
                  color: "#137c45",
                  fontWeight: 700,
                  marginTop: "22px",
                }}
              >
                Ver ficha técnica →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
