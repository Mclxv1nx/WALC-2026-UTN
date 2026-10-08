import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Closing } from '@/components/Closing';
import { Arrow, ArrowOut } from '@/components/Icons';
import { MyTrackButton } from '@/components/MyTrack';
import { event, getTrack, tracks } from '@/lib/data';
import { asset } from '@/lib/site';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return tracks.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTrack(slug);
  if (!t) return {};
  return {
    title: `Track ${t.n} · ${t.title}`,
    description: `${t.lead} ${t.modality}, ${t.hours} horas, ${t.seats} cupos. ${event.dates}, ${event.city}, ${event.country}.`,
  };
}

export default async function TrackPage({ params }: Props) {
  const { slug } = await params;
  const t = getTrack(slug);
  if (!t) notFound();

  const idx = tracks.indexOf(t);
  const prev = tracks[(idx - 1 + tracks.length) % tracks.length];
  const next = tracks[(idx + 1) % tracks.length];
  const accent = { '--accent': t.color } as React.CSSProperties;

  let k = 0;
  const no = () => `(${String(++k).padStart(2, '0')})`;

  return (
    <div style={accent}>
      {/* ------------------------------------------------------------ HERO */}
      <section className="t-hero on-ink" aria-labelledby="track-t">
        <div className="wrap">
          <nav className="crumbs label" aria-label="Ruta">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#tracks">Tracks</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Track 0{t.n}</span>
          </nav>

          <div className="t-hero__grid">
            <div className="t-hero__main">
              <p className="t-hero__k">
                <span className="big">Track 0{t.n}</span>
                <span className={`chip ${t.modality === 'Online' ? 'chip--dot' : ''}`}>{t.modality}</span>
                <span className="label muted">{event.datesShort}</span>
              </p>
              <h1
                id="track-t"
                className="mega t-hero__t"
                aria-label={t.title}
                style={{ '--n': Math.max(...t.lines.map((l) => l.length)) } as React.CSSProperties}
              >
                {t.lines.map((l, n) => (
                  <span key={l} className="line" aria-hidden="true">
                    <span style={i(n)}>{l}</span>
                  </span>
                ))}
              </h1>
              <p className="t-hero__lead">{t.lead}</p>
              <div className="t-hero__ctas">
                <a className="btn btn--lg" href={event.links.preinscripcion} {...ext}>
                  Pre-inscribirme en este track
                  <ArrowOut />
                </a>
                <MyTrackButton slug={t.slug} />
              </div>
            </div>

            <figure className="t-hero__poster">
              <img
                src={asset(t.poster)}
                alt={`Afiche oficial del Track ${t.n}, ${t.title}`}
                width={900}
                height={1600}
                fetchPriority="high"
              />
              <figcaption className="label">Afiche oficial</figcaption>
            </figure>
          </div>

          <dl className="factbar factbar--5">
            <div>
              <dt className="label">Modalidad</dt>
              <dd>{t.modality}</dd>
            </div>
            <div>
              <dt className="label">Duración</dt>
              <dd>{t.hours} horas</dd>
            </div>
            <div>
              <dt className="label">Cupo</dt>
              <dd>{t.seats} personas</dd>
            </div>
            <div>
              <dt className="label">Coordina</dt>
              <dd>{t.coordinator}</dd>
            </div>
            <div>
              <dt className="label">Sede</dt>
              <dd>{t.modality === 'Online' ? 'En línea' : 'UTN Ibarra'}</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* -------------------------------------------------------- RESUMEN */}
      <section className="section on-paper">
        <div className="wrap">
          <div className="split">
            <h2 className="split__k label">
              <span>{no()}</span> De qué se trata
            </h2>
            <div className="split__b">
              <p className="lead" data-reveal>
                {t.summary[0]}
              </p>
              {t.summary.slice(1).map((p) => (
                <p key={p} className="prose" data-reveal>
                  {p}
                </p>
              ))}
              <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem', marginTop: '2rem' }} aria-label="Temas">
                {t.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {t.learn && (
            <div className="split">
              <h2 className="split__k label">
                <span>{no()}</span> Lo que aprenderás
              </h2>
              <ol className="split__b nlist" data-reveal>
                {t.learn.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </div>
          )}

          {t.audience && (
            <div className="split">
              <h2 className="split__k label">
                <span>{no()}</span> A quién va dirigido
              </h2>
              <ul className="split__b plain" data-reveal>
                {t.audience.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="split">
            <h2 className="split__k label">
              <span>{no()}</span> Requisitos
            </h2>
            <ul className="split__b plain" data-reveal>
              {t.requirements.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- PROGRAMA */}
      {(t.days || t.modules) && (
        <section className="section on-ink" aria-labelledby="prog-t">
          <div className="wrap">
            <header className="sec-head">
              <p className="label">
                <span>{no()}</span> Programa tentativo
              </p>
              <h2 id="prog-t" className="display" data-reveal="line">
                {t.days ? (
                  <>
                    Cinco días, <em>un proyecto.</em>
                  </>
                ) : (
                  <>
                    Cinco módulos, <em>casos reales.</em>
                  </>
                )}
              </h2>
              <p className="sec-note" data-reveal>
                {t.days
                  ? 'Cada jornada combina teoría breve, laboratorio y trabajo en grupo.'
                  : 'Sesiones magistrales, laboratorios y aprendizaje basado en problemas.'}
              </p>
            </header>

            <ol className="days">
              {t.days?.map((d, n) => (
                <li key={d.day} className="day" data-reveal style={i(n)}>
                  <p className="day__d label">
                    <span>{d.day}</span>
                    <span>0{n + 1}/05</span>
                  </p>
                  <h3>{d.title}</h3>
                  <h4 className="label">Teoría</h4>
                  <ul>
                    {d.theory.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <h4 className="label">Laboratorio</h4>
                  <ul className="lab">
                    {d.lab.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </li>
              ))}
              {t.modules?.map((m, n) => (
                <li key={m.title} className="day" data-reveal style={i(n)}>
                  <p className="day__d label">
                    <span>Módulo</span>
                    <span>0{n + 1}/0{t.modules!.length}</span>
                  </p>
                  <h3>{m.title}</h3>
                  <h4 className="label">Contenido</h4>
                  <ul className="lab">
                    {m.items.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ---------------------------------------------- EXTRAS Y EQUIPO */}
      <section className="section on-paper">
        <div className="wrap">
          {t.extras && (
            <div className="split">
              <h2 className="split__k label">
                <span>{no()}</span> Cómo se trabaja
              </h2>
              <div className="split__b cards">
                {t.extras.map((e, n) => (
                  <article key={e.title} className="card" data-reveal style={i(n)}>
                    <h3>{e.title}</h3>
                    {e.body && <p>{e.body}</p>}
                    {e.items && (
                      <ul>
                        {e.items.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    )}
                    {e.link && (
                      <a className="arrow-link" href={e.link.href} {...ext}>
                        {e.link.label}
                        <ArrowOut />
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          )}

          {t.outcomes && (
            <div className="split">
              <h2 className="split__k label">
                <span>{no()}</span> Al terminar podrás
              </h2>
              <ol className="split__b nlist" data-reveal>
                {t.outcomes.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </div>
          )}

          <div className="split">
            <h2 className="split__k label">
              <span>{no()}</span> Equipo docente
            </h2>
            <ul className="split__b people">
              {t.instructors.map((p, n) => (
                <li key={p.name} className="person" data-reveal style={i(n)}>
                  <span className="person__n">
                    {p.name}
                    {p.name === t.coordinator && <span className="chip">Coordinador</span>}
                    {p.note && <span className="chip">{p.note}</span>}
                  </span>
                  <span className="person__o">{p.org}</span>
                  <span className="person__p label">{p.place}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="prose" style={{ marginTop: '3rem', fontSize: 'var(--t-small)' }}>
            Programa tentativo, sujeto a ajustes.{' '}
            <a className="link" href={t.official} {...ext}>
              Consulta la ficha oficial del track ↗
            </a>
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------- PAGINADO */}
      <nav className="pager on-ink" aria-label="Otros tracks">
        <Link href={`/tracks/${prev.slug}/`} style={{ '--c': prev.color } as React.CSSProperties}>
          <span className="label">← Track 0{prev.n}</span>
          <strong>{prev.title}</strong>
        </Link>
        <Link href={`/tracks/${next.slug}/`} style={{ '--c': next.color } as React.CSSProperties}>
          <span className="label">Track 0{next.n} →</span>
          <strong>{next.title}</strong>
        </Link>
      </nav>

      <Closing line="Tu cupo" />
    </div>
  );
}
