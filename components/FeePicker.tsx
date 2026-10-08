'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { event, fees } from '@/lib/data';
import { usePref } from '@/lib/prefs';
import { Arrow, ArrowOut } from './Icons';

/**
 * Selector de tarifa. Es un radiogroup accesible (flechas + espacio):
 * la opción elegida se "tinta", el resumen inferior se actualiza y la
 * elección se recuerda en el navegador para el resto del sitio.
 */
export function FeePicker({ showMatriculaLink = true }: { showMatriculaLink?: boolean }) {
  const [feeId, setFee] = usePref('fee');
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = fees.find((f) => f.id === feeId);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + fees.length) % fees.length;
    setFee(fees[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div className="fees" data-reveal role="radiogroup" aria-label="¿Cuál es tu tarifa?">
        {fees.map((f, i) => {
          const checked = f.id === feeId;
          return (
            <button
              key={f.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked || (!selected && i === 0) ? 0 : -1}
              className="fee"
              onClick={() => setFee(checked ? null : f.id)}
              onKeyDown={(e) => onKey(e, i)}
            >
              <span className="fee__k label">
                <span className="fee__radio" aria-hidden="true" />
                {checked ? 'Tu tarifa' : `Tarifa 0${i + 1}`}
              </span>
              <span className="fee__w">{f.label}</span>
              <span className="fee__note">
                {f.who}. {f.note}
              </span>
              <span className="fee__p num">
                <sup>US$</sup>
                {f.price}
              </span>
            </button>
          );
        })}
      </div>

      <div className="fee-result" aria-live="polite">
        <p>
          {selected ? (
            <>
              <strong>
                Tu matrícula: US$ {selected.price}.
              </strong>{' '}
              {selected.who}. Recordaremos tu elección en este navegador.
            </>
          ) : (
            <>
              <strong>¿Cuál es la tuya?</strong> Toca una tarifa para marcarla. Precios en dólares estadounidenses, por
              persona y por track.
            </>
          )}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
          <a className="btn btn--ink" href={event.links.preinscripcion} target="_blank" rel="noopener noreferrer">
            {selected ? `Pre-inscribirme · US$ ${selected.price}` : 'Pre-inscribirme'}
            <ArrowOut />
          </a>
          {showMatriculaLink && (
            <Link className="btn btn--ghost" href="/matricula/">
              Cómo pagar
              <Arrow />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
