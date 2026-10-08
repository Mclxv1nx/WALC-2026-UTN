import Link from 'next/link';
import { event, tracks } from '@/lib/data';
import { asset } from '@/lib/site';
import { CopyButton } from './CopyButton';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

export function Footer() {
  return (
    <footer className="footer on-ink">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <p className="footer__brand">
              WALC<b>/26</b>
            </p>
            <p>
              {event.edition} del {event.longName}. {event.dates}, {event.venue}, {event.city}, {event.country}.
            </p>
          </div>

          <nav aria-label="Tracks">
            <h2 className="label">Tracks</h2>
            <ul>
              {tracks.map((t) => (
                <li key={t.slug}>
                  <Link href={`/tracks/${t.slug}/`}>
                    0{t.n} · {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Participar">
            <h2 className="label">Participar</h2>
            <ul>
              <li>
                <Link href="/matricula/">Matrícula y pago</Link>
              </li>
              <li>
                <a href={event.links.preinscripcion} {...ext}>
                  Pre-inscripción ↗
                </a>
              </li>
              <li>
                <Link href="/sede/">Ibarra, sede 2026</Link>
              </li>
              <li>
                <a href={event.links.hoteles} {...ext}>
                  Hoteles ↗
                </a>
              </li>
              <li>
                <a href={event.links.ingreso} {...ext}>
                  Requisitos de ingreso a Ecuador ↗
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="label">Contacto</h2>
            <ul>
              <li>
                <a href={`mailto:${event.email}`}>{event.email}</a>
              </li>
              <li>
                <CopyButton value={event.email} label="el correo de contacto">
                  Copiar correo
                </CopyButton>
              </li>
              <li>
                <a href={asset('/walc-2026.ics')} download>
                  Agregar a mi calendario (.ics)
                </a>
              </li>
              <li>
                <a href={event.links.official} {...ext}>
                  Sitio oficial de ESLARED ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__legal label">
          <span>© 2026 ESLARED · Universidad Técnica del Norte</span>
          <span>Programas tentativos, sujetos a cambios</span>
        </div>
      </div>
    </footer>
  );
}
