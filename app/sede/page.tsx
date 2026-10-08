import type { Metadata } from 'next';
import Link from 'next/link';
import { Closing } from '@/components/Closing';
import { ArrowOut } from '@/components/Icons';
import { Photo } from '@/components/Photo';
import { event, venue } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sede · Ibarra, Ecuador',
  description:
    'WALC 2026 se realiza en la Universidad Técnica del Norte, Ibarra, Ecuador. Conoce la Ciudad Blanca: Yahuarcocha, el centro histórico y San Antonio de Ibarra.',
};

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

export default function Sede() {
  return (
    <>
      <section className="p-hero on-ink" aria-labelledby="sede-t">
        <div className="wrap">
          <nav className="crumbs label" aria-label="Ruta">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Sede</span>
          </nav>
          <h1 id="sede-t" className="mega p-hero__t">
            <span className="line">
              <span>Ibarra</span>
            </span>
          </h1>
          <div className="p-hero__row">
            <p className="serif">La Ciudad Blanca, entre una laguna y un volcán.</p>
            <p className="prose">
              {event.venue} · {event.faculty} · Provincia de Imbabura, {event.country} · 0°21′N 78°07′O
            </p>
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="wrap">
          <div className="split">
            <h2 className="split__k label">
              <span>(01)</span> La ciudad
            </h2>
            <div className="split__b">
              <p className="lead" data-reveal>
                {venue.ibarra[0]}
              </p>
              <p className="prose" data-reveal>
                {venue.ibarra[1]}
              </p>
            </div>
          </div>

          <div className="gallery">
            {venue.photos.map((p, n) => (
              <div key={p.src} data-reveal style={i(n)}>
                <Photo src={p.src} alt={p.alt} ratio={n === 0 ? 'land' : 'tall'} fallback={n === 0 ? '/img/yahuarcocha.jpg' : undefined} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-ink" aria-labelledby="sites-t">
        <div className="wrap">
          <header className="sec-head">
            <p className="label">
              <span>(02)</span> Qué visitar
            </p>
            <h2 id="sites-t" className="display" data-reveal="line">
              Después del laboratorio, <em>la provincia.</em>
            </h2>
          </header>

          <div className="sites">
            {venue.sites.map((s, n) => (
              <article key={s.name} className="site" data-reveal style={i(n)}>
                <Photo src={s.photo} alt={s.name} ratio="land" />
                <span className="label">{s.distance}</span>
                <h3>{s.name}</h3>
                <p>{s.body}</p>
                <ul>
                  {s.points.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section on-paper">
        <div className="wrap">
          <div className="split">
            <h2 className="split__k label">
              <span>(03)</span> Ecuador
            </h2>
            <div className="split__b">
              <p className="lead" data-reveal>
                {venue.ecuador[0]}
              </p>
              <p className="prose" data-reveal>
                {venue.ecuador[1]}
              </p>
            </div>
          </div>

          <div className="split">
            <h2 className="split__k label">
              <span>(04)</span> Planifica tu viaje
            </h2>
            <div className="split__b cards">
              <article className="card" data-reveal>
                <h3>Hoteles</h3>
                <p>Opciones de alojamiento recomendadas por la organización. La matrícula no incluye hospedaje.</p>
                <a className="arrow-link" href={event.links.hoteles} {...ext}>
                  Ver hoteles
                  <ArrowOut />
                </a>
              </article>
              <article className="card" data-reveal style={i(1)}>
                <h3>Ingreso a Ecuador</h3>
                <p>Requisitos migratorios para participantes que llegan desde otros países.</p>
                <a className="arrow-link" href={event.links.ingreso} {...ext}>
                  Ver requisitos
                  <ArrowOut />
                </a>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Closing />
    </>
  );
}
