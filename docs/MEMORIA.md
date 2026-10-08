# Memoria del proyecto

Notas en el formato de Engram (`mem_save` / `mem_session_summary`). El servidor MCP de Engram no estaba conectado en la sesión del 8 de octubre de 2026, así que se guardan aquí para cargarlas cuando lo esté.

## Resumen de sesión — 2026-10-08

### Goal
Crear el sitio web de WALC 2026 (UTN, Ibarra) que dé visibilidad al congreso y lleve a la pre-inscripción.

### Instructions
- Solo front end, sin backend. Carpeta de trabajo: `C:\Users\adria\Documents\GitHub\WALC-2026-UTN`.
- Tarifas: US$ 200 general, US$ 100 becados de fuera de Ibarra, US$ 70 estudiantes UTN.
- Referencia visual: F-List 2026 (Awwwards): tipografía enorme, cinta de datos, cifras grandes, listas tipo índice.
- Contenido desde eslared.net/walc2026 y sus páginas de tracks.

### Discoveries
- NestJS es backend; se usó Next.js con exportación estática (ver ADR-001).
- La página oficial de matrícula publica otras cifras (US$ 100 + IVA presencial, US$ 50 online). Se usaron las indicadas por el organizador local; hay que conciliarlas.
- El teléfono de WhatsApp de los afiches (+593 99 123 4567) parece de relleno: no se publicó.
- El contenido oficial del Track 2 es Edge AI / TinyML, distinto del texto del afiche (MLOps). El sitio sigue la ficha oficial.
- `IntersectionObserver` no dispara en elementos totalmente recortados con `clip-path`; los revelados usan opacidad y traslación.
- Big Shoulders necesita interlineado ≥ 0.9 en titulares de varias líneas y margen para tildes dentro de máscaras `overflow: hidden`.

### Accomplished
- Portada, cinco páginas de track, matrícula, sede y 404.
- Sistema de diseño con tokens, movimiento con respeto a `prefers-reduced-motion`.
- Selector de tarifa y "mi track" persistidos en `localStorage`.

### Next Steps
- Confirmar tarifas, IVA y precio del track online con ESLARED.
- Copiar logotipos y fotos a `public/img/`.
- Publicar (elegir hosting) y añadir imagen Open Graph.

### Relevant Files
- `lib/data.ts` — todo el contenido.
- `app/globals.css` — tokens y estilos.
- `docs/ADR-001-arquitectura.md`, `docs/design-handoff.md`.

## Observaciones

**Elegido Next.js estático en lugar de NestJS** · decision · topic_key `architecture/stack`
- What: Next.js 16 con `output: 'export'`.
- Why: el pedido era solo front end; NestJS no renderiza interfaz.
- Where: `next.config.mjs`.

**Tarifas definidas por el organizador local** · preference · topic_key `content/fees`
- What: 200 / 100 / 70 dólares.
- Why: indicación directa; difiere de eslared.net.
- Where: `lib/data.ts` (`fees`).

**Color por track** · pattern · topic_key `design/track-colors`
- What: cada track redefine `--accent` (naranja, violeta, rojo, verde, celeste), tomado de su afiche.
- Where: `lib/data.ts` (`color`), `app/tracks/[slug]/page.tsx`.
