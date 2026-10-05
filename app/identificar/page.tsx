 "use client";

import { useState } from "react";

const plasticos = [
  {
    codigo: "1",
    sigla: "PET",
    nombre: "Polietilentereftalato",
    descripcion:
      "Termoplástico utilizado ampliamente en envases y recipientes. El código de identificación de resina 1 corresponde a PET.",
    caracteristicas:
      "Ligero, resistente a impactos, con buenas propiedades de barrera frente a agua y gases; puede presentarse transparente y es común en envases.",
    productos:
      "Botellas de agua y bebidas, frascos y otros envases; también se utiliza en fibras textiles, flejes y algunos productos para alimentos.",
    propiedades:
      "Buena resistencia mecánica; buenas propiedades de barrera; apto para fabricar envases y fibras.",
    manejo:
      "Separar por tipo de resina; mantener el material libre de residuos y contaminantes cuando sea posible; clasificar y entregar a un gestor/reciclador que confirme su recepción.",
    aprovechamiento:
      "Puede ser recuperado mediante clasificación, limpieza, trituración y transformación en materia prima secundaria. El producto resultante depende de la calidad y del proceso del reciclador.",
    observaciones:
      "El código de identificación de resina sirve para identificar la resina y no significa por sí mismo que el artículo sea reciclable o que exista un sistema local para recuperarlo.",
    fuente:
      "ASTM D7611/D7611M-21; U.S. EPA, Sustainable End-of-Life Management of Plastics",
    fecha: "2026-09-26",
  },
  {
    codigo: "2",
    sigla: "PEAD",
    nombre: "Polietileno de alta densidad",
    descripcion:
      "Termoplástico rígido o semirrígido. El código de identificación de resina 2 corresponde a HDPE/PEAD.",
    caracteristicas:
      "Resistente, rígido, con buena resistencia química; puede ser translúcido o pigmentado.",
    productos:
      "Botellas y recipientes para leche, agua, detergentes, blanqueadores y otros productos químicos; tuberías, conductos, canecas y cajas.",
    propiedades:
      "Buena resistencia química y mecánica; adecuado para envases y productos durables.",
    manejo:
      "Separar del resto de resinas, evitar contaminación con otros materiales y residuos, y entregar a un reciclador que confirme la recepción de PEAD.",
    aprovechamiento:
      "Puede clasificarse, limpiarse, triturarse y reprocesarse mecánicamente para obtener materia prima secundaria y productos como recipientes no alimentarios, madera plástica, canecas o cajas.",
    observaciones:
      "PEAD es la denominación usada en Colombia para HDPE. El código 2 identifica la resina, no garantiza reciclabilidad.",
    fuente:
      "ASTM D7611/D7611M-21; U.S. EPA, Sustainable End-of-Life Management of Plastics",
    fecha: "2026-09-26",
  },
  {
    codigo: "3",
    sigla: "PVC",
    nombre: "Policloruro de vinilo",
    descripcion:
      "Termoplástico que puede ser rígido o flexible. El código de identificación de resina 3 corresponde a PVC.",
    caracteristicas:
      "Puede presentar alta resistencia al impacto; es resistente a grasas, aceites y productos químicos; puede formularse rígido o flexible.",
    productos:
      "Tuberías y accesorios, perfiles y materiales de construcción, envases rígidos, blísteres, empaques y películas flexibles.",
    propiedades:
      "Resistencia química, posibilidad de formulación rígida o flexible y buena resistencia al impacto según la formulación.",
    manejo:
      "Separar de otras resinas y evitar mezclar PVC rígido y flexible cuando el reciclador requiera clasificación específica. Confirmar previamente aceptación y condiciones de entrega.",
    aprovechamiento:
      "Puede aprovecharse mediante procesos de clasificación, limpieza y reprocesamiento; la viabilidad depende del tipo de PVC, aditivos, contaminación y mercado del material recuperado.",
    observaciones:
      "No debe asumirse que todo PVC es recibido por cualquier reciclador. El código 3 identifica la resina.",
    fuente:
      "ASTM D7611/D7611M-21; U.S. EPA, Sustainable End-of-Life Management of Plastics",
    fecha: "2026-09-26",
  },
  {
    codigo: "4",
    sigla: "PEBD",
    nombre: "Polietileno de baja densidad",
    descripcion:
      "Termoplástico flexible. El código de identificación de resina 4 corresponde a LDPE/PEBD.",
    caracteristicas:
      "Flexible, resistente y generalmente transparente; adecuado para películas y aplicaciones donde se requiere flexibilidad y sellado térmico.",
    productos:
      "Bolsas, películas de estiramiento y contracción, envolturas, tapas, botellas flexibles y recubrimientos.",
    propiedades:
      "Flexibilidad, resistencia y capacidad de formar películas; puede utilizarse en aplicaciones de sellado térmico.",
    manejo:
      "Mantener películas y bolsas limpias y secas, retirar contaminantes cuando sea posible y evitar mezclarlas con otras resinas. Confirmar con el reciclador si recibe películas/bolsas de PEBD.",
    aprovechamiento:
      "Puede clasificarse, limpiarse, triturarse y reprocesarse. La aceptación depende especialmente de la limpieza, forma del material y capacidad del reciclador.",
    observaciones:
      "PEBD corresponde a LDPE. Las películas y bolsas pueden tener rutas de aprovechamiento diferentes a las de envases rígidos.",
    fuente:
      "ASTM D7611/D7611M-21; U.S. EPA, Sustainable End-of-Life Management of Plastics",
    fecha: "2026-09-26",
  },
  {
    codigo: "5",
    sigla: "PP",
    nombre: "Polipropileno",
    descripcion:
      "Termoplástico de buena resistencia y alta temperatura de fusión relativa. El código de identificación de resina 5 corresponde a PP.",
    caracteristicas:
      "Resistente, relativamente rígido y resistente a muchos productos químicos; soporta temperaturas superiores a las de algunos otros plásticos de uso común.",
    productos:
      "Recipientes para alimentos, envases de yogur y margarina, tapas, botellas, recipientes para comida y piezas de bienes durables.",
    propiedades:
      "Buena resistencia química, resistencia mecánica y temperatura de fusión relativamente alta.",
    manejo:
      "Separar por resina, mantener limpio y seco cuando sea posible y confirmar que el reciclador acepte PP antes de la entrega.",
    aprovechamiento:
      "Puede recuperarse mediante clasificación, limpieza, trituración y reprocesamiento mecánico para obtener materia prima secundaria y nuevos productos.",
    observaciones:
      "La identificación como PP no garantiza por sí sola que el material tenga una ruta de reciclaje disponible.",
    fuente:
      "ASTM D7611/D7611M-21; U.S. EPA, Sustainable End-of-Life Management of Plastics",
    fecha: "2026-09-26",
  },
  {
    codigo: "6",
    sigla: "PS",
    nombre: "Poliestireno",
    descripcion:
      "Termoplástico que puede ser rígido o espumado. El código de identificación de resina 6 corresponde a PS.",
    caracteristicas:
      "Puede ser transparente, duro y quebradizo; también puede presentarse como espuma para embalaje y aislamiento.",
    productos:
      "Envases y recipientes para alimentos, bandejas para carne, recipientes para comida para llevar, vasos y platos desechables, espuma de protección y material de embalaje.",
    propiedades:
      "Rigidez en presentaciones sólidas; baja temperatura de fusión relativa; puede producirse como material espumado.",
    manejo:
      "Separar del resto de resinas y mantenerlo libre de residuos. Diferenciar PS rígido de PS espumado cuando el reciclador lo requiera y confirmar aceptación antes de transportar.",
    aprovechamiento:
      "Puede someterse a clasificación y reprocesamiento; las posibilidades dependen de la presentación, contaminación y existencia de un mercado o proceso para el material recuperado.",
    observaciones:
      "PS puede aparecer en forma rígida o espumada. No debe suponerse que ambas presentaciones tienen la misma ruta de aprovechamiento.",
    fuente:
      "ASTM D7611/D7611M-21; U.S. EPA, Sustainable End-of-Life Management of Plastics",
    fecha: "2026-09-26",
  },
  {
    codigo: "7",
    sigla: "Otros",
    nombre: "Otras resinas de plásticos o mezclas",
    descripcion:
      "Categoría de identificación de resina utilizada para plásticos que no corresponden a los códigos 1 a 6 o para determinadas mezclas/categorías de otros plásticos.",
    caracteristicas:
      "Categoría heterogénea; sus propiedades dependen de la resina específica, mezcla, aditivos, estructura multicapa u otros componentes.",
    productos:
      "Productos fabricados con resinas distintas de PET, PEAD, PVC, PEBD, PP y PS; algunos artículos pueden contener mezclas o estructuras complejas.",
    propiedades:
      "No existe una propiedad única para el código 7, porque agrupa materiales de composición y propiedades diferentes.",
    manejo:
      "No asumir que todo material código 7 es equivalente. Identificar la composición cuando sea posible, mantenerlo separado y consultar al reciclador sobre aceptación y condiciones específicas.",
    aprovechamiento:
      "Depende de la resina, mezcla, pureza, diseño del producto y tecnología disponible. Puede requerir rutas especializadas y no necesariamente tiene la misma ruta que PET, PEAD, PVC, PEBD, PP o PS.",
    observaciones:
      "Código 7 no es un polímero específico. La clasificación se debe conservar como categoría “Otros” y no convertirla en una resina única.",
    fuente:
      "ASTM D7611/D7611M-21; U.S. EPA, How Do I Recycle? Common Recyclables",
    fecha: "2026-09-26",
  },
];

export default function IdentificarPage() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] =
    useState<(typeof plasticos)[number] | null>(null);

  const identificar = () => {
    const plasticoEncontrado = plasticos.find(
      (plastico) => plastico.codigo === codigo
    );

    setResultado(plasticoEncontrado || null);
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f8f6",
        padding: "40px 20px",
      }}
    >
      <section style={{ maxWidth: "900px", margin: "0 auto" }}>
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
            marginBottom: "15px",
            color: "#123b2a",
          }}
        >
          Identificar plástico
        </h1>

        <p
          style={{
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          Selecciona el código de identificación de resina para consultar
          información sobre el plástico.
        </p>

        <div
          style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <label
            htmlFor="codigo"
            style={{
              display: "block",
              fontWeight: "700",
              marginBottom: "10px",
            }}
          >
            Código de resina
          </label>

          <select
            id="codigo"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              fontSize: "16px",
            }}
          >
            <option value="">Selecciona un código</option>

            {plasticos.map((plastico) => (
              <option key={plastico.codigo} value={plastico.codigo}>
                {plastico.codigo} - {plastico.sigla}
              </option>
            ))}
          </select>

          <button
            onClick={identificar}
            disabled={!codigo}
            style={{
              padding: "12px 22px",
              border: "none",
              borderRadius: "8px",
              background: codigo ? "#16803c" : "#999",
              color: "white",
              fontWeight: "700",
              cursor: codigo ? "pointer" : "not-allowed",
            }}
          >
            Identificar plástico
          </button>
        </div>

        {resultado && (
          <section
            style={{
              background: "#ffffff",
              border: "1px solid #dfe7e2",
              borderRadius: "15px",
              padding: "30px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
            }}
          >
            <p
              style={{
                color: "#16803c",
                fontWeight: "700",
                marginBottom: "8px",
              }}
            >
              RESULTADO
            </p>

            <h2
              style={{
                fontSize: "30px",
                marginBottom: "8px",
                color: "#123b2a",
              }}
            >
              {resultado.sigla}
            </h2>

            <p style={{ fontWeight: "600", marginBottom: "20px" }}>
              Código de resina: {resultado.codigo}
            </p>

            <div
              style={{
                display: "grid",
                gap: "18px",
              }}
            >
              <div>
                <h3>Nombre</h3>
                <p>{resultado.nombre}</p>
              </div>

              <div>
                <h3>Descripción</h3>
                <p style={{ lineHeight: "1.6" }}>
                  {resultado.descripcion}
                </p>
              </div>

              <div>
                <h3>Características</h3>
                <p style={{ lineHeight: "1.6" }}>
                  {resultado.caracteristicas}
                </p>
              </div>

              <div>
                <h3>Productos comunes</h3>
                <p style={{ lineHeight: "1.6" }}>
                  {resultado.productos}
                </p>
              </div>

              <div>
                <h3>Propiedades</h3>
                <p style={{ lineHeight: "1.6" }}>
                  {resultado.propiedades}
                </p>
              </div>

              <div>
                <h3>Recomendaciones de manejo</h3>
                <p style={{ lineHeight: "1.6" }}>
                  {resultado.manejo}
                </p>
              </div>

              <div>
                <h3>Aprovechamiento</h3>
                <p style={{ lineHeight: "1.6" }}>
                  {resultado.aprovechamiento}
                </p>
              </div>

              <div
                style={{
                  background: "#f5f8f6",
                  padding: "18px",
                  borderRadius: "10px",
                }}
              >
                <h3>Observaciones</h3>
                <p style={{ lineHeight: "1.6" }}>
                  {resultado.observaciones}
                </p>
              </div>

              <div
                style={{
                  borderTop: "1px solid #ddd",
                  paddingTop: "18px",
                }}
              >
                <h3>Fuente</h3>
                <p style={{ lineHeight: "1.6" }}>
                  {resultado.fuente}
                </p>

                <p style={{ marginTop: "10px", fontSize: "14px" }}>
                  <strong>Fecha de verificación:</strong>{" "}
                  {resultado.fecha}
                </p>
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}