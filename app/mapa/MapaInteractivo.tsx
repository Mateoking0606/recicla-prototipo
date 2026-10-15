 
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconoUniversidad = L.divIcon({
  html: `<div style="background:#15803d;color:white;border:3px solid white;
    border-radius:50%;width:42px;height:42px;display:flex;
    align-items:center;justify-content:center;font-size:23px;
    box-shadow:0 3px 12px #0004;">🎓</div>`,
  className: "",
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

export default function MapaInteractivo() {
  // Centro inicial aproximado de Bucaramanga.
  // Todavía no representa la ubicación exacta del campus.
  const centro: [number, number] = [7.136748, -73.128358];

  return (
    <div
      style={{
        height: "650px",
        width: "100%",
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 5px 25px #0002",
      }}
    >
      <MapContainer
        center={centro}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={centro} icon={iconoUniversidad}>
          <Popup>
  <strong>🎓 Universidad Santo Tomás</strong>
  <p>Campus Bucaramanga</p>
  <p>Carrera 18 #9-27, junto al Parque Cristo Rey.</p>
  <p>📍 Punto de partida de ReCicla Maps.</p>
</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
