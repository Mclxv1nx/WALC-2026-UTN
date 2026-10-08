# ADR-001: Arquitectura del sitio de WALC 2026

**Estado:** Aceptada
**Fecha:** 8 de octubre de 2026
**Decide:** Comité local WALC 2026 (UTN)

## Contexto

Se necesita un sitio que dé visibilidad a WALC 2026 y lleve a la gente a pre-inscribirse. El evento es en seis semanas, el contenido cambia poco (programas tentativos, precios, sede) y la pre-inscripción ya existe como formulario en eslared.net. La petición fue "Nest.js, solo front end, sin backend".

Restricciones:

- Sin backend ni datos personales que custodiar.
- Lo mantiene un equipo pequeño de estudiantes: editar un precio no debe requerir tocar la maquetación.
- Debe cargar rápido en móviles y redes universitarias.
- Debe poder alojarse gratis en hosting estático.

## Decisión

Next.js 16 (App Router, React 19, TypeScript) con `output: 'export'`: el sitio se compila a HTML, CSS y JS estáticos. El contenido vive en un único módulo tipado (`lib/data.ts`). Estilos en CSS propio con tokens (`app/globals.css`), sin framework de utilidades. Tipografías autoalojadas con Fontsource. Lenis para el scroll suave; el resto del movimiento es CSS más `IntersectionObserver`.

## Opciones consideradas

### A. NestJS

| Dimensión | Evaluación |
| --- | --- |
| Complejidad | Alta para este caso |
| Costo | Requiere servidor Node en ejecución |
| Escalabilidad | Buena, pero innecesaria |
| Familiaridad | Media |

**A favor:** estructura sólida si hubiera API propia.
**En contra:** es un framework de backend; no renderiza interfaz. Contradice "solo front end" y obliga a mantener un servidor para servir páginas que no cambian.

### B. Next.js con exportación estática (elegida)

| Dimensión | Evaluación |
| --- | --- |
| Complejidad | Baja |
| Costo | Cero: cualquier hosting estático |
| Escalabilidad | La de un CDN |
| Familiaridad | Alta (React) |

**A favor:** rutas por archivo, páginas de track generadas desde datos, HTML completo sin JS (SEO y accesibilidad), se puede añadir servidor más adelante sin reescribir.
**En contra:** sin optimización de imágenes en el servidor ni rutas API mientras se exporte estático.

### C. Astro

| Dimensión | Evaluación |
| --- | --- |
| Complejidad | Baja |
| Costo | Cero |
| Escalabilidad | La de un CDN |
| Familiaridad | Baja en el equipo |

**A favor:** menos JS enviado por defecto.
**En contra:** otra sintaxis que aprender; las piezas interactivas (tarifas, "mi track", cuenta regresiva) igual requieren islas de React.

### D. HTML, CSS y JS a mano

**A favor:** cero dependencias.
**En contra:** seis páginas que comparten cabecera, pie y datos se duplican; cada cambio de precio se edita en varios sitios.

## Análisis de compromisos

- **Estático frente a servidor:** se renuncia a formularios propios y a la optimización de imágenes a cambio de no operar nada. Aceptable porque la pre-inscripción ya vive en eslared.net.
- **CSS propio frente a Tailwind:** el diseño es tipográfico y a medida; los tokens en `:root` dan la misma consistencia con menos capas. A cambio, no hay utilidades listas para prototipar.
- **Datos en código frente a CMS:** un archivo tipado es suficiente para cinco tracks y evita otro servicio. Si personas no técnicas necesitan editar, habría que migrar a un CMS.
- **Imágenes remotas:** logotipos y fotos de Ibarra se enlazan desde eslared.net con respaldo local o tipográfico. Es una dependencia externa asumida por rapidez; conviene copiarlas a `public/`.

## Estructura

```
app/                  rutas (portada, tracks/[slug], matricula, sede, 404) y globals.css
components/           piezas de interfaz; las interactivas llevan 'use client'
lib/data.ts           todo el contenido, tipado
lib/prefs.ts          preferencias del visitante en localStorage
public/               afiches, foto de respaldo, .ics
docs/                 este ADR, handoff de diseño, memoria
```

Componentes de servidor por defecto. Solo son de cliente: cabecera (menú), cuenta regresiva, selector de tarifa, "mi track", copiar, fotos con respaldo, barra fija móvil y la capa de movimiento.

## Consecuencias

- Más fácil: publicar (subir `out/`), cambiar contenido (un archivo), añadir un track (un objeto en `tracks`).
- Más difícil: cualquier cosa que necesite servidor (formulario propio, cupos en tiempo real, pagos).
- A revisar: si se quiere mostrar cupos disponibles en vivo o recibir inscripciones aquí, quitar `output: 'export'` y añadir rutas API o un servicio externo.

## Acciones

1. [x] Portada, cinco tracks, matrícula y sede.
2. [ ] Copiar logotipos y fotos oficiales a `public/img/`.
3. [ ] Elegir hosting y, si aplica, definir `NEXT_PUBLIC_BASE_PATH`.
4. [ ] Añadir imagen Open Graph para compartir en redes.
5. [ ] Confirmar tarifas y datos de pago con ESLARED antes de publicar.
