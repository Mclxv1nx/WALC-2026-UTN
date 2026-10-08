'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { event } from '@/lib/data';
import { Arrow, ArrowOut } from './Icons';

const links = [
  { href: '/#tracks', label: 'Tracks', match: '/tracks' },
  { href: '/matricula/', label: 'Matrícula', match: '/matricula' },
  { href: '/sede/', label: 'Sede', match: '/sede' },
  { href: '/#organizacion', label: 'Organización', match: '#' },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    menu.current?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btn.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const current = (match: string) => (pathname.startsWith(match) ? 'page' : undefined);

  return (
    <>
      <header className="header">
        <div className="wrap header__in">
          <Link href="/" className="brand" aria-label="WALC 2026, inicio">
            <span>
              WALC<b>/26</b>
            </span>
            <small>Ibarra · Ecuador</small>
          </Link>

          <nav className="nav" aria-label="Principal">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={current(l.match)}>
                {l.label}
              </Link>
            ))}
          </nav>

          <a className="btn header__cta" href={event.links.preinscripcion} target="_blank" rel="noopener noreferrer">
            Pre-inscribirme
            <ArrowOut />
          </a>

          <button
            ref={btn}
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Cerrar' : 'Menú'}
            <i aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        id="menu"
        ref={menu}
        className="menu"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        inert={!open}
      >
        <ul className="menu__list">
          <li>
            <Link href="/" aria-current={pathname === '/' ? 'page' : undefined} onClick={() => setOpen(false)}>
              <span>00</span>Inicio
            </Link>
          </li>
          {links.map((l, i) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={current(l.match)} onClick={() => setOpen(false)}>
                <span>0{i + 1}</span>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <p className="label" style={{ color: 'rgba(242,239,230,.7)' }}>
            {event.datesShort} · {event.city}, {event.country}
          </p>
          <a className="btn btn--lg btn--block" href={event.links.preinscripcion} target="_blank" rel="noopener noreferrer">
            Pre-inscribirme
            <ArrowOut />
          </a>
          <Link className="btn btn--ghost btn--block on-ink" href="/matricula/" onClick={() => setOpen(false)}>
            Ver matrícula
            <Arrow />
          </Link>
        </div>
      </div>
    </>
  );
}
