'use client';

import { usePref } from '@/lib/prefs';
import { Bookmark } from './Icons';

/** Botón de estado: marca este track como "mi track" (se guarda en el navegador). */
export function MyTrackButton({ slug }: { slug: string }) {
  const [track, setTrack] = usePref('track');
  const on = track === slug;

  return (
    <button type="button" className="pill-btn" aria-pressed={on} onClick={() => setTrack(on ? null : slug)}>
      <Bookmark filled={on} />
      <span aria-live="polite">{on ? 'Es mi track' : 'Marcar como mi track'}</span>
    </button>
  );
}

/** Etiqueta "Tu elección" en el índice de tracks de la portada. */
export function MyTrackBadge({ slug }: { slug: string }) {
  const [track] = usePref('track');
  if (track !== slug) return null;
  return <span className="chip chip--solid">Tu elección</span>;
}
