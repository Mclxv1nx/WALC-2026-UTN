import Link from 'next/link';
import { Closing } from '@/components/Closing';
import { Countdown } from '@/components/Countdown';
import { FeePicker } from '@/components/FeePicker';
import { Arrow, ArrowOut, Check } from '@/components/Icons';
import { MyTrackBadge } from '@/components/MyTrack';
import { Logo, Photo } from '@/components/Photo';
import {
  event,
  faqs,
  feeExcludes,
  feeIncludes,
  organizers,
  purposes,
  sponsors,
  stats,
  steps,
  tracks,
  venue,
} from '@/lib/data';
import { asset } from '@/lib/site';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ HERO */}
      <section className="hero on-ink" aria-labelledby="hero-t">
        <div className="wrap">
          <p className="hero__meta label">
            <span>{event.edition}</span>
            <span>{event.longName}</span>
            <span>0°21′N 78°07′O</span>
          </p>

          <h1 id="hero-t" className="mega hero__title">
            <span className="line">
              <span style={i(0)}>WALC</span>
            </span>
            <span className="line">
              <span className="yr" style={i(1)}>
                2026
              </span>
            </span>
            <span className="sr-only"> — {event.longName}</span>
          </h1>

          <div className="hero__body">
            <p className="hero__tag">{event.tagline}.</p>

            <figure className="hero__photo">
              <Photo
                src={venue.heroPhoto}
                fallback="/img/yahuarcocha.jpg"
                alt="Vista aérea de la laguna de Yahuarcocha y la ciudad de Ibarra, con el volcán Imbabura al fondo"
                ratio="wide"
                eager
              />
              <figcaption className="label">
                <span>Laguna de Yahuarcocha</span>
                <span>Ibarra, EC</span>
              </figcaption>
            </figure>

            <div className="hero__side">
              <p>
                Cinco talleres intensivos y simultáneos. Cuarenta horas de teoría breve, laboratorio real y proyecto en
                equipo.
              </p>
              <div className="hero__ctas">
                <a className="btn btn--lg" href={event.links.preinscripcion} {...ext}>
                  Pre-inscribirme
                  <ArrowOut />
                </a>
                <Link className="btn btn--ghost" href="/#tracks">
                  Explorar los 5 tracks
                  <Arrow />
                </Link>
              </div>
            </div>
          </div>

          <dl className="factbar">
            <div>
              <dt className="label">Comienza en</dt>
              <dd>
                <Countdown />
              </dd>
            </div>
            <div>
              <dt className="label">Fecha</dt>
              <dd>
                16—20 Nov<small>Lunes a viernes, 2026</small>
              </dd>
            </div>
            <div>
              <dt className="label">Sede</dt>
              <dd>
                UTN Ibarra<small>{event.faculty}</small>
              </dd>
            </div>
            <div>
              <dt className="label">Matrícula</dt>
              <dd>
                Desde US$ 70<small>General US$ 200 · ver tarifas</small>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------ MANIFIESTO */}
      <section className="section on-paper" aria-labelledby="about-t">
        <div className="wrap">
          <div className="manifesto">
            <p className="label">
              <b>(01)</b> El taller
            </p>
            <h2 id="about-t" className="display" data-reveal="line">
              Treinta y cuatro años <em>enseñando con las manos</em> en el teclado.
            </h2>
            <div className="prose" data-reveal>
              <p>
                Desde 1992, el WALC forma a técnicos y profesionales de América Latina y el Caribe con un enfoque
                netamente práctico. Esta edición reúne cuatro talleres presenciales y uno en línea, todos al mismo
                tiempo, en la Universidad Técnica del Norte.
              </p>
              <p>
                Programación Agéntica para IA, AI Engineering, Ciberseguridad, IoT Machine Learning y Data Science: una
                oferta renovada para lo que la región necesita ahora.
              </p>
            </div>
          </div>

          <ol className="purposes">
            {purposes.map((p, n) => (
              <li key={p.title} data-reveal style={i(n)}>
                <span className="label">0{n + 1}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------------------------------------------------- TRACKS */}
      <section id="tracks" className="section on-ink" aria-labelledby="tracks-t">
        <div className="wrap">
          <header className="sec-head">
            <p className="label">
              <span>(02)</span> Tracks
            </p>
            <h2 id="tracks-t" className="display" data-reveal="line">
              Cinco tracks. <em>Eliges uno.</em>
            </h2>
            <p className="sec-note" data-reveal>
              Se dictan en simultáneo, de lunes a viernes. 40 horas y 30 cupos cada uno.
            </p>
          </header>

          <ul className="tracks">
            {tracks.map((t) => (
              <li key={t.slug} data-reveal>
                <Link
                  href={`/tracks/${t.slug}/`}
                  className="trow"
                  style={{ '--c': t.color } as React.CSSProperties}
                  aria-label={`Track ${t.n}: ${t.title}. ${t.modality}. Ver programa`}
                >
                  <span className="trow__n label">T/0{t.n}</span>
                  <span className="trow__t">{t.title}</span>
                  <span className="trow__i">
                    <span className="trow__m">
                      <span className={`chip ${t.modality === 'Online' ? 'chip--dot' : ''}`}>{t.modality}</span>
                      <span className="label">Coord. {t.coordinator}</span>
                      <MyTrackBadge slug={t.slug} />
                    </span>
                    <span className="trow__d">{t.lead}</span>
                  </span>
                  <Arrow className="trow__go" />
                  <img className="trow__p" src={asset(t.poster)} alt="" width={900} height={1600} loading="lazy" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- CIFRAS */}
      <section className="section on-paper" aria-labelledby="stats-t">
        <div className="wrap">
          <header className="sec-head sec-head--offset">
            <p className="label">
              <span>(03)</span> WALC en cifras
            </p>
            <h2 id="stats-t" className="display" data-reveal="line">
              Pequeño por diseño, <em>grande por trayectoria.</em>
            </h2>
          </header>

          <ul className="stats">
            {stats.map((s, n) => (
              <li key={s.label} className="stat" data-reveal style={i(n % 3)}>
                <span className="stat__n">
                  {s.value}
                  {s.unit && <sup>{s.unit}</sup>}
                </span>
                <span className="stat__l">{s.label}</span>
                <span className="stat__s label">{s.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- MATRÍCULA */}
      <section id="matricula" className="section on-paper" style={{ paddingTop: 0 }} aria-labelledby="fees-t">
        <div className="wrap">
          <header className="sec-head">
            <p className="label">
              <span>(04)</span> Matrícula
            </p>
            <h2 id="fees-t" className="display" data-reveal="line">
              Tres tarifas. <em>¿Cuál es la tuya?</em>
            </h2>
            <p className="sec-note" data-reveal>
              En dólares estadounidenses, por persona. Un solo pago cubre el track completo.
            </p>
          </header>

          <FeePicker />

          <div className="includes">
            <div className="includes__a" data-reveal>
              <h3 className="label" style={{ marginBottom: '1rem', color: 'var(--fg-2)' }}>
                Tu matrícula incluye
              </h3>
              <ul className="checks">
                {feeIncludes.map((x) => (
                  <li key={x}>
                    <Check />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="includes__b" data-reveal style={i(1)}>
              <p className="note">
                <span className="label">Ten en cuenta</span>
                {feeExcludes} Existe un número muy limitado de becas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- PASOS */}
      <section className="section on-ink" aria-labelledby="steps-t">
        <div className="wrap">
          <header className="sec-head">
            <p className="label">
              <span>(05)</span> Cómo participar
            </p>
            <h2 id="steps-t" className="display" data-reveal="line">
              Tu cupo, <em>en tres pasos.</em>
            </h2>
          </header>

          <ol className="steps">
            {steps.map((s, n) => (
              <li key={s.title} className="step" data-reveal style={i(n)}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                {'external' in s.cta && s.cta.external ? (
                  <a className="arrow-link" href={s.cta.href} {...ext}>
                    {s.cta.label}
                    <ArrowOut />
                  </a>
                ) : (
                  <Link className="arrow-link" href={s.cta.href}>
                    {s.cta.label}
                    <Arrow />
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------ SEDE */}
      <section className="section on-paper" aria-labelledby="place-t">
        <div className="wrap">
          <div className="place">
            <Link href="/sede/" className="place__media" aria-label="Conoce Ibarra, sede de WALC 2026" data-reveal>
              <Photo
                src={venue.sites[1].photo}
                fallback="/img/yahuarcocha.jpg"
                alt="Laguna de Yahuarcocha rodeada de montañas"
                ratio="wide"
              />
            </Link>
            <div className="place__text">
              <p className="label" style={{ color: 'var(--fg-2)' }}>
                <span style={{ color: 'var(--mark)' }}>(06)</span>&ensp;Sede 2026
              </p>
              <h2 id="place-t" className="title" style={{ marginTop: '1.25rem' }} data-reveal="line">
                Ibarra, <em>la Ciudad Blanca.</em>
              </h2>
              <div className="prose" data-reveal>
                <p>{venue.ibarra[0]}</p>
                <p>
                  Te recibe la {event.faculty} de la {event.venue}, a minutos de la laguna de Yahuarcocha y del volcán
                  Imbabura.
                </p>
              </div>
              <Link className="arrow-link" href="/sede/">
                Conocer la sede
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- ORGANIZACIÓN */}
      <section id="organizacion" className="section on-paper" style={{ paddingTop: 0 }} aria-labelledby="org-t">
        <div className="wrap">
          <header className="sec-head">
            <p className="label">
              <span>(07)</span> Organización
            </p>
            <h2 id="org-t" className="title" data-reveal="line">
              Quiénes lo hacen <em>posible.</em>
            </h2>
          </header>

          <div className="orgs" data-reveal>
            {organizers.map((o) => (
              <a key={o.name} className="org" href={o.href} {...ext}>
                <Logo src={o.logo} name={o.name} />
                <span>
                  <span className="org__n">{o.full}</span>
                  <span className="org__r label">{o.role}</span>
                </span>
                <ArrowOut />
              </a>
            ))}
            {sponsors.map((s) =>
              s.href ? (
                <a key={s.name} className="org" href={s.href} {...ext}>
                  <span className="org__logo" aria-hidden="true">
                    {s.name.slice(0, 2)}
                  </span>
                  <span>
                    <span className="org__n">{s.name}</span>
                    <span className="org__r label">{s.role}</span>
                  </span>
                  <ArrowOut />
                </a>
              ) : (
                <div key={s.name} className="org">
                  <span className="org__logo" aria-hidden="true">
                    {s.name.slice(0, 2)}
                  </span>
                  <span>
                    <span className="org__n">{s.name}</span>
                    <span className="org__r label">{s.role}</span>
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ */}
      <section className="section on-ink" aria-labelledby="faq-t">
        <div className="wrap faq-grid">
          <div className="faq-grid__h">
            <p className="label" style={{ color: 'var(--fg-2)' }}>
              <span style={{ color: 'var(--accent)' }}>(08)</span>&ensp;Preguntas frecuentes
            </p>
            <h2 id="faq-t" className="title" style={{ marginTop: '1.25rem' }} data-reveal="line">
              Antes de <em>inscribirte.</em>
            </h2>
            <p className="prose" style={{ marginTop: '1.5rem' }}>
              ¿Otra duda? Escríbenos a{' '}
              <a className="link" href={`mailto:${event.email}`}>
                {event.email}
              </a>
              .
            </p>
          </div>

          <div className="faq" data-reveal>
            {faqs.map((f, n) => (
              <details key={f.q} name="faq" open={n === 0}>
                <summary>
                  {f.q}
                  <i aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- CIERRE */}
      <Closing />
    </>
  );
}
