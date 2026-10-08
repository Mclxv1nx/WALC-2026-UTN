import { event } from '@/lib/data';
import { asset } from '@/lib/site';
import { Arrow, ArrowOut } from './Icons';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

/** Bloque de cierre con el llamado a la acción principal. Se reutiliza en todas las páginas. */
export function Closing({ line = 'Nos vemos' }: { line?: string }) {
  return (
    <section className="section closing" aria-labelledby="closing-t">
      <div className="wrap">
        <h2 id="closing-t" className="mega closing__t" data-reveal="line">
          {line} <em>en Ibarra.</em>
        </h2>
        <div className="closing__row">
          <p>
            {event.dates}. Treinta cupos por track: la pre-inscripción toma unos minutos y recibes acuse de recibo en
            tres días.
          </p>
          <div className="closing__ctas">
            <a className="btn btn--ink btn--lg" href={event.links.preinscripcion} {...ext}>
              Pre-inscribirme ahora
              <ArrowOut />
            </a>
            <a className="btn btn--ghost" href={asset('/walc-2026.ics')} download>
              Agregar a mi calendario
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
