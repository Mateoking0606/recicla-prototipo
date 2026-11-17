 
import Link from "next/link";

const residuos = [
  {
    id: "botella-agua",
    nombre: "Botella de agua",
    categoria: "Bebidas",
    material: "PET (habitual)",
    manejo: "Vacía y escurre el envase antes de separarlo.",
    imagen: "/residuos/botella-agua.png",
    alt: "Botella de agua plástica vacía",
    codigo: "PET",
  },
  {
    id: "botella-gaseosa",
    nombre: "Botella de gaseosa",
    categoria: "Bebidas",
    material: "PET (habitual)",
    manejo: "Vacía la botella y escúrrela antes de entregarla.",
    imagen: "/residuos/botella-gaseosa.png",
    alt: "Botella de gaseosa plástica vacía",
    codigo: "PET",
  },
  {
    id: "empaque-papas-fritas",
    nombre: "Empaque de papas fritas",
    categoria: "Pasabocas",
    material: "Por verificar (posible multicapa)",
    manejo: "Retira las migas y conserva el empaque seco.",
    imagen: "/residuos/empaque-papas-fritas.png",
    alt: "Empaque vacío de papas fritas",
    codigo: "",
  },
  {
    id: "bolsa-arroz",
    nombre: "Bolsa de arroz",
    categoria: "Alimentos secos",
    material: "Por verificar",
    manejo: "Retira los restos de arroz y conserva la bolsa seca.",
    imagen: "/residuos/bolsa-arroz.png",
    alt: "Bolsa de arroz vacía",
    codigo: "",
  },
  {
    id: "empaque-pasta",
    nombre: "Empaque de pasta",
    categoria: "Alimentos secos",
    material: "Por verificar",
    manejo: "Retira los restos de alimento y conserva el empaque seco.",
    imagen: "/residuos/empaque-pasta.png",
    alt: "Empaque de pasta",
    codigo: "",
  },
  {
    id: "envase-yogur",
    nombre: "Envase de yogur",
    categoria: "Lácteos",
    material: "Por verificar",
    manejo: "Vacía el envase y retira los restos de yogur.",
    imagen: "/residuos/envase-yogur.png",
    alt: "Envase plástico de yogur",
    codigo: "",
  },
];

export default function ResiduosPage() {
  return (
    <main className="catalogo-page">
      <div className="catalogo-contenido">
        <Link href="/" className="catalogo-volver">
          ← Volver al inicio
        </Link>

        <header className="catalogo-encabezado">
          <span className="catalogo-etiqueta">
            ENVASES Y EMPAQUES POSCONSUMO
          </span>

          <h1>Catálogo de residuos</h1>

          <p>
            Conoce los envases y empaques plásticos que quedan
            después de consumir alimentos y bebidas. Descubre
            sus características y aprende cómo prepararlos
            para su posible aprovechamiento.
          </p>

          <div className="catalogo-contador">
            <span className="catalogo-contador-icono">♻</span>
            <span>
              <strong>{residuos.length} residuos</strong>
              <small> disponibles para explorar</small>
            </span>
          </div>
        </header>

        <section className="catalogo-listado">
          <div className="catalogo-listado-encabezado">
            <div>
              <h2>Explora el catálogo</h2>
              <p>
                Selecciona un residuo para conocer más información.
              </p>
            </div>

            <span className="catalogo-total">
              {residuos.length} ejemplos
            </span>
          </div>

          <div className="catalogo-grid">
            {residuos.map((residuo) => (
              <article
                className="catalogo-tarjeta"
                key={residuo.id}
              >
                <Link
                  href={`/residuos/${residuo.id}`}
                  className="catalogo-imagen-enlace"
                  aria-label={`Conocer ${residuo.nombre}`}
                >
                  <div className="catalogo-imagen">
                    <img
                      src={residuo.imagen}
                      alt={residuo.alt}
                    />
                  </div>
                </Link>

                <div className="catalogo-tarjeta-contenido">
                  <span className="catalogo-categoria">
                    {residuo.categoria}
                  </span>

                  <h3>{residuo.nombre}</h3>

                  <div className="catalogo-material">
                    <span>Material de referencia</span>
                    <strong>{residuo.material}</strong>
                  </div>

                  <div className="catalogo-manejo">
                    <strong>¿Cómo prepararlo?</strong>
                    <p>{residuo.manejo}</p>
                  </div>

                  <div className="catalogo-acciones">
                    <Link
                      href={`/residuos/${residuo.id}`}
                      className="catalogo-boton"
                    >
                      Conocer residuo
                      <span>→</span>
                    </Link>

                    <Link
                      href={
                        residuo.codigo
                          ? `/recicladores?material=${residuo.codigo}`
                          : "/recicladores"
                      }
                      className="catalogo-enlace"
                    >
                      Consultar recicladores
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="catalogo-informacion">
          <span className="catalogo-informacion-icono">i</span>
          <div>
            <strong>Información importante</strong>
            <p>
              Los materiales indicados son orientativos. La
              composición de cada envase o empaque debe
              verificarse y su aceptación debe confirmarse
              directamente con el reciclador.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
