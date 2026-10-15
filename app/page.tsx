
import Link from "next/link";
import { plasticos } from "@/data/plasticos";

export default function Home() {
  return (
    <>
      

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="badge">
                PLATAFORMA DE PLÁSTICOS POSTCONSUMO
              </span>

              <h1>
  <span className="hero-brand">
    <span className="hero-brand-white">Re</span>
    <span className="hero-brand-lime">
  Cicla<span className="brand-leaves" aria-hidden="true"><i></i><i></i></span>
</span>
  </span>

  <span className="hero-slogan">
    Dale un destino,
    <br />
    <span>no lo deseches.</span>
  </span>
</h1>
              
              <div className="actions">
                <Link className="btn btn-primary" href="/identificar">
                  Identificar un plástico
                </Link>

                <Link className="btn btn-secondary" href="/recicladores">
                  Buscar recicladores
                </Link>
              </div>
            </div>

            <div className="hero-visual">
  <img
    src="/recicla-hero.png"
    alt="Símbolo de reciclaje rodeado de botellas, vasos y empaques plásticos"
    className="hero-image"
  />
</div>
             
          </div>
        </section>
        <section className="section" id="explorar">
  <div className="container">
    <div className="section-head">
      <div>
        <span className="badge">EXPLORA RECICLA</span>
        <h2 style={{ marginTop: "15px" }}>
          Descubre qué hacer con tus residuos
        </h2>
        <p className="muted">
          Aprende a identificar y separar envases y empaques
          plásticos postconsumo de alimentos y bebidas.
        </p>
      </div>
    </div>

    <div className="recicla-grid">
      <article className="recicla-card">
        <img
          src="/residuos/botella-agua.png"
          alt="Botella plástica de agua"
        />
        <div className="recicla-card-content">
          <h3>♻️ Tipos de plástico</h3>
          <p>
            Conoce los siete códigos de identificación
            de los plásticos y sus características.
          </p>
          <Link href="/plastico" className="btn btn-primary">
            Explorar plásticos →
          </Link>
        </div>
      </article>

      <article className="recicla-card">
        <img
          src="/residuos/envase-yogur.png"
          alt="Envase plástico de yogur"
        />
        <div className="recicla-card-content">
          <h3>📦 Catálogo de residuos</h3>
          <p>
            Explora ejemplos de envases y empaques
            plásticos utilizados en alimentos y bebidas.
          </p>
          <Link href="/residuos" className="btn btn-primary">
            Ver catálogo →
          </Link>
        </div>
      </article>

      <article className="recicla-card">
        <img
          src="/residuos/empaque-papas-fritas.png"
          alt="Empaque plástico de papas fritas"
        />
        <div className="recicla-card-content">
          <h3>🔎 Identifica tu residuo</h3>
          <p>
            Aprende a reconocer el material de tus
            envases y cómo separarlos correctamente.
          </p>
          <Link href="/identificar" className="btn btn-primary">
            Identificar residuo →
          </Link>
        </div>
      </article>
    </div>
  </div>
</section>        
        <section id="recicladores" className="section">
          <div className="container">
            <div className="cta">
              <div>
                <h2>Recicladores de Bucaramanga</h2>
                <p>
                  Consulta nuestro directorio de organizaciones
                  recicladoras. La recepción de materiales
                  específicos debe verificarse con cada
                  organización.
                </p>
              </div>

              <Link
                href="/recicladores"
                className="btn btn-secondary"
              >
                Explorar directorio
              </Link>
            </div>
          </div>
        </section>

        <section id="chatbot" className="section">
  <div className="container">
    <div className="info">
      <span className="badge">INTELIGENCIA ARTIFICIAL</span>

      <h2>🤖 Conoce a ReCicla IA</h2>

      <p className="muted">
        ¿No sabes cómo separar un envase plástico?
        Nuestro asistente inteligente te orienta
        sobre los tipos de plástico, sus características
        y las alternativas de aprovechamiento.
      </p>

      <div className="actions">
        <Link href="/chatbot" className="btn btn-primary">
          🤖 Hablar con ReCicla IA
        </Link>
      </div>
    </div>
  </div>
</section>
      </main>

      <aside className="social-floating" aria-label="Redes sociales">
        <span
          className="social-icon social-facebook"
          title="Facebook de ReCicla: próximamente"
          aria-label="Facebook: próximamente"
        >
          f
        </span>

        <span
          className="social-icon social-youtube"
          title="YouTube de ReCicla: próximamente"
          aria-label="YouTube: próximamente"
        >
          ▶
        </span>

        <span
          className="social-icon social-instagram"
          title="Instagram de ReCicla: próximamente"
          aria-label="Instagram: próximamente"
        >
          ◎
        </span>
      </aside>

      <footer className="footer">
        <div className="container">
          <p>
            © 2026 ReCicla · Dale un destino, no lo deseches.
          </p>
          <p>
            Plataforma académica de información sobre
            plásticos postconsumo en Bucaramanga.
          </p>
        </div>
      </footer>
    </>
  );
}
