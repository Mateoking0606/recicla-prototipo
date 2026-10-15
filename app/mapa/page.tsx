 
"use client";

import dynamic from "next/dynamic";

const MapaInteractivo = dynamic(
  () => import("./MapaInteractivo"),
  {
    ssr: false,
    loading: () => (
      <p style={{ padding: "30px" }}>Cargando mapa de ReCicla...</p>
    ),
  }
);

export default function MapaPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f0fdf4",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <h1 style={{ color: "#166534", fontSize: "32px" }}>
          ♻️ ReCicla Maps
        </h1>

        <p style={{ margin: "12px 0 24px" }}>
          Encuentra puntos de reciclaje y planifica tus rutas.
        </p>

        <MapaInteractivo />
      </div>
    </main>
  );
}
