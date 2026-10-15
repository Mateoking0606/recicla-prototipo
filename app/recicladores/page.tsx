 "use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const materiales = [
  "Todos",
  "PET",
  "PEAD",
  "PVC",
  "PEBD",
  "PP",
  "PS",
  "Otros",
];

export default function RecicladoresPage() {
  const searchParams = useSearchParams();
  const [recicladores, setRecicladores] = useState<any[]>([]);
  const [materialSeleccionado, setMaterialSeleccionado] =
    useState("Todos");
    useEffect(() => {
  const material = searchParams.get("material");

  if (material && materiales.includes(material)) {
    setMaterialSeleccionado(material);
  }
}, [searchParams]);

    useEffect(() => {
  async function cargarRecicladores() {
    try {
      const respuesta = await fetch("/api/recicladores");
      const datos = await respuesta.json();

      if (datos.ok) {
        setRecicladores(datos.recicladores);
      }
    } catch (error) {
      console.error("Error cargando recicladores:", error);
    }
  }

  cargarRecicladores();
}, []);

  const recicladoresFiltrados =
    materialSeleccionado === "Todos"
      ? recicladores
      : recicladores.filter((reciclador) =>
String(reciclador.materiales_aceptados || "")
  .split(";")
  .map((material) => material.trim())
  .includes(materialSeleccionado)
        );

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f4f8f5",
        padding: "40px 20px",
      }}
    >
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <a
  href="/residuos"
  style={{
    display: "inline-block",
    marginBottom: "20px",
    color: "#16803c",
    fontWeight: "700",
    textDecoration: "none",
  }}
>
  ← Volver al catálogo
</a>
        <p
          style={{
            color: "#16803c",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          RECICLA
        </p>

        <h1
          style={{
            fontSize: "36px",
            color: "#123c35",
            marginBottom: "12px",
          }}
        >
          Recicladores
        </h1>

        <p
          style={{
            fontSize: "17px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Consulta organizaciones recicladoras y filtra la información según
          el tipo de plástico.
        </p>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <label
            htmlFor="material"
            style={{
              display: "block",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Filtrar por material
          </label>

          <select
            id="material"
            value={materialSeleccionado}
            onChange={(e) => setMaterialSeleccionado(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              fontSize: "16px",
            }}
          >
            {materiales.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>

        <p
          style={{
            marginBottom: "20px",
            color: "#555",
          }}
        >
          Organizaciones encontradas:{" "}
          <strong>{recicladoresFiltrados.length}</strong>
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {recicladoresFiltrados.map((reciclador) => (
            <article
              key={reciclador.id}
              style={{
                background: "white",
                border: "1px solid #ddd",
                borderRadius: "15px",
                padding: "22px",
              }}
            >
              <p
                style={{
                  color: "#16803c",
                  fontWeight: "700",
                  marginBottom: "8px",
                }}
              >
                {reciclador.id}
              </p>

              <h2
                style={{
                  color: "#123c35",
                  fontSize: "23px",
                  marginBottom: "8px",
                }}
              >
                {reciclador.nombre}
              </h2>

              <p style={{ marginBottom: "15px" }}>
                <strong>Tipo:</strong> {reciclador.tipo}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <strong>Ciudad:</strong> {reciclador.ciudad}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <strong>Dirección:</strong> {reciclador.direccion}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <strong>Teléfono:</strong> {reciclador.telefono}
              </p>

              <p style={{ marginBottom: "10px" }}>
                <strong>Correo:</strong> {reciclador.email}
              </p>

              <p style={{ marginBottom: "15px" }}>
                <strong>Servicios:</strong> {reciclador.servicios}
              </p>

              <div>
                <strong>Materiales:</strong>

{reciclador.materiales_aceptados?.length > 0 ? (                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginTop: "10px",
                    }}
                  >
{String(reciclador.materiales_aceptados || "").split(";").filter(Boolean).map((material: string) => (                      <span
                        key={material}
                        style={{
                          background: "#e8f5ec",
                          color: "#16803c",
                          padding: "6px 10px",
                          borderRadius: "20px",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                      >
                        {material}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ marginTop: "8px", color: "#777" }}>
                    Información pendiente de verificación.
                  </p>
                )}
              </div>

              {reciclador.sitioWeb && (
                <a
                  href={reciclador.sitioWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "20px",
                    color: "#16803c",
                    fontWeight: "700",
                  }}
                >
                  Visitar sitio web
                </a>
              )}
            </article>
          ))}
        </div>

        {recicladoresFiltrados.length === 0 && (
          <div
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <p>
              No hay organizaciones con información de compatibilidad para
              este material.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}