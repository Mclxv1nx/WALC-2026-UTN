'use client';

import { useRef, useState } from 'react';
import { Check, Copy } from './Icons';

/**
 * Copia un valor al portapapeles y lo confirma en el propio botón
 * (sin toasts): "Copiar" → "Copiado" durante 2 s.
 */
export function CopyButton({ value, label, children }: { value: string; label: string; children?: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = value;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setDone(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setDone(false), 2000);
  };

  return (
    <button type="button" className="copy label" data-done={done} onClick={copy} aria-label={`Copiar ${label}`}>
      {done ? <Check /> : <Copy />}
      <span aria-live="polite">{done ? 'Copiado' : (children ?? 'Copiar')}</span>
    </button>
  );
}
