'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Preferencias del visitante guardadas solo en su navegador (localStorage).
 * No se envía nada a ningún servidor: sirve para recordar "mi track" y
 * "mi tarifa" entre visitas y páginas.
 */
const EVENT = 'walc:prefs';
const key = (name: string) => `walc26.${name}`;

function read(name: string): string | null {
  try {
    return window.localStorage.getItem(key(name));
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener('storage', cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener('storage', cb);
  };
}

export function usePref(name: string): [string | null, (value: string | null) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => read(name),
    () => null,
  );

  const set = useCallback(
    (next: string | null) => {
      try {
        if (next === null) window.localStorage.removeItem(key(name));
        else window.localStorage.setItem(key(name), next);
      } catch {
        /* Modo privado o almacenamiento bloqueado: la página sigue funcionando. */
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [name],
  );

  return [value, set];
}
