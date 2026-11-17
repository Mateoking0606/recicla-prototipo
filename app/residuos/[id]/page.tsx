 
import Link from "next/link";
import { notFound } from "next/navigation";

type DatoTecnico = {
  etiqueta: string;
  valor: string;
};

type ResiduoFicha = {
  nombre: string;
  categoria: string;
  imagen: string;
  alt: string;
  material: string;
  codigo: string;
  descripcion: string;
  identificacion: DatoTecnico[];
  caracterizacion: DatoTecnico[];
  preparacion: string[];
  ruta: string[];
  nota: string;
  consulta: string;
  enlace: string;
};

const residuos: Record<string, ResiduoFicha> = {
  "botella-agua": {
    nombre: "Botella de agua",
    categoria: "Envases de bebidas",
    imagen: "/residuos/botella-agua.png",
    alt: "Botella de agua plástica vacía",
    material: "PET (habitual)",
    codigo: "01 — PET (referencia)",
    descripcion:
      "Envase plástico utilizado para almacenar y comercializar agua. Después de consumir su contenido, la botella vacía se convierte en un residuo posconsumo.",
    identificacion: [
      { etiqueta: "Material habitual", valor: "PET" },
      {
        etiqueta: "Nombre técnico",
        valor: "Tereftalato de polietileno",
      },
      { etiqueta: "Código de identificación", valor: "01" },
      { etiqueta: "Origen", valor: "Envase plástico posconsumo" },
      { etiqueta: "Uso", valor: "Envasado de agua para consumo" },
    ],
    caracterizacion: [
      {
        etiqueta: "Nombre",
        valor: "Tereftalato de polietileno",
      },
      {
        etiqueta: "Densidad",
        valor: "1,38–1,40 g/cm³ (valor de referencia)",
      },
      {
        etiqueta: "Punto de fusión",
        valor: "Aproximadamente 250–260 °C",
      },
      { etiqueta: "Código de reciclaje", valor: "01 — PET" },
      {
        etiqueta: "Reciclabilidad",
        valor:
          "Potencialmente alta, según las condiciones de recolección y procesamiento.",
      },
      {
        etiqueta: "Aprovechamiento",
        valor:
          "Puede transformarse en fibras textiles, láminas y nuevos productos plásticos.",
      },
    ],
    preparacion: [
      "Vacía completamente el contenido de la botella.",
      "Escurre el agua restante.",
      "Separa el envase de otros residuos.",
      "Consulta las indicaciones del punto de recepción.",
    ],
    ruta: [
      "Consumidor: vacía y separa la botella.",
      "Reciclador: recolecta y clasifica el material.",
      "Centro de acopio: recibe y agrupa las botellas PET.",
      "Empresa transformadora: procesa el PET recuperado.",
      "Nuevo producto: el material puede convertirse en fibras, láminas u otros productos.",
    ],
    nota:
      "Las propiedades son orientativas. Se debe verificar el material real mediante el código del envase o una caracterización técnica. La ruta es general y no representa un destino confirmado.",
    consulta:
      "Consulta el directorio de recicladores en Bucaramanga y verifica cuáles reciben botellas plásticas PET.",
    enlace: "/recicladores?material=PET",
  },

  "botella-gaseosa": {
    nombre: "Botella de gaseosa",
    categoria: "Envases de bebidas",
    imagen: "/residuos/botella-gaseosa.png",
    alt: "Botella de gaseosa plástica vacía",
    material: "PET (habitual)",
    codigo: "01 — PET (referencia)",
    descripcion:
      "Envase plástico utilizado para comercializar bebidas gaseosas. Una vez consumida la bebida, la botella vacía puede separarse para consultar alternativas de aprovechamiento.",
    identificacion: [
      { etiqueta: "Material habitual", valor: "PET" },
      {
        etiqueta: "Nombre técnico",
        valor: "Tereftalato de polietileno",
      },
      { etiqueta: "Código de identificación", valor: "01 — PET" },
      { etiqueta: "Origen", valor: "Envase plástico posconsumo" },
      { etiqueta: "Uso", valor: "Envasado de bebidas gaseosas" },
    ],
    caracterizacion: [
      {
        etiqueta: "Nombre técnico",
        valor: "Tereftalato de polietileno",
      },
      {
        etiqueta: "Código de reciclaje",
        valor: "01 — PET",
      },
      {
        etiqueta: "Densidad",
        valor: "1,38–1,40 g/cm³ (valor de referencia)",
      },
      {
        etiqueta: "Temperatura de fusión",
        valor: "Aproximadamente 250–260 °C",
      },
      {
        etiqueta: "Reciclabilidad",
        valor:
          "Potencialmente alta cuando existen recolección y procesamiento adecuados.",
      },
      {
        etiqueta: "Aprovechamiento",
        valor:
          "Puede transformarse en fibras, láminas y nuevos productos plásticos.",
      },
    ],
    preparacion: [
      "Vacía completamente la botella.",
      "Escurre el líquido restante.",
      "Separa el envase para su aprovechamiento.",
      "Verifica las condiciones del reciclador antes de entregarlo.",
    ],
    ruta: [
      "Consumidor: vacía y separa la botella.",
      "Reciclador: recolecta y clasifica el envase.",
      "Centro de acopio: agrupa las botellas PET.",
      "Transformación: el material se clasifica, lava y procesa.",
      "Nuevo producto: el PET recuperado puede convertirse en otros productos.",
    ],
    nota:
      "Las propiedades corresponden al PET como material de referencia. Se debe verificar el polímero real de la botella y confirmar la aceptación del gestor.",
    consulta:
      "Consulta el directorio de recicladores de Bucaramanga y pregunta cuáles reciben botellas de gaseosa PET.",
    enlace: "/recicladores?material=PET",
  },

  "empaque-papas-fritas": {
    nombre: "Empaque de papas fritas",
    categoria: "Empaques de pasabocas",
    imagen: "/residuos/empaque-papas-fritas.png",
    alt: "Empaque vacío de papas fritas",
    material: "Por verificar (posible multicapa)",
    codigo: "No determinado",
    descripcion:
      "Empaque flexible utilizado para proteger y conservar papas fritas y otros pasabocas. Su composición puede variar según el fabricante y la presentación.",
    identificacion: [
      {
        etiqueta: "Tipo",
        valor: "Empaque flexible para alimentos",
      },
      { etiqueta: "Material", valor: "Por verificar" },
      {
        etiqueta: "Composición posible",
        valor:
          "Películas plásticas multicapa que pueden incluir polipropileno y capas metalizadas.",
      },
      { etiqueta: "Código de identificación", valor: "No determinado" },
      {
        etiqueta: "Origen",
        valor: "Empaque posconsumo de alimentos",
      },
      {
        etiqueta: "Uso",
        valor: "Protección y conservación de pasabocas",
      },
    ],
    caracterizacion: [
      {
        etiqueta: "Tipo de material",
        valor: "Empaque flexible para alimentos",
      },
      {
        etiqueta: "Composición",
        valor:
          "Por verificar. Puede incluir películas plásticas multicapa o metalizadas.",
      },
      {
        etiqueta: "Densidad",
        valor: "No determinada sin identificar los materiales.",
      },
      {
        etiqueta: "Temperatura de fusión",
        valor:
          "No se asigna un valor único a un empaque de composición desconocida.",
      },
      {
        etiqueta: "Código de reciclaje",
        valor: "No determinado.",
      },
      {
        etiqueta: "Reciclabilidad",
        valor:
          "Depende de su composición y de la existencia de procesos de aprovechamiento adecuados.",
      },
      {
        etiqueta: "Aprovechamiento",
        valor:
          "Puede requerir procesos especializados si se confirma que es multicapa.",
      },
    ],
    preparacion: [
      "Retira las migas y los restos de alimento.",
      "Conserva el empaque seco.",
      "Evita mezclarlo con materiales cuya composición sí esté identificada.",
      "Pregunta al gestor si recibe empaques flexibles o multicapa.",
    ],
    ruta: [
      "Consumidor: vacía el empaque y retira los residuos de alimento.",
      "Clasificación: se identifica el tipo de material.",
      "Gestor: se consulta si existe recepción para ese empaque.",
      "Aprovechamiento: si existe una tecnología compatible, el material puede procesarse.",
      "Destino: depende de la composición y del proceso disponible.",
    ],
    nota:
      "No se debe asignar automáticamente el código PET, PP u otro sin verificar la composición. Esta ruta es orientativa y no garantiza que el empaque sea aceptado o reciclado.",
    consulta:
      "Consulta el directorio de recicladores de Bucaramanga y pregunta si reciben empaques flexibles o multicapa.",
    enlace: "/recicladores",
  },

  "bolsa-arroz": {
    nombre: "Bolsa de arroz",
    categoria: "Empaques de alimentos secos",
    imagen: "/residuos/bolsa-arroz.png",
    alt: "Bolsa de arroz vacía",
    material: "Por verificar",
    codigo: "No determinado",
    descripcion:
      "Empaque utilizado para almacenar y comercializar arroz. Después de consumir el producto, la bolsa vacía se convierte en un residuo posconsumo.",
    identificacion: [
      {
        etiqueta: "Tipo",
        valor: "Bolsa flexible para arroz",
      },
      { etiqueta: "Material", valor: "Por verificar" },
      {
        etiqueta: "Composición posible",
        valor:
          "Polietileno, polipropileno o materiales multicapa.",
      },
      {
        etiqueta: "Código de identificación",
        valor: "No determinado",
      },
      {
        etiqueta: "Origen",
        valor: "Empaque plástico posconsumo",
      },
      {
        etiqueta: "Uso",
        valor: "Almacenamiento y comercialización de arroz",
      },
    ],
    caracterizacion: [
      {
        etiqueta: "Tipo",
        valor: "Bolsa flexible para alimentos secos",
      },
      { etiqueta: "Material", valor: "Por verificar" },
      {
        etiqueta: "Composición posible",
        valor:
          "Polietileno, polipropileno o materiales multicapa.",
      },
      {
        etiqueta: "Densidad",
        valor: "No determinada sin identificar el polímero.",
      },
      {
        etiqueta: "Temperatura de fusión",
        valor: "Depende de la composición del empaque.",
      },
      {
        etiqueta: "Código de reciclaje",
        valor: "No determinado.",
      },
      {
        etiqueta: "Reciclabilidad",
        valor:
          "Depende del material y de los sistemas de aprovechamiento disponibles.",
      },
      {
        etiqueta: "Aprovechamiento",
        valor:
          "Puede destinarse a procesos compatibles si se identifica y acepta el material.",
      },
    ],
    preparacion: [
      "Retira los restos de arroz.",
      "Conserva la bolsa limpia y seca.",
      "Revisa si tiene información sobre su composición.",
      "Confirma si el reciclador recibe este tipo de empaque.",
    ],
    ruta: [
      "Consumidor: vacía y conserva seca la bolsa.",
      "Clasificación: se identifica el tipo de plástico.",
      "Centro de acopio: se verifica si recibe este material.",
      "Transformación: el material aceptado puede procesarse para nuevos usos.",
      "Nuevo producto: depende del polímero y de la tecnología disponible.",
    ],
    nota:
      "Las propiedades técnicas deben confirmarse mediante la identificación del material. Esta ruta es orientativa y no garantiza el aprovechamiento de todas las bolsas.",
    consulta:
      "Consulta el directorio de recicladores de Bucaramanga y confirma si reciben bolsas plásticas de arroz.",
    enlace: "/recicladores",
  },

  "empaque-pasta": {
    nombre: "Empaque de pasta",
    categoria: "Empaques de alimentos secos",
    imagen: "/residuos/empaque-pasta.png",
    alt: "Empaque de pasta vacío",
    material: "Por verificar",
    codigo: "No determinado",
    descripcion:
      "Empaque utilizado para proteger y conservar pasta alimenticia. Su composición puede variar dependiendo del fabricante y del tipo de presentación.",
    identificacion: [
      {
        etiqueta: "Tipo",
        valor: "Empaque flexible para alimentos secos",
      },
      { etiqueta: "Material", valor: "Por verificar" },
      {
        etiqueta: "Composición posible",
        valor:
          "Polipropileno, polietileno o estructuras multicapa.",
      },
      {
        etiqueta: "Código de identificación",
        valor: "No determinado",
      },
      {
        etiqueta: "Origen",
        valor: "Empaque plástico posconsumo",
      },
      {
        etiqueta: "Uso",
        valor: "Protección y conservación de pasta alimenticia",
      },
    ],
    caracterizacion: [
      {
        etiqueta: "Tipo",
        valor: "Empaque flexible para alimentos secos",
      },
      { etiqueta: "Material", valor: "Por verificar" },
      {
        etiqueta: "Composición posible",
        valor:
          "Polipropileno, polietileno o estructuras multicapa.",
      },
      {
        etiqueta: "Densidad",
        valor: "No determinada sin identificar el polímero.",
      },
      {
        etiqueta: "Temperatura de fusión",
        valor: "Depende de la composición.",
      },
      {
        etiqueta: "Código de reciclaje",
        valor: "No determinado.",
      },
      {
        etiqueta: "Reciclabilidad",
        valor:
          "Depende del material y de los procesos disponibles.",
      },
      {
        etiqueta: "Aprovechamiento",
        valor:
          "Posible mediante procesos compatibles, si un gestor acepta el material.",
      },
    ],
    preparacion: [
      "Retira los restos de pasta.",
      "Mantén el empaque limpio y seco.",
      "Revisa la información del fabricante.",
      "Consulta si el gestor recibe este tipo de empaque.",
    ],
    ruta: [
      "Consumidor: vacía y conserva seco el empaque.",
      "Clasificación: se identifica el material.",
      "Centro de acopio: se confirma su recepción.",
      "Transformación: el material aceptado puede procesarse.",
      "Nuevo producto: depende del proceso de aprovechamiento.",
    ],
    nota:
      "La composición y las propiedades técnicas deben confirmarse con el fabricante o mediante una caracterización. Esta ruta no garantiza que todos los empaques de pasta sean reciclables.",
    consulta:
      "Consulta el directorio de recicladores de Bucaramanga y confirma si reciben empaques plásticos de pasta.",
    enlace: "/recicladores",
  },

  "envase-yogur": {
    nombre: "Envase de yogur",
    categoria: "Envases de productos lácteos",
    imagen: "/residuos/envase-yogur.png",
    alt: "Envase plástico de yogur",
    material: "Por verificar",
    codigo: "No determinado",
    descripcion:
      "Envase utilizado para almacenar y comercializar yogur. Su composición depende del fabricante y del tipo de recipiente.",
    identificacion: [
      {
        etiqueta: "Tipo",
        valor: "Envase plástico para productos lácteos",
      },
      { etiqueta: "Material", valor: "Por verificar" },
      {
        etiqueta: "Composición posible",
        valor:
          "Polipropileno (PP), poliestireno (PS) u otros polímeros.",
      },
      {
        etiqueta: "Código de identificación",
        valor: "No determinado",
      },
      {
        etiqueta: "Origen",
        valor: "Envase plástico posconsumo",
      },
      {
        etiqueta: "Uso",
        valor: "Almacenamiento y comercialización de yogur",
      },
    ],
    caracterizacion: [
      {
        etiqueta: "Tipo",
        valor: "Envase plástico para productos lácteos",
      },
      { etiqueta: "Material", valor: "Por verificar" },
      {
        etiqueta: "Composición posible",
        valor:
          "Polipropileno (PP), poliestireno (PS) u otros materiales.",
      },
      {
        etiqueta: "Densidad",
        valor: "Depende del polímero identificado.",
      },
      {
        etiqueta: "Temperatura de fusión",
        valor: "No determinada sin conocer el material.",
      },
      {
        etiqueta: "Código de reciclaje",
        valor: "No determinado.",
      },
      {
        etiqueta: "Reciclabilidad",
        valor:
          "Depende del material y de su aceptación por los gestores.",
      },
      {
        etiqueta: "Aprovechamiento",
        valor:
          "Puede transformarse en nuevos productos mediante procesos compatibles.",
      },
    ],
    preparacion: [
      "Vacía el contenido del envase.",
      "Retira los restos de yogur.",
      "Déjalo limpio y seco.",
      "Revisa el código del material y consulta su aceptación.",
    ],
    ruta: [
      "Consumidor: vacía y limpia el envase.",
      "Clasificación: se identifica el tipo de plástico.",
      "Centro de acopio: se verifica si recibe ese material.",
      "Transformación: el plástico aceptado puede procesarse.",
      "Nuevo producto: depende del polímero y del proceso utilizado.",
    ],
    nota:
      "Las propiedades técnicas deben confirmarse después de identificar el polímero. No todos los envases de yogur son aceptados por los mismos recicladores.",
    consulta:
      "Consulta el directorio de recicladores de Bucaramanga y confirma si reciben envases de yogur del material identificado.",
    enlace: "/recicladores",
  },
};

export default async function FichaResiduo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const residuo = residuos[id];

  if (!residuo) {
    notFound();
  }

  return (
    <main className="ficha-page">
      <Link href="/residuos" className="ficha-volver">
        ← Volver al catálogo
      </Link>

      <header className="ficha-encabezado">
        <span className="ficha-etiqueta">
          {residuo.categoria.toUpperCase()}
        </span>

        <h1 className="ficha-titulo">{residuo.nombre}</h1>

        <p className="ficha-descripcion">
          {residuo.descripcion}
        </p>
      </header>

      <section className="ficha-presentacion">
        <div className="ficha-fotografia">
          <img src={residuo.imagen} alt={residuo.alt} />
        </div>

        <div className="ficha-resumen">
          <h2>Información general</h2>

          <div className="ficha-dato">
            <span>Material</span>
            <strong>{residuo.material}</strong>
          </div>

          <div className="ficha-dato">
            <span>Código de identificación</span>
            <strong>{residuo.codigo}</strong>
          </div>

          <div className="ficha-dato">
            <span>Categoría</span>
            <strong>{residuo.categoria}</strong>
          </div>
        </div>
      </section>

      <section className="ficha-seccion">
        <h2 className="ficha-seccion-titulo">
          01. Identificación del material
        </h2>

        <div className="ficha-panel">
          {residuo.identificacion.map((dato) => (
            <p key={dato.etiqueta}>
              <strong>{dato.etiqueta}:</strong> {dato.valor}
            </p>
          ))}

          <div className="ficha-nota">
            La composición puede variar según el fabricante.
            Cuando el material no está confirmado, se presenta
            como "Por verificar". Consulta el código del envase
            o la información del fabricante.
          </div>
        </div>
      </section>

      <section className="ficha-seccion">
        <h2 className="ficha-seccion-titulo">
          02. Caracterización técnica
        </h2>

        <div className="ficha-panel">
          {residuo.caracterizacion.map((dato) => (
            <p key={dato.etiqueta}>
              <strong>{dato.etiqueta}:</strong> {dato.valor}
            </p>
          ))}

          <div className="ficha-nota">
            {residuo.nota}
          </div>
        </div>
      </section>

      <section className="ficha-seccion">
        <h2 className="ficha-seccion-titulo">
          03. ¿Cómo preparar este residuo?
        </h2>

        <div className="ficha-pasos">
          {residuo.preparacion.map((paso, index) => (
            <div className="ficha-paso" key={paso}>
              <span className="ficha-paso-numero">
                {index + 1}
              </span>

              <p>{paso}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ficha-seccion">
        <h2 className="ficha-seccion-titulo">
          04. Ruta de circularidad
        </h2>

        <div className="ficha-panel">
          <p>
            Este es el recorrido general que puede seguir
            el residuo después de su consumo:
          </p>

          <div className="ficha-ruta">
            {residuo.ruta.map((paso, index) => (
              <div className="ficha-ruta-paso" key={paso}>
                <span className="ficha-ruta-numero">
                  {index + 1}
                </span>

                <p>{paso}</p>
              </div>
            ))}
          </div>

          <div className="ficha-nota">
            La ruta es orientativa. El aprovechamiento real
            depende de la composición del residuo, los gestores
            disponibles y sus condiciones de recepción.
          </div>
        </div>
      </section>

      <section className="ficha-seccion">
        <div className="ficha-destino">
          <h2 className="ficha-seccion-titulo">
            05. ¿Dónde entregar este residuo?
          </h2>

          <p>{residuo.consulta}</p>

          <Link href={residuo.enlace} className="link">
            Consultar directorio de recicladores →
          </Link>
        </div>
      </section>
    </main>
  );
}
