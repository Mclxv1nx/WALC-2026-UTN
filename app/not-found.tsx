import Link from 'next/link';
import { Arrow } from '@/components/Icons';

export default function NotFound() {
  return (
    <section className="on-ink">
      <div className="wrap nf">
        <p className="label" style={{ color: 'var(--accent)' }}>
          Error 404
        </p>
        <h1 className="mega" style={{ fontSize: 'clamp(4rem, 16vw, 18rem)' }}>
          Sin señal
        </h1>
        <p className="lead" style={{ maxWidth: '28ch' }}>
          Esta página no existe o cambió de dirección. El taller sigue en pie.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
          <Link className="btn btn--lg" href="/">
            Volver al inicio
            <Arrow />
          </Link>
          <Link className="btn btn--ghost" href="/#tracks">
            Ver los tracks
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
