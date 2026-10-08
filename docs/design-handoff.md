# Handoff de diseño — WALC 2026

## Concepto

| | |
| --- | --- |
| Esencia | Encuentro |
| Tensión visual | Paisaje andino frente a rigor técnico: titulares monumentales y condensados contra datos en monoespaciada |
| Momento insignia | El índice de tracks: al pasar por una fila, se inunda con el color del track y aparece su afiche |
| Referencia | F-List 2026 (cinta de datos, cifras gigantes, listas como índice editorial) |

Stack: Next.js 16, React 19, CSS propio con variables. Todos los valores salen de `app/globals.css`.

## Tokens

### Color

| Token | Valor | Uso |
| --- | --- | --- |
| `--ink` | `#0d0f0c` | Fondo oscuro, texto sobre papel |
| `--ink-2` | `#161a15` | Superficies sobre tinta |
| `--paper` | `#f2efe6` | Fondo claro, texto sobre tinta |
| `--paper-2` | `#e7e3d6` | Marcos de foto |
| `--orange` | `#ff6b1a` | Acento general, CTA, cinta |
| `--green` | `#0a6b3b` | Acento de texto sobre papel |
| `--accent` | por contexto | Naranja; en cada track, su color |
| `--fg`, `--fg-2`, `--fg-3` | 100 / 72 / 56 % | Texto primario, secundario, terciario |
| `--line` | 16–18 % | Filetes |

Colores de track: T1 `#ff6b1a`, T2 `#a67bff`, T3 `#ff4450`, T4 `#8be03a`, T5 `#3cc4ff`. Siempre como relleno con texto `--ink`, o como texto sobre `--ink`. Nunca como texto sobre papel (contraste insuficiente): ahí se usa `--green`.

Las secciones cambian de tema con `.on-ink` y `.on-paper`, que redefinen los tokens semánticos.

### Tipografía

| Rol | Familia | Uso |
| --- | --- | --- |
| Display | Big Shoulders (variable, 800–900), mayúsculas | Titulares, cifras, precios |
| Acento | Instrument Serif itálica | Una frase por titular (`<em>`) y bajadas |
| Texto | Hanken Grotesk (variable) | Cuerpo e interfaz |
| Datos | JetBrains Mono (variable) | Etiquetas, botones, números de cuenta |

| Token | Valor | Uso |
| --- | --- | --- |
| `--t-mega` | `clamp(5.5rem, 20.2vw, 30rem)` | "WALC 2026", cierres |
| `--t-display` | `clamp(3rem, 9.2vw, 9.5rem)` | Titular de sección |
| `--t-title` | `clamp(2.25rem, 5.4vw, 5rem)` | Titular secundario |
| `--t-lead` | `clamp(1.375rem, 2.3vw, 2.25rem)` | Entradilla |
| `--t-body` | `clamp(1.0625rem, …, 1.1875rem)` | Cuerpo (17–19 px), interlineado 1.6, máx. 62ch |
| `--t-small` | `0.9375rem` | Texto de apoyo |
| `--t-label` | `0.75rem`, +0.08em, mayúsculas | Etiquetas mono |

Relación display/cuerpo de hasta 25:1. Titulares de varias líneas con interlineado 0.9; de una línea, 0.8. El título de cada track calcula su cuerpo con `--n` (caracteres de la línea más larga) para no partir palabras.

### Espacio y movimiento

| Token | Valor |
| --- | --- |
| `--gutter` | `clamp(1.125rem, 4vw, 3.5rem)` |
| `--section` | `clamp(4.5rem, 11vw, 10rem)` |
| Rejilla | 12 columnas, canal `clamp(1rem, 2vw, 2rem)` |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` |
| `--ease-io` | `cubic-bezier(0.87, 0, 0.13, 1)` |
| `--d-fast` / `--d-base` / `--d-slow` | 180 / 420 / 900 ms |

Radio de borde: 2 px en todo.

## Componentes

| Componente | Archivo | Notas |
| --- | --- | --- |
| Cinta | `Ticker.tsx` | Bucle continuo; se pausa al pasar el cursor; estática con movimiento reducido |
| Cabecera | `Header.tsx` | Fija; enlace activo subrayado; menú a pantalla completa bajo 960 px |
| Botón | `.btn`, `.btn--ghost`, `.btn--ink`, `.btn--lg` | Alto mínimo 52 px; relleno que sube al pasar |
| Enlace con flecha | `.arrow-link` | Subrayado que se retira hacia la derecha |
| Cuenta regresiva | `Countdown.tsx` | Solo cliente; estados "En curso ahora" y "Edición concluida" |
| Fila de track | `.trow` | Momento insignia |
| Selector de tarifa | `FeePicker.tsx` | `radiogroup`; recuerda la elección |
| Mi track | `MyTrack.tsx` | Botón de estado (`aria-pressed`) y etiqueta "Tu elección" |
| Copiar | `CopyButton.tsx` | Confirma en el propio botón durante 2 s |
| Foto | `Photo.tsx` | Proporción fija; respaldo local si falla la remota |
| Barra fija móvil | `StickyCta.tsx` | Aparece tras el 70 % de la primera pantalla |
| Cierre | `Closing.tsx` | Bloque final con CTA; hereda el color del track |

## Estados e interacciones

| Elemento | Estado | Comportamiento |
| --- | --- | --- |
| Botón | Hover / foco | Relleno sube desde abajo (420 ms), flecha +4 px |
| Botón | Activo | Escala 0.98 |
| Fila de track | Hover / foco | Fondo del color del track crece desde abajo (600 ms), texto a tinta, título +1.75rem, afiche aparece girado −3° |
| Fila de track | Táctil | Sin afiche; el fondo responde al toque |
| Tarifa | Seleccionada | Fondo tinta, etiqueta "Tu tarifa", radio relleno; el resumen y el CTA muestran el monto |
| Tarifa | Teclado | Flechas mueven y seleccionan; clic en la seleccionada la desmarca |
| Mi track | Activo | Fondo invertido, marcador relleno, texto "Es mi track" |
| Copiar | Hecho | Icono de verificación y "Copiado", anunciado con `aria-live` |
| Pregunta | Abierta | El signo + gira a −; la respuesta entra con desvanecido |
| Menú móvil | Abierto | Cortina con `clip-path` (700 ms); bloquea el scroll; Escape cierra y devuelve el foco |
| Cifra | Hover | La celda se invierte a tinta |

## Movimiento

| Elemento | Disparador | Animación | Duración | Curva |
| --- | --- | --- | --- | --- |
| Título del hero | Carga | Cada línea sube desde su máscara, escalonadas 110 ms | 1100 ms | `--ease-out` |
| Bajada, foto, CTA del hero | Carga | Desvanecido + 18 px, a 550 / 700 / 850 ms | 1000 ms | `--ease-out` |
| `[data-reveal]` | Entra al viewport | Opacidad + 28 px, escalonado 80 ms por `--i` | 900 ms | `--ease-out` |
| `[data-reveal="line"]` | Entra al viewport | Opacidad + 0.32em | 1300 ms | `--ease-out` |
| Scroll | Rueda / táctil | Lenis, duración 1.05 | — | — |
| Barra de progreso | Scroll | `scaleX` | — | — |

Solo se animan `transform`, `opacity` y `clip-path`. Con `prefers-reduced-motion` no hay Lenis, la cinta queda estática y todo aparece sin transición. Sin JavaScript todo el contenido es visible (los revelados dependen de la clase `js` en `<html>`).

## Comportamiento responsive

| Ancho | Cambios |
| --- | --- |
| ≥ 1200 px | Programa en 5 columnas |
| ≥ 960 px | Navegación en línea; sin barra fija inferior |
| ≥ 900 px | Rejillas de 12 columnas, tarifas y pasos en 3 columnas, afiche en el hero del track, hover con afiche en el índice |
| 600–899 px | "WALC 2026" en una línea; contenido a una columna |
| < 600 px | "WALC" y "2026" en dos líneas a 40vw; tarifas como filas con el precio a la derecha |

Probado a 390 y 1440 px sin desbordamiento horizontal.

## Casos límite

- **Imagen remota caída:** la foto muestra el respaldo local; los logotipos, sus iniciales.
- **Sin `localStorage`:** tarifa y track no se recuerdan; nada falla.
- **Título de track largo:** el cuerpo se ajusta por `--n`; añade `lines` al crear un track.
- **Tras el evento:** la cuenta regresiva pasa a "Edición concluida". Los CTA de pre-inscripción hay que retirarlos a mano.
- **Track sin programa diario:** se muestran módulos (Track 3) o se omite la sección (Track 4).

## Accesibilidad

- Enlace "Saltar al contenido"; un `h1` por página; secciones con `aria-labelledby`.
- Foco visible de 2 px en el color de acento (tinta sobre papel y sobre naranja).
- Objetivos táctiles de 44 px o más.
- Tarifas como `radiogroup`; "mi track" con `aria-pressed`; menú como diálogo con `inert` cuando está cerrado.
- Los enlaces externos llevan ↗ y abren en pestaña nueva.
- Texto primario y secundario por encima de 4.5:1 en ambos temas.
- El contenido no depende de hover: toda la información de cada track está en la fila.

## Marcos de experiencia aplicados

- **Heurísticas (Krug, Nielsen):** un CTA primario por pantalla, migas y enlace activo, lenguaje del visitante ("Pre-inscribirme"), estado visible (cuenta regresiva, "Copiado"), salida siempre disponible (Escape, desmarcar).
- **Microinteracciones (Saffer):** disparador, regla, respuesta y bucle definidos en tarifa, mi track y copiar; la respuesta ocurre en el propio control.
- **Hook (Eyal), en versión honesta:** disparador externo (archivo de calendario), acción mínima (un toque para elegir tarifa o track), recompensa (el sitio responde con tu monto y tu elección), inversión (la preferencia se recuerda y personaliza el CTA). Sin escasez falsa: los 30 cupos por track son el dato oficial.

## Autoevaluación

| Criterio | Nota | Para subir |
| --- | --- | --- |
| Tipografía | 9 | Fuente display de fundición propia |
| Composición | 8 | Fotografía propia en alta resolución |
| Movimiento | 8 | Transición entre páginas |
| Color | 8 | — |
| Detalle | 8 | Imagen Open Graph, estado posterior al evento |

Total ponderado: 8,3 sobre 10.
