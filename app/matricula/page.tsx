import type { Metadata } from 'next';
import Link from 'next/link';
import { Closing } from '@/components/Closing';
import { CopyButton } from '@/components/CopyButton';
import { FeePicker } from '@/components/FeePicker';
import { Arrow, ArrowOut, Check } from '@/components/Icons';
import { event, feeExcludes, feeIncludes, payment, steps } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Matrícula',
  description:
    'Tarifas de WALC 2026: US$ 200 general, US$ 100 becados de fuera de Ibarra y US$ 70 estudiantes UTN. Qué incluye, cómo pre-inscribirte y cómo pagar.',
};

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
const i = (n: number) => ({ '--i': n }) as React.CSSProperties;

export default function Matricula() {
  return (
    <>
      <section className="p-hero on-ink" aria-labelledby="mat-t">
        <div className="wrap">
          <nav className="crumbs label" aria-label="Ruta">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Matrícula</span>
          </nav>
          <h1 id="mat-t" className="mega p-hero__t">
            <span className="line">
              <span>Matrícula</span>
            </span>
          </h1>
          <div className="p-hero__row">
            <p className="serif">Un pago, un track completo, cuarenta horas de taller.</p>
            <p className="prose">
              Modalidad presencial y online · {event.dates} · {event.venue}, {event.city}, {event.country}.
            </p>
          </div>
        </div>
      </section>

      <section className="section on-paper" aria-labelledby="fees-t">
        <div className="wrap">
          <header className="sec-head">
            <p className="label">
              <span>(01)</span> Inversión
            </p>
            <h2 id="fees-t" className="display" data-reveal="line">
              Tres tarifas. <em>¿Cuál es la tuya?</em>
            </h2>
            <p className="sec-note" data-reveal>
              En dólares estadounidenses, por persona y por track.
            </p>
          </header>

          <FeePicker showMatriculaLink={false} />

          <div className="includes">
            <div className="includes__a" data-reveal>
              <h3 className="label" style={{ marginBottom: '1rem', color: 'var(--fg-2)' }}>
                Incluye
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
                <span className="label">No incluye</span>
                {feeExcludes}
              </p>
              <p className="note" style={{ marginTop: '1rem' }}>
                <span className="label">Becas</span>
                Existe un número muy limitado de becas para subvencionar media matrícula y, en casos excepcionales, la
                matrícula completa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-ink" aria-labelledby="steps-t">
        <div className="wrap">
          <header className="sec-head">
            <p className="label">
              <span>(02)</span> Proceso
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
                ) : s.cta.href === '/matricula/' ? (
                  <a className="arrow-link" href="#pago">
                    Ver datos de pago
                    <Arrow />
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

      <section id="pago" className="section on-paper" aria-labelledby="pay-t">
        <div className="wrap">
          <div className="split">
            <h2 id="pay-t" className="split__k label">
              <span>(03)</span> Datos de pago
            </h2>
            <div className="split__b">
              <p className="lead" data-reveal>
                Transferencia o depósito a la cuenta oficial del evento.
              </p>
              <dl className="pay" style={{ marginTop: '2rem' }} data-reveal>
                {payment.map((p) => (
                  <div key={p.k}>
                    <dt className="label">{p.k}</dt>
                    <dd>{p.v}</dd>
                    {p.copy ? <CopyButton value={p.v} label={p.k.toLowerCase()} /> : <span />}
                  </div>
                ))}
              </dl>
              <p className="note" style={{ marginTop: '2rem' }}>
                <span className="label">Antes de transferir</span>
                Pre-inscríbete primero y confirma el monto y los datos vigentes en la{' '}
                <a className="link" href={event.links.matricula} {...ext}>
                  página oficial de matrícula ↗
                </a>
                . Ante cualquier duda, escribe a{' '}
                <a className="link" href={`mailto:${event.email}`}>
                  {event.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Closing line="Tu cupo" />
    </>
  );
}
