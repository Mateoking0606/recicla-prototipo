import Link from "next/link";
import { plasticos } from "@/data/plasticos";

export default function Home() {
  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <Link href="/" className="logo">Re<span>Cicla</span></Link>
          <nav className="nav-links">
            <a href="#plasticos">Plásticos</a>
            <a href="#funciones">Funciones</a>
            <a href="#recicladores">Recicladores</a>
            <a href="#chatbot">Chatbot</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="badge">PLATAFORMA DE PLÁSTICOS POSTCONSUMO</span>
              <h1>Dale un destino,<br/>no lo deseches.</h1>
              <p>ReCicla busca ayudar a empresas a consultar, identificar y gestionar información sobre plásticos postconsumo y encontrar empresas recicladoras compatibles en Bucaramanga.</p>
              <div className="actions">
                <a className="btn btn-primary" href="#plasticos">Explorar plásticos</a>
                <a className="btn btn-secondary" href="#recicladores">Buscar reciclador</a>
              </div>
            </div>
            <div className="hero-card">
              <div className="symbol">♻️</div>
              <h3>Información + conexión</h3>
              <p className="muted">Este es un prototipo inicial. Los datos de recicladores y el chatbot Groq se integrarán en las siguientes etapas.</p>
            </div>
          </div>
        </section>

        <section id="plasticos" className="section">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Conoce los plásticos</h2>
                <p className="muted">Catálogo inicial basado en los códigos de resina que estamos estructurando para el dataset ReCicla.</p>
              </div>
            </div>
            <div className="grid">
              {plasticos.map((p) => (
                <Link href={`/plastico/${p.slug}`} className="card" key={p.slug}>
                  <div className="card-img">♻️</div>
                  <span className="code">CÓDIGO {p.codigo}</span>
                  <h3>{p.sigla}</h3>
                  <p>{p.nombre}</p>
                  <span className="link">Ver información →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="funciones" className="section">
          <div className="container">
            <div className="section-head"><div><h2>¿Qué hará ReCicla?</h2><p className="muted">Estas serán las funciones principales del producto final.</p></div></div>
            <div className="feature-grid">
              <div className="feature"><h3>01 · Consultar</h3><p>Consultar características, productos comunes, propiedades, manejo y aprovechamiento de los plásticos.</p></div>
              <div className="feature"><h3>02 · Identificar</h3><p>Orientar la identificación mediante información estructurada y código de resina.</p></div>
              <div className="feature"><h3>03 · Conectar</h3><p>Encontrar recicladores compatibles según el material y su ubicación.</p></div>
            </div>
          </div>
        </section>

        <section id="recicladores" className="section">
          <div className="container">
            <div className="cta">
              <div><h2>Recicladores de Bucaramanga</h2><p>Próximamente conectaremos este módulo con el dataset de empresas recicladoras que construiremos después del catálogo de plásticos.</p></div>
              <span className="btn btn-secondary">Módulo en construcción</span>
            </div>
          </div>
        </section>

        <section id="chatbot" className="section">
          <div className="container">
            <div className="info">
              <h2>🤖 Chatbot ReCicla</h2>
              <p className="muted">En la siguiente etapa integraremos Groq para que el chatbot pueda orientar a las empresas usando la información estructurada de ReCicla.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container">ReCicla · Prototipo académico · “Dale un destino, no lo deseches”.</div></footer>
    </>
  );
}
