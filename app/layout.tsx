import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/big-shoulders';
import '@fontsource-variable/hanken-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/instrument-serif/400-italic.css';
import './globals.css';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Motion } from '@/components/Motion';
import { StickyCta } from '@/components/StickyCta';
import { Ticker } from '@/components/Ticker';
import { event } from '@/lib/data';

export const metadata: Metadata = {
  title: {
    default: 'WALC 2026 — Workshop para América Latina y el Caribe · Ibarra, Ecuador',
    template: '%s — WALC 2026',
  },
  description:
    '29.ª edición del WALC: cinco tracks intensivos de 40 horas en IA agéntica, AI Engineering, ciberseguridad, IoT y Data Science. 16 al 20 de noviembre de 2026, Universidad Técnica del Norte, Ibarra, Ecuador.',
  keywords: ['WALC 2026', 'ESLARED', 'Universidad Técnica del Norte', 'Ibarra', 'IA agéntica', 'ciberseguridad', 'IoT', 'Data Science'],
  openGraph: {
    type: 'website',
    locale: 'es_EC',
    siteName: 'WALC 2026',
    title: 'WALC 2026 — Ibarra, Ecuador · 16 al 20 de noviembre',
    description: `${event.tagline}. Cinco tracks, 40 horas, 30 cupos por track.`,
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0f0c',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Marca que hay JS antes del primer pintado: habilita los revelados sin parpadeo. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip" href="#contenido">
          Saltar al contenido
        </a>
        <Ticker />
        <Header />
        <main id="contenido">{children}</main>
        <Footer />
        <StickyCta />
        <Motion />
      </body>
    </html>
  );
}
