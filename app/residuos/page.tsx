 
import Link from "next/link";

const residuos = [
  {
    id: "botella-agua",
    nombre: "Botella de agua",
    categoria: "Bebidas",
    material: "PET (habitual)",
    manejo: "Vaciar y escurrir el envase.",
  },
  {
    id: "botella-gaseosa",
    nombre: "Botella de gaseosa",
    categoria: "Bebidas",
    material: "PET (habitual)",
    manejo: "Vaciar y separar para su aprovechamiento.",
  },
  {
    id: "empaque-papas-fritas",
    nombre: "Empaque de papas fritas",
    categoria: "Pasabocas",
    material: "Por verificar (posible multicapa)",
    manejo: "Vaciar las migas y conservar seco.",
  },
  {
    id: "bolsa-arroz",
    nombre: "Bolsa de arroz",
    categoria: "Alimentos secos",
    material: "Por verificar",
    manejo: "Retirar los restos de arroz y mantener seca.",
  },
  {
    id: "empaque-pasta",
    nombre: "Empaque de pasta",
    categoria: "Alimentos secos",
    material: "Por verificar",
    manejo: "Separar el empaque después de consumir el producto.",
  },
  {
    id: "envase-yogur",
    nombre: "Envase de yogur",
    categoria: "Lácteos",
    material: "Por verificar (puede ser PP o PS)",
    manejo: "Vaciar y retirar los restos de alimento.",
  },
];

export default function ResiduosPage() {
  return (
    <main className="container detail">
      <Link href="/" className="link">
        ← Volver al inicio
      </Link>

      <div style={{ margin: "30px 0" }}>
        <span className="badge">
          PLÁSTICOS POSTCONSUMO DE ALIMENTOS Y BEBIDAS
        </span>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
          Catálogo de residuos
        </h1>
        <p className="muted">
          Explora envases y empaques plásticos que quedan después
          de consumir alimentos y bebidas.
        </p>
      </div>

      <div className="grid">
        {residuos.map((residuo) => (
          <article className="card" key={residuo.nombre}>
            <div className="card-img">
  {residuo.nombre === "Botella de agua" ? (
    <a href="/residuos/botella-agua">
    <img
          src="/residuos/botella-agua.png"
      alt="Botella de agua plástica vacía"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "12px",
      }}
    />
    </a>
  ) : residuo.nombre === "Botella de gaseosa" ? (
    <a href="/residuos/botella-gaseosa">
  <img
    src="/residuos/botella-gaseosa.png"
    alt="Botella de gaseosa plástica vacía"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      borderRadius: "12px",
    }}
  />
  </a>
) : residuo.nombre === "Empaque de papas fritas" ? (
  <img
    src="/residuos/empaque-papas-fritas.png"
    alt="Empaque plástico vacío de papas fritas"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      borderRadius: "12px",
    }}
  />
) : residuo.nombre === "Bolsa de arroz" ? (
  <img
    src="/residuos/bolsa-arroz.png"
    alt="Bolsa plástica de arroz vacía"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      borderRadius: "12px",
    }}
  />
) : (
    "♻️"
  )}
</div>
            <span className="code">{residuo.categoria}</span>
            <h3>{residuo.nombre}</h3>
            <Link
  href={`/residuos/${residuo.id}`}
  className="link"
  style={{ display: "inline-block", marginBottom: "12px" }}
>
  Ver ficha técnica →
</Link>

            <p><strong>Material:</strong> {residuo.material}</p>
            <p><strong>Manejo:</strong> {residuo.manejo}</p>
            <Link
  href={
    ["PET", "PEAD", "PVC", "PEBD", "PP", "PS"].includes(residuo.material.split(" ")[0])
      ? `/recicladores?material=${residuo.material.split(" ")[0]}`
      : "/recicladores"
  }
  className="link"
>
              Consultar directorio →
            </Link>
          </article>
        ))}
      </div>

      <p className="muted" style={{ marginTop: 30 }}>
        Los materiales son orientativos. Se debe verificar la
        composición de cada empaque y confirmar su aceptación
        con el reciclador antes de entregarlo.
      </p>
    </main>
  );
}
