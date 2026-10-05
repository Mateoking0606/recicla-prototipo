import Link from "next/link";
import { notFound } from "next/navigation";
import { plasticos } from "@/data/plasticos";

export default async function PlasticoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = plasticos.find((item) => item.slug === slug);
  if (!p) notFound();

  return (
    <>
      <header className="nav"><div className="container nav-inner"><Link href="/" className="logo">Re<span>Cicla</span></Link><Link href="/#plasticos" className="link">← Volver al catálogo</Link></div></header>
      <main className="detail">
        <div className="container detail-grid">
          <div className="detail-image">♻️</div>
          <div className="info">
            <span className="code">CÓDIGO {p.codigo}</span>
            <h1 style={{fontSize:"clamp(2.3rem,5vw,4rem)", margin:"14px 0 6px"}}>{p.sigla}</h1>
            <p className="muted">{p.nombre}</p>
            <div className="info-row"><strong>¿Qué es?</strong><span className="muted">{p.descripcion}</span></div>
            <div className="info-row"><strong>Productos comunes</strong><span className="muted">{p.productos}</span></div>
            <div className="info-row"><strong>Características</strong><span className="muted">{p.caracteristicas}</span></div>
            <div className="info-row"><strong>Próximamente</strong><span className="muted">Recomendaciones de manejo, aprovechamiento y recicladores compatibles desde el dataset definitivo.</span></div>
            <div className="actions"><a className="btn btn-primary" href="/#recicladores">Buscar recicladores</a></div>
          </div>
        </div>
      </main>
    </>
  );
}
