'use client';

import { useEffect, useState } from 'react';
import { event, fees, tracks } from '@/lib/data';
import { usePref } from '@/lib/prefs';
import { ArrowOut } from './Icons';

/**
 * Barra fija inferior (solo móvil). Aparece tras pasar el hero y refleja
 * lo que el visitante ya eligió: su track y su tarifa.
 */
export function StickyCta() {
  const [show, setShow] = useState(false);
  const [feeId] = usePref('fee');
  const [trackSlug] = usePref('track');

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fee = fees.find((f) => f.id === feeId);
  const track = tracks.find((t) => t.slug === trackSlug);

  return (
    <div className="sticky-cta" data-show={show} inert={!show}>
      <p className="label">
        {track ? `Tu track · 0${track.n}` : event.datesShort}
        <b>{fee ? `Tu tarifa · US$ ${fee.price}` : `${event.city}, ${event.country}`}</b>
      </p>
      <a className="btn" href={event.links.preinscripcion} target="_blank" rel="noopener noreferrer">
        Pre-inscribirme
        <ArrowOut />
      </a>
    </div>
  );
}
