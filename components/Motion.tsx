'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

/**
 * Capa de movimiento global:
 *  - scroll suave con Lenis (desactivado si el usuario prefiere menos movimiento),
 *  - revelado progresivo de [data-reveal] con IntersectionObserver,
 *  - barra de progreso de lectura.
 * Sin JS, todo el contenido es visible (las reglas viven bajo html.js).
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const bar = document.querySelector<HTMLElement>('.progress');

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar?.style.setProperty('--p', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let lenis: Lenis | undefined;
    let raf = 0;
    if (!reduce) {
      lenis = new Lenis({ duration: 1.05, anchors: { offset: -72 } });
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return <div className="progress" aria-hidden="true" />;
}
