
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// =====================================================
// TIPOS
// =====================================================

interface Reciclador {
  id: string;
  nombre: string;
  ciudad: string | null;
  direccion: string | null;
  latitud: number | string | null;
  longitud: number | string | null;
  telefono?: string | null;
}

type Punto = [number, number];

interface RecicladorUbicado extends Reciclador {
  punto: Punto;
}

// =====================================================
// COORDENADAS
// =====================================================

// Punto de partida: Universidad Santo Tomás,
// sector Parque Cristo Rey, Bucaramanga.
const UNIVERSIDAD: Punto = [7.1369759, -73.1280767];

// Coordenadas obtenidas de los enlaces de Google Maps
// compartidos para estas organizaciones.
// Los demás recicladores permanecerán en el directorio,
// pero no tendrán marcador hasta contar con su ubicación.
const COORDENADAS_RECICLADORES: Record<string, Punto> = {
  R01: [7.0841649, -73.1630234], // Replasander
  R02: [7.0785342, -73.1502322], // Bello Renacer
  R03: [7.1293575, -73.1251454], // COOPRESER
  R05: [7.048535, -73.1741079],  // COOPSEREC
  R08: [7.1375919, -73.1313916], // Asociación Laura Sofía
  R13: [7.1247142, -73.1291094], // ECORECICLA
  R14: [7.0983408, -73.1322969], // Fundación 4R
};

// =====================================================
// ICONOS DEL MAPA
// =====================================================

const iconoOrigen = L.divIcon({
  className: "",
  html: `
    <div style="
      width:44px;
      height:44px;
      background:#14532d;
      color:white;
      border:3px solid white;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:21px;
      box-shadow:0 4px 14px #0004;
    ">🎓</div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const iconoDestino = L.divIcon({
  className: "",
  html: `
    <div style="
      width:40px;
      height:40px;
      background:#20a36a;
      color:white;
      border:3px solid white;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:21px;
      box-shadow:0 4px 14px #0004;
    ">♻</div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// =====================================================
// FUNCIONES AUXILIARES
// =====================================================

function coordenadasValidas(
  lat: unknown,
  lng: unknown
): Punto | null {
  if (
    lat === null ||
    lat === undefined ||
    lng === null ||
    lng === undefined
  ) {
    return null;
  }

  if (
    String(lat).trim() === "" ||
    String(lng).trim() === ""
  ) {
    return null;
  }

  const latitude = Number(lat);
  const longitude = Number(lng);

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    return null;
  }

  if (
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return null;
  }

  return [latitude, longitude];
}

function distanciaEnLineaRecta(a: Punto, b: Punto) {
  const rad = (valor: number) => (valor * Math.PI) / 180;

  const diferenciaLat = rad(b[0] - a[0]);
  const diferenciaLng = rad(b[1] - a[1]);

  const calculo =
    Math.sin(diferenciaLat / 2) ** 2 +
    Math.cos(rad(a[0])) *
      Math.cos(rad(b[0])) *
      Math.sin(diferenciaLng / 2) ** 2;

  return (
    6371 *
    2 *
    Math.atan2(Math.sqrt(calculo), Math.sqrt(1 - calculo))
  );
}

// =====================================================
// AJUSTAR EL MAPA A LA RUTA
// =====================================================

function AjustarVista({
  ruta,
  destino,
}: {
  ruta: Punto[];
  destino: Punto | null;
}) {
  const mapa = useMap();

  useEffect(() => {
    if (ruta.length > 1) {
      mapa.fitBounds(L.latLngBounds(ruta), {
        padding: [45, 45],
        maxZoom: 16,
        animate: true,
      });
    } else if (destino) {
      mapa.fitBounds(
        L.latLngBounds([UNIVERSIDAD, destino]),
        {
          padding: [45, 45],
          maxZoom: 16,
          animate: true,
        }
      );
    } else {
      mapa.setView(UNIVERSIDAD, 14);
    }
  }, [ruta, destino, mapa]);

  return null;
}

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function MapaInteractivo() {
  const [recicladores, setRecicladores] = useState<Reciclador[]>([]);
  const [seleccionado, setSeleccionado] =
    useState<Reciclador | null>(null);

  const [puntoDestino, setPuntoDestino] =
    useState<Punto | null>(null);

  const [ruta, setRuta] = useState<Punto[]>([]);
  const [distanciaRuta, setDistanciaRuta] =
    useState<number | null>(null);
  const [duracionRuta, setDuracionRuta] =
    useState<number | null>(null);

  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [cargandoRuta, setCargandoRuta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // ===================================================
  // CARGAR ORGANIZACIONES DESDE LA API
  // ===================================================

  useEffect(() => {
    let activo = true;

    async function cargarOrganizaciones() {
      try {
        const respuesta = await fetch("/api/recicladores");

        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el directorio.");
        }

        const datos = await respuesta.json();

        if (
          !datos.ok ||
          !Array.isArray(datos.recicladores)
        ) {
          throw new Error("La respuesta del directorio no es válida.");
        }

        if (activo) {
          setRecicladores(datos.recicladores);
        }
      } catch (error) {
        if (activo) {
          setMensaje(
            error instanceof Error
              ? error.message
              : "Error al cargar las organizaciones."
          );
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    cargarOrganizaciones();

    return () => {
      activo = false;
    };
  }, []);

  // ===================================================
  // OBTENER PUNTOS DISPONIBLES
  // ===================================================

  const ubicacionesGuardadas = useMemo<RecicladorUbicado[]>(() => {
    return recicladores.flatMap((reciclador) => {
      const punto =
        COORDENADAS_RECICLADORES[reciclador.id] ??
        coordenadasValidas(
          reciclador.latitud,
          reciclador.longitud
        );

      return punto
        ? [{ ...reciclador, punto }]
        : [];
    });
  }, [recicladores]);

  // ===================================================
  // BUSCADOR
  // ===================================================

  const organizacionesFiltradas = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();

    return recicladores.filter((reciclador) =>
      `${reciclador.nombre} ${reciclador.ciudad ?? ""} ${
        reciclador.direccion ?? ""
      }`
        .toLowerCase()
        .includes(texto)
    );
  }, [recicladores, busqueda]);

  // ===================================================
  // SELECCIONAR DESTINO
  // ===================================================

  const resolverDestino = useCallback(
    (reciclador: Reciclador) => {
      setSeleccionado(reciclador);
      setRuta([]);
      setDistanciaRuta(null);
      setDuracionRuta(null);
      setMensaje("");

      const punto =
        COORDENADAS_RECICLADORES[reciclador.id] ??
        coordenadasValidas(
          reciclador.latitud,
          reciclador.longitud
        );

      if (!punto) {
        setPuntoDestino(null);
        setCargandoRuta(false);

        setMensaje(
          "Esta organización todavía no tiene una ubicación disponible para trazar su recorrido."
        );

        return;
      }

      setPuntoDestino(punto);
    },
    []
  );

  // ===================================================
  // ABRIR AUTOMÁTICAMENTE EL DESTINO DESDE EL DIRECTORIO
  // ===================================================

  useEffect(() => {
    if (cargando || recicladores.length === 0 || seleccionado) {
      return;
    }

    const parametros = new URLSearchParams(
      window.location.search
    );

    const id = parametros.get("reciclador");

    if (!id) return;

    const encontrado = recicladores.find(
      (reciclador) => reciclador.id === id
    );

    if (encontrado) {
      resolverDestino(encontrado);
    }
  }, [
    cargando,
    recicladores,
    seleccionado,
    resolverDestino,
  ]);

  // ===================================================
  // CALCULAR RUTA POR CARRETERA
  // ===================================================

  useEffect(() => {
    if (!puntoDestino) return;

    const controller = new AbortController();

    async function calcularRuta() {
      try {
        setCargandoRuta(true);
        setMensaje("");
        setRuta([]);
        setDistanciaRuta(null);
        setDuracionRuta(null);

        const url =
          "https://router.project-osrm.org/route/v1/driving/" +
          `${UNIVERSIDAD[1]},${UNIVERSIDAD[0]};` +
          `${puntoDestino![1]},${puntoDestino![0]}` +
          "?overview=full&geometries=geojson";

        const respuesta = await fetch(url, {
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error(
            "No se pudo consultar el servicio de rutas."
          );
        }

        const datos = await respuesta.json();

        if (
          datos.code !== "Ok" ||
          !datos.routes ||
          datos.routes.length === 0
        ) {
          throw new Error(
            "No se encontró una ruta por carretera para este destino."
          );
        }

        const recorrido = datos.routes[0];

        const puntos: Punto[] =
          recorrido.geometry.coordinates.map(
            ([lng, lat]: [number, number]) => [lat, lng]
          );

        setRuta(puntos);
        setDistanciaRuta(recorrido.distance / 1000);
        setDuracionRuta(recorrido.duration / 60);
      } catch (error) {
        if (
          error instanceof Error &&
          error.name === "AbortError"
        ) {
          return;
        }

        setMensaje(
          error instanceof Error
            ? error.message
            : "No se pudo calcular el recorrido."
        );
      } finally {
        if (!controller.signal.aborted) {
          setCargandoRuta(false);
        }
      }
    }

    calcularRuta();

    return () => controller.abort();
  }, [puntoDestino]);

  // ===================================================
  // ABRIR NAVEGACIÓN EN GOOGLE MAPS
  // ===================================================

  function abrirGoogleMaps() {
    if (!puntoDestino) return;

    const url =
      "https://www.google.com/maps/dir/?api=1" +
      `&origin=${UNIVERSIDAD[0]},${UNIVERSIDAD[1]}` +
      `&destination=${puntoDestino[0]},${puntoDestino[1]}` +
      "&travelmode=driving";

    window.open(url, "_blank", "noopener,noreferrer");
  }

  // ===================================================
  // ORGANIZACIÓN MÁS CERCANA
  // ===================================================

  const masCercano = useMemo(() => {
    if (ubicacionesGuardadas.length === 0) return null;

    return [...ubicacionesGuardadas].sort(
      (a, b) =>
        distanciaEnLineaRecta(UNIVERSIDAD, a.punto) -
        distanciaEnLineaRecta(UNIVERSIDAD, b.punto)
    )[0];
  }, [ubicacionesGuardadas]);

  // ===================================================
  // INTERFAZ
  // ===================================================

  return (
    <section style={s.contenedor}>
      {/* ENCABEZADO */}

      <header style={s.hero}>
        <div>
          <span style={s.kicker}>
            RECICLA · MOVILIDAD CIRCULAR
          </span>

          <h2 style={s.titulo}>
            Planifica tu recorrido
          </h2>

          <p style={s.subtitulo}>
            Encuentra organizaciones recicladoras y visualiza cómo
            llegar desde la Universidad Santo Tomás.
          </p>
        </div>

        <div style={s.heroIcon}>♻</div>
      </header>

      {/* ORIGEN */}

      <section style={s.panel}>
        <h3 style={s.h3}>Punto de partida</h3>

        <div style={s.origen}>
          <span style={s.origenIcon}>🎓</span>

          <div>
            <strong>Universidad Santo Tomás</strong>
            <small>
              Sector Parque Cristo Rey · Bucaramanga
            </small>
          </div>
        </div>
      </section>

      {/* INDICADORES */}

      <section style={s.stats}>
        <div style={s.stat}>
          <small>Organizaciones registradas</small>
          <strong>{recicladores.length}</strong>
        </div>

        <div style={s.stat}>
          <small>Ubicaciones disponibles</small>
          <strong>{ubicacionesGuardadas.length}</strong>
        </div>

        <div style={s.stat}>
          <small>Más cercano a la Universidad</small>

          <strong style={{ fontSize: 15 }}>
            {masCercano?.nombre ?? "Sin ubicación"}
          </strong>
        </div>
      </section>

      {/* MAPA */}

      <section style={s.panel}>
        <div style={s.mapaTitulo}>
          <div>
            <h3 style={s.h3}>ReCicla Maps</h3>

            <p style={s.muted}>
              Selecciona una organización para visualizar el recorrido.
            </p>
          </div>

          <span style={s.pill}>
            ● Mapa interactivo
          </span>
        </div>

        <div style={s.mapa}>
          <MapContainer
            center={UNIVERSIDAD}
            zoom={14}
            scrollWheelZoom
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <AjustarVista
              ruta={ruta}
              destino={puntoDestino}
            />

            {/* UNIVERSIDAD */}

            <Marker
              position={UNIVERSIDAD}
              icon={iconoOrigen}
            >
              <Popup>
                <strong>
                  🎓 Universidad Santo Tomás
                </strong>

                <br />

                Punto de partida de ReCicla.
              </Popup>
            </Marker>

            {/* ORGANIZACIONES CON UBICACIÓN */}

            {ubicacionesGuardadas.map((reciclador) => (
              <Marker
                key={reciclador.id}
                position={reciclador.punto}
                icon={iconoDestino}
                eventHandlers={{
                  click: () => resolverDestino(reciclador),
                }}
              >
                <Popup>
                  <strong>{reciclador.nombre}</strong>

                  <br />

                  {reciclador.direccion ?? reciclador.ciudad}

                  <br />

                  <button
                    type="button"
                    style={s.popupBtn}
                    onClick={() => resolverDestino(reciclador)}
                  >
                    Trazar recorrido
                  </button>
                </Popup>
              </Marker>
            ))}

            {/* RUTA DEL DESTINO SELECCIONADO */}

            {ruta.length > 1 && (
              <Polyline
                positions={ruta}
                pathOptions={{
                  color: "#16a36a",
                  weight: 6,
                  opacity: 0.95,
                  lineCap: "round",
                  lineJoin: "round",
                }}
              />
            )}
          </MapContainer>
        </div>

        <div style={s.leyenda}>
          <span>🎓 Universidad</span>
          <span>♻ Organización recicladora</span>
          <span style={{ color: "#168b59" }}>
            ━━ Ruta seleccionada
          </span>
        </div>
      </section>

      {/* RECORRIDO */}

      <section style={s.panel}>
        <h3 style={s.h3}>Tu recorrido</h3>

        {seleccionado ? (
          <>
            <strong style={s.destino}>
              {seleccionado.nombre}
            </strong>

            <p style={s.muted}>
              {seleccionado.direccion ??
                seleccionado.ciudad ??
                "Dirección no registrada"}
            </p>

            {cargandoRuta && (
              <p style={s.cargando}>
                Calculando recorrido...
              </p>
            )}

            {distanciaRuta !== null && (
              <div style={s.resultados}>
                <div>
                  <small>Distancia por carretera</small>

                  <strong>
                    {distanciaRuta.toFixed(1)} km
                  </strong>
                </div>

                <div>
                  <small>Tiempo estimado</small>

                  <strong>
                    {Math.round(duracionRuta ?? 0)} min
                  </strong>
                </div>
              </div>
            )}

            {puntoDestino && (
              <button
                type="button"
                onClick={abrirGoogleMaps}
                style={s.botonActivo}
              >
                Abrir navegación en Google Maps ↗
              </button>
            )}
          </>
        ) : (
          <p style={s.muted}>
            Selecciona una organización para visualizar su recorrido
            desde la Universidad Santo Tomás.
          </p>
        )}

        {mensaje && (
          <p style={s.aviso}>{mensaje}</p>
        )}
      </section>

      {/* DIRECTORIO */}

      <section style={s.panel}>
        <div style={s.mapaTitulo}>
          <div>
            <h3 style={s.h3}>
              Organizaciones recicladoras
            </h3>

            <p style={s.muted}>
              Selecciona el destino al que deseas llegar.
            </p>
          </div>

          <span style={s.pill}>
            {organizacionesFiltradas.length} organizaciones
          </span>
        </div>

        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar organización o ciudad..."
          style={s.buscar}
        />

        {cargando ? (
          <p style={s.muted}>
            Cargando organizaciones...
          </p>
        ) : (
          <div style={s.lista}>
            {organizacionesFiltradas.map((reciclador) => {
              const activa =
                seleccionado?.id === reciclador.id;

              const tieneUbicacion =
                ubicacionesGuardadas.some(
                  (r) => r.id === reciclador.id
                );

              return (
                <div
                  key={reciclador.id}
                  style={{
                    ...s.fila,
                    ...(activa ? s.filaActiva : {}),
                  }}
                >
                  <div style={s.recIcon}>♻</div>

                  <div style={{ flex: 1, minWidth: 180 }}>
                    <strong style={s.nombre}>
                      {reciclador.nombre}
                    </strong>

                    <small style={s.muted}>
                      {reciclador.direccion ??
                        reciclador.ciudad ??
                        "Dirección no registrada"}
                    </small>
                  </div>

                  <button
                    type="button"
                    onClick={() => resolverDestino(reciclador)}
                    style={{
                      ...s.boton,
                      ...(activa
                        ? s.botonActivo
                        : s.botonClaro),
                    }}
                  >
                    {activa
                      ? "Destino seleccionado"
                      : tieneUbicacion
                        ? "Cómo llegar"
                        : "Ver organización"}
                  </button>
                </div>
              );
            })}

            {organizacionesFiltradas.length === 0 && (
              <p style={s.muted}>
                No se encontraron organizaciones.
              </p>
            )}
          </div>
        )}
      </section>
    </section>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const s: Record<string, React.CSSProperties> = {
  contenedor: {
    display: "grid",
    gap: 20,
    paddingBottom: 30,
    color: "#173f2d",
  },

  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    padding: 28,
    borderRadius: 22,
    background: "linear-gradient(120deg,#dff5e7,#f5fbf6)",
    border: "1px solid #cce8d5",
  },

  kicker: {
    color: "#278451",
    fontSize: 11,
    fontWeight: 800,
    letterSpacing: 1.5,
  },

  titulo: {
    fontSize: 30,
    color: "#14532d",
    margin: "8px 0",
    fontWeight: 800,
  },

  subtitulo: {
    color: "#587565",
    fontSize: 14,
    margin: 0,
    lineHeight: 1.6,
  },

  heroIcon: {
    width: 62,
    height: 62,
    borderRadius: 18,
    background: "#ccebd7",
    color: "#16804b",
    display: "grid",
    placeItems: "center",
    fontSize: 34,
    flexShrink: 0,
  },

  panel: {
    background: "#fff",
    border: "1px solid #e0eee4",
    borderRadius: 20,
    padding: 22,
    boxShadow: "0 5px 20px #17452b08",
  },

  h3: {
    color: "#14532d",
    fontSize: 18,
    fontWeight: 800,
    margin: "0 0 8px",
  },

  muted: {
    color: "#718579",
    fontSize: 12,
    margin: "7px 0 0",
    display: "block",
    lineHeight: 1.5,
  },

  origen: {
    display: "flex",
    alignItems: "center",
    gap: 13,
    padding: 14,
    background: "#f1faf3",
    borderRadius: 13,
    marginTop: 12,
  },

  origenIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "#d9f0df",
    display: "grid",
    placeItems: "center",
    fontSize: 21,
  },

  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
    gap: 13,
  },

  stat: {
    background: "white",
    border: "1px solid #e0eee4",
    borderRadius: 16,
    padding: 18,
    display: "grid",
    gap: 7,
  },

  mapaTitulo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
    marginBottom: 16,
  },

  pill: {
    color: "#278451",
    background: "#edf8f0",
    borderRadius: 30,
    padding: "8px 12px",
    fontSize: 11,
    fontWeight: 800,
  },

  mapa: {
    height: 560,
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    background: "#e8f3e9",
  },

  leyenda: {
    display: "flex",
    flexWrap: "wrap",
    gap: 20,
    padding: "14px 5px 0",
    color: "#718579",
    fontSize: 12,
  },

  destino: {
    display: "block",
    color: "#14532d",
    fontSize: 20,
    marginTop: 12,
  },

  resultados: {
    display: "flex",
    flexWrap: "wrap",
    gap: 28,
    padding: 16,
    background: "#f0f9f2",
    borderRadius: 12,
    margin: "14px 0",
  },

  aviso: {
    color: "#805b16",
    background: "#fff8e6",
    borderRadius: 10,
    padding: 12,
    fontSize: 12,
    lineHeight: 1.5,
  },

  cargando: {
    color: "#16804b",
    background: "#f0f9f2",
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
  },

  buscar: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    border: "1px solid #dcebe0",
    borderRadius: 11,
    outline: "none",
    margin: "5px 0 15px",
    fontSize: 13,
  },

  lista: {
    display: "grid",
    gap: 9,
  },

  fila: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 13,
    padding: 13,
    border: "1px solid #e7eee9",
    borderRadius: 13,
    background: "#fff",
  },

  filaActiva: {
    background: "#f0f9f2",
    border: "1px solid #75c99a",
  },

  recIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: "#e7f6eb",
    color: "#16804b",
    display: "grid",
    placeItems: "center",
    fontSize: 22,
  },

  nombre: {
    display: "block",
    color: "#14532d",
    fontSize: 14,
    marginBottom: 4,
  },

  boton: {
    borderRadius: 11,
    padding: "11px 15px",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
    border: "1px solid #d8e9dd",
  },

  botonActivo: {
    background: "#176b43",
    color: "white",
    border: "1px solid #176b43",
    borderRadius: 11,
    padding: "12px 17px",
    fontWeight: 800,
    cursor: "pointer",
  },

  botonClaro: {
    background: "#edf7f0",
    color: "#176b43",
  },

  popupBtn: {
    marginTop: 8,
    padding: "8px 11px",
    border: 0,
    borderRadius: 7,
    background: "#176b43",
    color: "white",
    cursor: "pointer",
  },
};
