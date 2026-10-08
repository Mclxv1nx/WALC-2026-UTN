# WALC 2026 — sitio web

Sitio de la 29.ª edición del **Workshop para América Latina y el Caribe (WALC)**, del 16 al 20 de noviembre de 2026 en la Universidad Técnica del Norte, Ibarra, Ecuador.

Solo front end: Next.js (App Router) exportado como sitio estático. No hay backend, base de datos ni variables secretas.

## Ponerlo en marcha

Requiere Node.js 20.9 o superior.

```bash
npm install
npm run dev      # http://localhost:3000
```

Para producción:

```bash
npm run build    # genera la carpeta out/ (HTML, CSS y JS estáticos)
npm run start    # sirve out/ localmente para revisarla
```

La carpeta `out/` se puede subir tal cual a cualquier hosting estático (GitHub Pages, Netlify, Vercel, el servidor de la UTN). Si el sitio va a vivir en una subcarpeta, por ejemplo `usuario.github.io/WALC-2026-UTN`, compila con:

```bash
NEXT_PUBLIC_BASE_PATH=/WALC-2026-UTN npm run build
```

## Dónde se cambia cada cosa

| Quiero cambiar…                              | Archivo                      |
| -------------------------------------------- | ---------------------------- |
| Precios, fechas, textos, instructores, FAQ   | `lib/data.ts`                |
| Colores, tipografías, espaciados, animación  | `app/globals.css` (`:root`)  |
| Afiches de los tracks                        | `public/posters/track-N.jpg` |
| Foto de respaldo del hero                    | `public/img/yahuarcocha.jpg` |
| Evento de calendario descargable             | `public/walc-2026.ics`       |

Todo el contenido vive en `lib/data.ts`: las páginas solo lo maquetan.

## Páginas

- `/` — portada: hero con cuenta regresiva, el taller, índice de tracks, cifras, matrícula, pasos, sede, organización, preguntas frecuentes.
- `/tracks/[slug]/` — una página por track (5), generadas estáticamente.
- `/matricula/` — tarifas, qué incluye, proceso y datos de pago.
- `/sede/` — Ibarra y Ecuador.

## Pendientes conocidos

- Los logotipos de ESLARED y UTN y las fotos de Ibarra se cargan desde `eslared.net`. Si prefieres no depender de ese servidor, guarda las imágenes en `public/img/` y cambia las rutas en `lib/data.ts`.
- La pre-inscripción enlaza al formulario oficial de ESLARED; este sitio no recoge datos.

## Documentación

- `docs/ADR-001-arquitectura.md` — decisiones de arquitectura.
- `docs/design-handoff.md` — sistema de diseño y especificación de componentes.
- `docs/MEMORIA.md` — decisiones y contexto de la sesión de trabajo.
