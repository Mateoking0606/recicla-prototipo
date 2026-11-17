 
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
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

interface Reciclador {
  id: string;
  nombre: string;
  tipo: string | null;
  ciudad: string | null;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
  sitio_web: string | null;
  materiales_aceptados: string | null;
  servicios: string | null;
  horarios: string | null;
}

// Normaliza los enlaces para que funcionen aunque no tengan https://.
function normalizarUrl(enlace: string | null): string | null {
  if (!enlace) return null;

  const limpio = enlace.trim();

  if (!limpio) return null;

  const enlaceCompleto = /^https?:\/\//i.test(limpio)
    ? limpio
    : `https://${limpio}`;

  try {
    const url = new URL(enlaceCompleto);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

function ContenidoRecicladores() {
  const searchParams = useSearchParams();

  const [recicladores, setRecicladores] = useState<Reciclador[]>([]);
  const [materialSeleccionado, setMaterialSeleccionado] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  // Leer el material enviado desde otra página.
  useEffect(() => {
    const material = searchParams.get("material");

    if (material && materiales.includes(material)) {
      setMaterialSeleccionado(material);
    }
  }, [searchParams]);

  // Consultar las organizaciones en la API.
  useEffect(() => {
    async function cargarRecicladores() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch("/api/recicladores");

        if (!respuesta.ok) {
          throw new Error("No se pudo consultar el directorio.");
        }

        const datos = await respuesta.json();

        if (datos.ok && Array.isArray(datos.recicladores)) {
          setRecicladores(datos.recicladores);
        } else {
          throw new Error("La información recibida no es válida.");
        }
      } catch (error) {
        console.error("Error cargando recicladores:", error);
        setError(
          "No fue posible cargar las organizaciones. Intenta nuevamente."
        );
      } finally {
        setCargando(false);
      }
    }

    cargarRecicladores();
  }, []);

  // Aplicar búsqueda y filtro por material.
  const recicladoresFiltrados = useMemo(() => {
    return recicladores.filter((reciclador) => {
      const texto = busqueda.toLowerCase().trim();

      const coincideBusqueda =
        !texto ||
        [
          reciclador.nombre,
          reciclador.tipo,
          reciclador.ciudad,
          reciclador.direccion,
        ]
          .filter(Boolean)
          .some((dato) => dato!.toLowerCase().includes(texto));

      const listaMateriales = String(
        reciclador.materiales_aceptados || ""
      )
        .split(";")
        .map((material) => material.trim());

      const coincideMaterial =
        materialSeleccionado === "Todos" ||
        listaMateriales.includes(materialSeleccionado);

      return coincideBusqueda && coincideMaterial;
    });
  }, [recicladores, busqueda, materialSeleccionado]);

  return (
    <main className="rec-page">
      <div className="rec-container">
        <a href="/residuos" className="rec-back">
          ← Volver al catálogo
        </a>

        {/* ENCABEZADO */}
        <section className="rec-hero">
          <div className="rec-hero-content">
            <span className="rec-eyebrow">
              ♻ DIRECTORIO DE RECICLAJE
            </span>

            <h1>
              Encuentra dónde
              <br />
              <span>reciclar.</span>
            </h1>

            <p>
              Conoce las organizaciones recicladoras de Bucaramanga
              y su área metropolitana. Consulta sus datos y descubre
              las alternativas para darles un nuevo destino a tus residuos.
            </p>

            <a href="#directorio" className="rec-hero-button">
              Explorar organizaciones <span>↓</span>
            </a>
          </div>

          <div className="rec-hero-decoration">
            <div className="rec-circle rec-circle-one"></div>
            <div className="rec-circle rec-circle-two"></div>
            <div className="rec-leaf">♻</div>
            <span className="rec-hero-caption">
              Cada residuo cuenta.
            </span>
          </div>
        </section>

        {/* INDICADORES */}
        <section className="rec-stats">
          <div className="rec-stat">
            <span className="rec-stat-icon">♻</span>
            <div>
              <strong>{recicladores.length}</strong>
              <span>Organizaciones registradas</span>
            </div>
          </div>

          <div className="rec-stat">
            <span className="rec-stat-icon">🧴</span>
            <div>
              <strong>7</strong>
              <span>Tipos de plástico</span>
            </div>
          </div>

          <div className="rec-stat">
            <span className="rec-stat-icon">📍</span>
            <div>
              <strong>Área metropolitana</strong>
              <span>Zona de consulta</span>
            </div>
          </div>
        </section>

        {/* DIRECTORIO */}
        <section id="directorio" className="rec-directory">
          <div className="rec-section-heading">
            <div>
              <span className="rec-section-label">
                DIRECTORIO
              </span>

              <h2>Organizaciones recicladoras</h2>

              <p>
                Explora las organizaciones y consulta la información
                disponible de cada una.
              </p>
            </div>

            <span className="rec-results">
              {recicladoresFiltrados.length} resultados
            </span>
          </div>

          {/* BUSCADOR Y FILTROS */}
          <div className="rec-filters">
            <div className="rec-search">
              <span>⌕</span>

              <input
                type="text"
                placeholder="Buscar organización, ciudad o dirección..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              {busqueda && (
                <button
                  type="button"
                  onClick={() => setBusqueda("")}
                  aria-label="Limpiar búsqueda"
                >
                  ×
                </button>
              )}
            </div>

            <div className="rec-material-filter">
              <label htmlFor="material">
                Filtrar por material
              </label>

              <select
                id="material"
                value={materialSeleccionado}
                onChange={(e) =>
                  setMaterialSeleccionado(e.target.value)
                }
              >
                {materiales.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* TARJETAS */}
          {cargando ? (
            <div className="rec-message">
              <span className="rec-loading"></span>
              <p>Cargando organizaciones...</p>
            </div>
          ) : error ? (
            <div className="rec-message">
              <p>{error}</p>
              <button
                type="button"
                className="rec-reset"
                onClick={() => window.location.reload()}
              >
                Intentar nuevamente
              </button>
            </div>
          ) : recicladoresFiltrados.length === 0 ? (
            <div className="rec-message">
              <span>🔎</span>
              <h3>No encontramos organizaciones</h3>
              <p>
                Prueba con otro nombre o selecciona un material diferente.
              </p>

              <button
                type="button"
                className="rec-reset"
                onClick={() => {
                  setBusqueda("");
                  setMaterialSeleccionado("Todos");
                }}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="rec-grid">
              {recicladoresFiltrados.map((reciclador) => {
                const listaMateriales = String(
                  reciclador.materiales_aceptados || ""
                )
                  .split(";")
                  .map((material) => material.trim())
                  .filter(Boolean);

                const urlSitioWeb = normalizarUrl(
                  reciclador.sitio_web
                );

                const telefonoPrincipal = reciclador.telefono
                  ?.split(";")[0]
                  .trim();

                return (
                  <article
                    className="rec-card"
                    key={reciclador.id}
                  >
                    <div className="rec-card-top">
                      <span className="rec-card-id">
                        {reciclador.id}
                      </span>

                      <span className="rec-card-symbol">♻</span>
                    </div>

                    <h3>{reciclador.nombre}</h3>

                    <span className="rec-type">
                      {reciclador.tipo || "Organización recicladora"}
                    </span>

                    <div className="rec-card-divider"></div>

                    {/* INFORMACIÓN DE CONTACTO */}
                    <div className="rec-info">
                      <div className="rec-info-item">
                        <span>📍</span>
                        <div>
                          <small>Ubicación</small>
                          <p>
                            {reciclador.ciudad || "No disponible"}
                          </p>
                        </div>
                      </div>

                      <div className="rec-info-item">
                        <span>🏢</span>
                        <div>
                          <small>Dirección</small>
                          <p>
                            {reciclador.direccion ||
                              "Dirección no registrada"}
                          </p>
                        </div>
                      </div>

                      <div className="rec-info-item">
                        <span>📞</span>
                        <div>
                          <small>Teléfono</small>
                          <p>
                            {reciclador.telefono || "No disponible"}
                          </p>
                        </div>
                      </div>

                      <div className="rec-info-item">
                        <span>✉</span>
                        <div>
                          <small>Correo electrónico</small>
                          <p>
                            {reciclador.email || "No disponible"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MATERIALES */}
                    <div className="rec-materials">
                      <strong>Materiales registrados</strong>

                      {listaMateriales.length > 0 ? (
                        <div className="rec-tags">
                          {listaMateriales.map((material, index) => (
                            <span key={`${material}-${index}`}>
                              {material}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="rec-no-data">
                          No hay materiales registrados.
                        </p>
                      )}
                    </div>

                    {/* SERVICIOS */}
                    {reciclador.servicios && (
                      <div className="rec-services">
                        <strong>Servicios</strong>
                        <p>{reciclador.servicios}</p>
                      </div>
                    )}

                    {/* HORARIOS */}
                    {reciclador.horarios && (
                      <div className="rec-services">
                        <strong>Horarios</strong>
                        <p>{reciclador.horarios}</p>
                      </div>
                    )}

                    {/* BOTONES DE ACCIÓN */}
                    <div className="rec-card-actions">
                      <a
                        href={`/mapa?reciclador=${encodeURIComponent(
                          reciclador.id
                        )}`}
                        className="rec-map-button"
                      >
                        📍 Cómo llegar
                      </a>

                      {telefonoPrincipal && (
                        <a
                          href={`tel:${telefonoPrincipal}`}
                          className="rec-contact-button"
                        >
                          Llamar
                        </a>
                      )}

                      {urlSitioWeb && (
                        <a
                          href={urlSitioWeb}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rec-web-button"
                        >
                          Sitio web ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* MENSAJE FINAL */}
        <section className="rec-footer-message">
          <span>🌱</span>
          <div>
            <h2>El cambio comienza con una buena decisión.</h2>
            <p>
              Separa tus residuos, consulta las condiciones de recepción
              y busca alternativas para aprovechar los materiales.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function RecicladoresPage() {
  return (
    <Suspense
      fallback={
        <p style={{ padding: "40px" }}>
          Cargando directorio...
        </p>
      }
    >
      <ContenidoRecicladores />
    </Suspense>
  );
}
