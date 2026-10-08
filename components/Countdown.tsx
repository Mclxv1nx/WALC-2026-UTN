'use client';

import { useEffect, useState } from 'react';
import { event } from '@/lib/data';
import { pad2 } from '@/lib/site';

const start = new Date(event.startISO).getTime();
const end = new Date(event.endISO).getTime();

/**
 * Cuenta regresiva al lunes 16 de noviembre (hora de Ecuador).
 * Se pinta solo en el cliente para evitar desajustes de hidratación.
 */
export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) {
    return (
      <span className="countdown" aria-hidden="true">
        <span>
          <b>——</b>
          <i>D</i>
        </span>
      </span>
    );
  }

  if (now >= end) return <span>Edición concluida</span>;
  if (now >= start) return <span>En curso ahora</span>;

  const s = Math.floor((start - now) / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  return (
    <span className="countdown" role="timer" aria-label={`Faltan ${d} días, ${h} horas y ${m} minutos`}>
      <span aria-hidden="true">
        <b>{d}</b>
        <i>D</i>
      </span>
      <span aria-hidden="true">
        <b>{pad2(h)}</b>
        <i>H</i>
      </span>
      <span aria-hidden="true">
        <b>{pad2(m)}</b>
        <i>M</i>
      </span>
      <span aria-hidden="true">
        <b>{pad2(sec)}</b>
        <i>S</i>
      </span>
    </span>
  );
}
