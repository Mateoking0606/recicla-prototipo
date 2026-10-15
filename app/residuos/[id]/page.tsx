 
import Link from "next/link";

export default async function FichaResiduo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="container detail">
      <Link href="/residuos" className="link">
        ← Volver al catálogo
      </Link>

      <div style={{ marginTop: "30px" }}>
        <h1>
  {id === "botella-agua"
    ? "Botella de agua — Ficha técnica"
    : id === "botella-gaseosa"
    ? "Botella de gaseosa — Ficha técnica"
    : id === "empaque-papas-fritas"
? "Empaque de papas fritas — Ficha técnica"
: id === "bolsa-arroz"
? "Bolsa de arroz — Ficha técnica"
: id === "empaque-pasta"
? "Empaque de pasta — Ficha técnica"
: id === "envase-yogur"
? "Envase de yogur — Ficha técnica"
: "Ficha técnica del residuo"}
</h1>
{id === "botella-agua" && (
  <img
    src="/residuos/botella-agua.png"
    alt="Botella de agua plástica vacía"
    style={{
      width: "280px",
      maxWidth: "100%",
      height: "300px",
      objectFit: "contain",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "20px",
    }}
  />
)}
{id === "botella-gaseosa" && (
  <img
    src="/residuos/botella-gaseosa.png"
    alt="Botella de gaseosa plástica vacía"
    style={{
      width: "280px",
      maxWidth: "100%",
      height: "300px",
      objectFit: "contain",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "20px",
    }}
  />
)}

{id === "empaque-papas-fritas" && (
  <img
    src="/residuos/empaque-papas-fritas.png"
    alt="Empaque plástico vacío de papas fritas"
    style={{
      width: "280px",
      maxWidth: "100%",
      height: "300px",
      objectFit: "contain",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "20px",
    }}
  />
)}

{id === "bolsa-arroz" && (
  <img
    src="/residuos/bolsa-arroz.png"
    alt="Bolsa plástica de arroz vacía"
    style={{
      width: "280px",
      maxWidth: "100%",
      height: "300px",
      objectFit: "contain",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "20px",
    }}
  />
)}

{id === "empaque-pasta" && (
  <img
    src="/residuos/empaque-pasta.png"
    alt="Empaque plástico de pasta"
    style={{
      width: "280px",
      maxWidth: "100%",
      height: "300px",
      objectFit: "contain",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "20px",
    }}
  />
)}

{id === "envase-yogur" && (
  <img
    src="/residuos/envase-yogur.png"
    alt="Envase plástico de yogur"
    style={{
      width: "280px",
      maxWidth: "100%",
      height: "300px",
      objectFit: "contain",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "20px",
    }}
  />
)}
        <p>
          Identificador: <strong>{id}</strong>
        </p>
        {id === "envase-yogur" && (
  <section
    style={{
      backgroundColor: "#e3f3e9",
      padding: "20px",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "25px",
      maxWidth: "650px",
    }}
  >
    <h2>Identificación del material</h2>

    <p><strong>Residuo:</strong> Envase de yogur</p>
    <p><strong>Categoría:</strong> Envase plástico de productos lácteos</p>
    <p><strong>Material:</strong> Por verificar</p>

    <p>
      <strong>Composición posible:</strong> Polipropileno (PP),
      poliestireno (PS) u otros polímeros, dependiendo
      del fabricante y del tipo de envase.
    </p>

    <p><strong>Código de identificación:</strong> No determinado</p>
    <p><strong>Origen:</strong> Envase plástico postconsumo</p>
    <p><strong>Uso:</strong> Almacenamiento y comercialización de yogur</p>

    <p>
      <strong>Verificación:</strong> Revisar el símbolo de
      identificación del plástico en la base del envase
      o consultar la información del fabricante.
    </p>
  </section>
)}
        {id === "empaque-pasta" && (
  <section
    style={{
      backgroundColor: "#e3f3e9",
      padding: "20px",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "25px",
      maxWidth: "650px",
    }}
  >
    <h2>Identificación del material</h2>

    <p><strong>Residuo:</strong> Empaque de pasta</p>
    <p><strong>Categoría:</strong> Empaque de alimentos secos</p>
    <p><strong>Material:</strong> Por verificar</p>

    <p>
      <strong>Composición posible:</strong> Polipropileno,
      polietileno o estructuras multicapa, dependiendo
      del fabricante y del tipo de presentación.
    </p>

    <p><strong>Código de identificación:</strong> No determinado</p>
    <p><strong>Origen:</strong> Empaque plástico postconsumo</p>
    <p><strong>Uso:</strong> Protección y conservación de pasta alimenticia</p>

    <p>
      <strong>Verificación:</strong> Revisar la información
      del fabricante y el código de identificación del
      empaque para confirmar su composición.
    </p>
  </section>
)}
        {id === "bolsa-arroz" && (
  <section
    style={{
      backgroundColor: "#e3f3e9",
      padding: "20px",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "25px",
      maxWidth: "650px",
    }}
  >
    <h2>Identificación del material</h2>

    <p><strong>Residuo:</strong> Bolsa de arroz</p>
    <p><strong>Categoría:</strong> Empaque de alimentos secos</p>
    <p><strong>Material:</strong> Por verificar</p>
    <p>
      <strong>Composición posible:</strong> Polietileno,
      polipropileno o estructuras plásticas multicapa,
      dependiendo del fabricante.
    </p>
    <p><strong>Código de identificación:</strong> No determinado</p>
    <p><strong>Origen:</strong> Empaque plástico postconsumo</p>
    <p><strong>Uso:</strong> Almacenamiento y comercialización de arroz</p>
    <p>
      <strong>Verificación:</strong> Revisar la etiqueta,
      el código del envase o la información del fabricante
      para confirmar el polímero.
    </p>
  </section>
)}
        {id === "empaque-papas-fritas" && (
  <section
    style={{
      backgroundColor: "#e3f3e9",
      padding: "20px",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "25px",
      maxWidth: "650px",
    }}
  >
    <h2>Identificación del material</h2>

    <p><strong>Residuo:</strong> Empaque de papas fritas</p>
    <p><strong>Categoría:</strong> Empaque flexible de alimentos</p>
    <p><strong>Material:</strong> Por verificar</p>
    <p><strong>Composición posible:</strong> Películas plásticas multicapa, que pueden incluir polipropileno y capas metalizadas.</p>
    <p><strong>Código de identificación:</strong> No determinado</p>
    <p><strong>Origen:</strong> Plástico postconsumo de alimentos</p>
    <p><strong>Uso:</strong> Protección y conservación de pasabocas</p>

    <p>
      <strong>Verificación:</strong> Consultar la información
      del fabricante o realizar una caracterización técnica.
      No se debe asumir que todos estos empaques tienen
      la misma composición.
    </p>
  </section>
)}
        {id === "botella-gaseosa" && (
  <section
    style={{
      backgroundColor: "#e3f3e9",
      padding: "20px",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "25px",
      maxWidth: "600px",
    }}
  >
    <h2>Identificación del polímero</h2>

    <p><strong>Residuo:</strong> Botella de gaseosa</p>
    <p><strong>Material habitual:</strong> PET</p>
    <p><strong>Nombre técnico:</strong> Tereftalato de polietileno</p>
    <p><strong>Código de identificación:</strong> 01 — PET</p>
    <p><strong>Origen:</strong> Envase plástico postconsumo</p>
    <p><strong>Uso:</strong> Envasado de bebidas gaseosas</p>

    <p>
      <strong>Verificación:</strong> Revisar el código de
      identificación del envase. No todas las botellas
      tienen necesariamente la misma composición.
    </p>
  </section>
)}

{id === "botella-agua" && (
  <section
    style={{
      backgroundColor: "#e3f3e9",
      padding: "20px",
      borderRadius: "16px",
      marginTop: "20px",
      marginBottom: "25px",
      maxWidth: "600px",
    }}
  >
    <h2>Identificación del polímero</h2>

    <p><strong>Material habitual:</strong> PET</p>
    <p><strong>Nombre técnico:</strong> Tereftalato de polietileno</p>
    <p><strong>Código de identificación:</strong> 01</p>
    <p><strong>Origen:</strong> Plástico postconsumo</p>
    <p><strong>Uso:</strong> Envases para bebidas</p>
    <p>
      <strong>Verificación:</strong> Confirmar el material
      mediante el código del envase o una caracterización técnica.
    </p>
  </section>
)}

{id === "botella-gaseosa" && (
  <>
    <h2>Caracterización y circularidad</h2>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "20px",
      }}
    >
      <h3>Ficha técnica del polímero PET</h3>

      <p><strong>Nombre técnico:</strong> Tereftalato de polietileno</p>
      <p><strong>Código de reciclaje:</strong> 01 — PET</p>
      <p><strong>Densidad:</strong> 1,38–1,40 g/cm³ (referencia)</p>
      <p><strong>Temperatura de fusión:</strong> Aproximadamente 250–260 °C</p>
      <p><strong>Aplicación:</strong> Envases para bebidas gaseosas</p>
      <p><strong>Reciclabilidad:</strong> Potencialmente alta cuando existe recolección y procesamiento adecuados.</p>
      <p><strong>Preparación:</strong> Vaciar, escurrir y separar el envase.</p>
      <p><strong>Aprovechamiento:</strong> Puede transformarse en fibras, láminas y nuevos productos plásticos.</p>

      <p style={{ fontSize: "13px", marginTop: "20px" }}>
        Nota: Estos valores corresponden al PET como material de
        referencia. Verificar el polímero real de la botella.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ Ruta de circularidad</h2>

      <p>🥤 <strong>1. Consumidor:</strong> Vacía y separa la botella.</p>
      <p>♻️ <strong>2. Reciclador:</strong> Recolecta y clasifica el envase.</p>
      <p>📍 <strong>3. Centro de acopio:</strong> Agrupa las botellas PET.</p>
      <p>🏭 <strong>4. Transformación:</strong> El material se clasifica, lava y procesa.</p>
      <p>🌱 <strong>5. Nuevo producto:</strong> El PET recuperado puede convertirse en otros productos.</p>

      <p style={{ fontSize: "13px", marginTop: "18px" }}>
        Ruta orientativa. El destino real depende de los gestores
        y procesos de aprovechamiento disponibles.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f4e9",
        padding: "25px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ ¿Dónde entregar este residuo?</h2>

      <p>
        Consulta el directorio de recicladores de Bucaramanga
        y confirma cuáles reciben botellas PET.
      </p>

      <Link href="/recicladores?material=PET" className="link">
        Ver directorio de recicladores →
      </Link>
    </section>
  </>
)}

{id === "empaque-papas-fritas" && (
  <>
    <h2>Caracterización y circularidad</h2>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "20px",
      }}
    >
      <h3>Ficha técnica del empaque flexible</h3>

      <p><strong>Tipo:</strong> Empaque flexible para alimentos.</p>
      <p><strong>Composición:</strong> Por verificar; puede incluir películas plásticas multicapa o metalizadas.</p>
      <p><strong>Densidad:</strong> No determinada sin identificar los materiales.</p>
      <p><strong>Temperatura de fusión:</strong> No se asigna un valor único a un empaque de composición desconocida.</p>
      <p><strong>Código de reciclaje:</strong> No determinado.</p>
      <p><strong>Reciclabilidad:</strong> Depende de su composición y de la existencia de procesos de aprovechamiento adecuados.</p>
      <p><strong>Preparación:</strong> Retirar las migas y conservar el empaque seco.</p>
      <p><strong>Aprovechamiento:</strong> Puede requerir procesos especializados si se confirma que es multicapa.</p>

      <p style={{ fontSize: "13px", marginTop: "20px" }}>
        Nota: No se debe asignar automáticamente el código PET,
        PP u otro sin verificar la composición del empaque.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ Ruta de circularidad</h2>

      <p>🥔 <strong>1. Consumidor:</strong> Vacía el empaque y retira los residuos de alimento.</p>
      <p>♻️ <strong>2. Clasificación:</strong> Se identifica el tipo de material.</p>
      <p>📍 <strong>3. Gestor:</strong> Se consulta si existe recepción para ese empaque.</p>
      <p>🏭 <strong>4. Aprovechamiento:</strong> Si existe una tecnología compatible, el material puede procesarse.</p>
      <p>🌱 <strong>5. Destino:</strong> Depende de la composición y del proceso disponible.</p>

      <p style={{ fontSize: "13px", marginTop: "18px" }}>
        Esta ruta es orientativa y no garantiza que el empaque
        sea aceptado o reciclado.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f4e9",
        padding: "25px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ ¿Dónde entregar este residuo?</h2>

      <p>
        Consulta el directorio de recicladores de Bucaramanga
        y pregunta si reciben empaques flexibles o multicapa.
      </p>

      <Link href="/recicladores" className="link">
        Ver directorio de recicladores →
      </Link>
    </section>
  </>
)}

{id === "bolsa-arroz" && (
  <>
    <h2>Caracterización y circularidad</h2>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "20px",
      }}
    >
      <h3>Ficha técnica del empaque plástico</h3>

      <p><strong>Tipo:</strong> Bolsa flexible para arroz.</p>
      <p><strong>Material:</strong> Por verificar.</p>
      <p><strong>Composición posible:</strong> Polietileno, polipropileno o materiales multicapa.</p>
      <p><strong>Densidad:</strong> No determinada sin identificar el polímero.</p>
      <p><strong>Temperatura de fusión:</strong> Depende de la composición del empaque.</p>
      <p><strong>Código de reciclaje:</strong> No determinado.</p>
      <p><strong>Preparación:</strong> Retirar los restos de arroz y conservar la bolsa limpia y seca.</p>
      <p><strong>Reciclabilidad:</strong> Depende del material y de los sistemas de aprovechamiento disponibles.</p>
      <p><strong>Aprovechamiento:</strong> Puede destinarse a procesos de reciclaje compatibles si se identifica y acepta el material.</p>

      <p style={{ fontSize: "13px", marginTop: "20px" }}>
        Nota: Las propiedades técnicas deben confirmarse
        mediante la identificación del material.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ Ruta de circularidad</h2>

      <p>🍚 <strong>1. Consumidor:</strong> Vacía y conserva seca la bolsa.</p>
      <p>♻️ <strong>2. Clasificación:</strong> Se identifica el tipo de plástico.</p>
      <p>📍 <strong>3. Centro de acopio:</strong> Se verifica si recibe este material.</p>
      <p>🏭 <strong>4. Transformación:</strong> El material aceptado puede procesarse para nuevos usos.</p>
      <p>🌱 <strong>5. Nuevo producto:</strong> Depende del polímero y de la tecnología disponible.</p>

      <p style={{ fontSize: "13px", marginTop: "18px" }}>
        Esta ruta es orientativa y no garantiza
        el aprovechamiento de todas las bolsas.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f4e9",
        padding: "25px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ ¿Dónde entregar este residuo?</h2>

      <p>
        Consulta el directorio de recicladores de Bucaramanga
        y confirma si reciben bolsas plásticas de arroz.
      </p>

      <Link href="/recicladores" className="link">
        Ver directorio de recicladores →
      </Link>
    </section>
  </>
)}

{id === "empaque-pasta" && (
  <>
    <h2>Caracterización y circularidad</h2>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "20px",
      }}
    >
      <h3>Ficha técnica del empaque de pasta</h3>

      <p><strong>Tipo:</strong> Empaque flexible para alimentos secos.</p>
      <p><strong>Material:</strong> Por verificar.</p>
      <p><strong>Composición posible:</strong> Polipropileno, polietileno o estructuras multicapa.</p>
      <p><strong>Densidad:</strong> No determinada sin identificar el polímero.</p>
      <p><strong>Temperatura de fusión:</strong> Depende de la composición.</p>
      <p><strong>Código de reciclaje:</strong> No determinado.</p>
      <p><strong>Preparación:</strong> Retirar los restos de pasta y mantener el empaque limpio y seco.</p>
      <p><strong>Reciclabilidad:</strong> Depende del material y de los procesos disponibles.</p>
      <p><strong>Aprovechamiento:</strong> Posible mediante procesos compatibles, si un gestor acepta el material.</p>

      <p style={{ fontSize: "13px", marginTop: "20px" }}>
        Nota: La composición y las propiedades técnicas
        deben confirmarse con el fabricante.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ Ruta de circularidad</h2>

      <p>🍝 <strong>1. Consumidor:</strong> Vacía y conserva seco el empaque.</p>
      <p>♻️ <strong>2. Clasificación:</strong> Se identifica el material.</p>
      <p>📍 <strong>3. Centro de acopio:</strong> Se confirma su recepción.</p>
      <p>🏭 <strong>4. Transformación:</strong> El material aceptado puede procesarse.</p>
      <p>🌱 <strong>5. Nuevo producto:</strong> Depende del proceso de aprovechamiento.</p>

      <p style={{ fontSize: "13px", marginTop: "18px" }}>
        Esta ruta es orientativa y no garantiza
        que todos los empaques de pasta sean reciclables.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f4e9",
        padding: "25px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ ¿Dónde entregar este residuo?</h2>

      <p>
        Consulta el directorio de recicladores de Bucaramanga
        y confirma si reciben empaques plásticos de pasta.
      </p>

      <Link href="/recicladores" className="link">
        Ver directorio de recicladores →
      </Link>
    </section>
  </>
)}

{id === "envase-yogur" && (
  <>
    <h2>Caracterización y circularidad</h2>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "20px",
      }}
    >
      <h3>Ficha técnica del envase de yogur</h3>

      <p><strong>Tipo:</strong> Envase plástico para productos lácteos.</p>
      <p><strong>Material:</strong> Por verificar.</p>
      <p><strong>Composición posible:</strong> Polipropileno (PP), poliestireno (PS) u otros materiales.</p>
      <p><strong>Densidad:</strong> Depende del polímero identificado.</p>
      <p><strong>Temperatura de fusión:</strong> No determinada sin conocer el material.</p>
      <p><strong>Código de reciclaje:</strong> No determinado.</p>
      <p><strong>Preparación:</strong> Vaciar, retirar los restos de yogur y dejar el envase limpio y seco.</p>
      <p><strong>Reciclabilidad:</strong> Depende del material y de su aceptación por los gestores.</p>
      <p><strong>Aprovechamiento:</strong> Puede transformarse en nuevos productos mediante procesos compatibles.</p>

      <p style={{ fontSize: "13px", marginTop: "20px" }}>
        Nota: Las propiedades técnicas deben confirmarse
        después de identificar el polímero del envase.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f3e9",
        padding: "24px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ Ruta de circularidad</h2>

      <p>🥛 <strong>1. Consumidor:</strong> Vacía y limpia el envase.</p>
      <p>♻️ <strong>2. Clasificación:</strong> Se identifica el tipo de plástico.</p>
      <p>📍 <strong>3. Centro de acopio:</strong> Se verifica si recibe ese material.</p>
      <p>🏭 <strong>4. Transformación:</strong> El plástico aceptado puede procesarse.</p>
      <p>🌱 <strong>5. Nuevo producto:</strong> Depende del polímero y del proceso utilizado.</p>

      <p style={{ fontSize: "13px", marginTop: "18px" }}>
        Esta ruta es orientativa. No todos los envases de yogur
        son aceptados por los mismos recicladores.
      </p>
    </section>

    <section
      style={{
        backgroundColor: "#e3f4e9",
        padding: "25px",
        borderRadius: "16px",
        maxWidth: "650px",
        marginTop: "25px",
      }}
    >
      <h2>♻️ ¿Dónde entregar este residuo?</h2>

      <p>
        Consulta el directorio de recicladores de Bucaramanga
        y confirma si reciben envases de yogur del material identificado.
      </p>

      <Link href="/recicladores" className="link">
        Ver directorio de recicladores →
      </Link>
    </section>
  </>
)}

{id === "botella-agua" && (
  <>    
<h2>Caracterización y circularidad</h2>

<section
  style={{
    backgroundColor: "#e3f3e9",
    padding: "24px",
    borderRadius: "16px",
    maxWidth: "650px",
    marginTop: "20px",
  }}
>
  <h3>Ficha técnica del polímero PET</h3>

  <p><strong>Nombre:</strong> Tereftalato de polietileno</p>
  <p><strong>Densidad:</strong> 1,38–1,40 g/cm³ (valor de referencia)</p>
  <p><strong>Punto de fusión:</strong> Aproximadamente 250–260 °C</p>
  <p><strong>Código de reciclaje:</strong> 01 — PET</p>
  <p><strong>Reciclabilidad:</strong> Potencialmente alta, según condiciones de recolección y procesamiento.</p>
  <p><strong>Origen:</strong> Envase plástico postconsumo</p>
  <p><strong>Preparación:</strong> Vaciar, escurrir y separar según las indicaciones del centro de acopio.</p>
  <p><strong>Aprovechamiento:</strong> Puede transformarse en fibras textiles, láminas y nuevos productos plásticos.</p>

  <p style={{ fontSize: "13px", marginTop: "20px" }}>
    Nota: Propiedades orientativas. La identificación del material debe verificarse.
  </p>
</section>

<section
  style={{
    backgroundColor: "#e3f3e9",
    padding: "24px",
    borderRadius: "16px",
    marginTop: "25px",
    maxWidth: "650px",
  }}
>
  <h2>Ruta de circularidad del residuo</h2>

  <p>
    Conoce el recorrido que puede seguir una botella PET
    después de su consumo.
  </p>

  <p>🥤 <strong>1. Consumidor:</strong> Vacía y separa la botella.</p>

  <p>♻️ <strong>2. Reciclador:</strong> Recolecta y clasifica el material.</p>

  <p>📍 <strong>3. Centro de acopio:</strong> Recibe y agrupa las botellas PET.</p>

  <p>🏭 <strong>4. Empresa transformadora:</strong> Procesa el PET recuperado.</p>

  <p>🌱 <strong>5. Nuevo producto:</strong> El material puede convertirse en fibras, láminas u otros productos.</p>

  <p style={{ fontSize: "13px", marginTop: "18px" }}>
    Esta es una ruta general de referencia. Los centros, empresas
    y destinos reales se incorporarán después de verificar la información.
  </p>
</section>

<section
  style={{
    backgroundColor: "#e3f4e9",
    padding: "25px",
    borderRadius: "16px",
    marginTop: "25px",
    maxWidth: "650px",
  }}
>
  <h2>♻️ ¿Dónde entregar este residuo?</h2>

  <p>
    Consulta nuestro directorio de recicladores en Bucaramanga
    y verifica cuáles reciben botellas plásticas PET.
  </p>

  <Link href="/recicladores?material=PET" className="link">
    Ver directorio de recicladores →
  </Link>
</section>
  </>
)}

      </div>
    </main>
  );
}
