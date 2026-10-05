import "./globals.css";

export const metadata = {
  title: "ReCicla | Dale un destino, no lo deseches",
  description: "Prototipo de plataforma para consultar plásticos postconsumo y conectar con recicladores."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
