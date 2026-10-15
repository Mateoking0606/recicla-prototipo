 
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const enlaces = [
  { href: "/", nombre: "Inicio" },
  { href: "/plastico", nombre: "Plásticos" },
  { href: "/residuos", nombre: "Catálogo de residuos" },
  { href: "/identificar", nombre: "Identificar" },
  { href: "/recicladores", nombre: "Recicladores" },
  { href: "/mapa", nombre: "🗺️ ReCicla Maps" },
  { href: "/funciones", nombre: "Funciones" },
  { href: "/chatbot", nombre: "Asistente IA" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="recicla-navbar">
      <div className="recicla-navbar-inner">
        <Link
          href="/"
          className="recicla-navbar-logo"
          onClick={() => setMenuAbierto(false)}
        >
          Re<span>Cicla</span>
        </Link>

        <button
          type="button"
          className="recicla-menu-button"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="recicla-navigation"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? "✕" : "☰"}
        </button>

        <nav
          id="recicla-navigation"
          className={`recicla-navbar-links ${
            menuAbierto ? "abierto" : ""
          }`}
          aria-label="Navegación principal"
        >
          {enlaces.map((enlace) => {
            const activo =
              enlace.href === "/"
                ? pathname === "/"
                : pathname.startsWith(enlace.href);

            return (
              <Link
                key={enlace.href}
                href={enlace.href}
                className={activo ? "activo" : ""}
                aria-current={activo ? "page" : undefined}
                onClick={() => setMenuAbierto(false)}
              >
                {enlace.nombre}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
