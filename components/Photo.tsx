'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/site';

/**
 * Fotografía con marco de proporción fija (sin saltos de maquetación).
 * Si la imagen remota falla, queda el marco con el fondo local de respaldo.
 */
export function Photo({
  src,
  alt,
  ratio = 'land',
  fallback,
  eager,
}: {
  src: string;
  alt: string;
  ratio?: 'wide' | 'tall' | 'land';
  fallback?: string;
  eager?: boolean;
}) {
  const [ok, setOk] = useState(true);
  const img = useRef<HTMLImageElement>(null);

  // Si la imagen falló antes de la hidratación, onError ya no se dispara.
  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth === 0) setOk(false);
  }, []);

  return (
    <div
      className={`photo photo--${ratio}`}
      style={fallback ? { backgroundImage: `url(${asset(fallback)})` } : undefined}
      role={ok ? undefined : 'img'}
      aria-label={ok ? undefined : alt}
    >
      {ok && (
        <img
          ref={img}
          src={asset(src)}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setOk(false)}
        />
      )}
    </div>
  );
}

/** Logotipo remoto con respaldo tipográfico si la imagen no carga. */
export function Logo({ src, name }: { src: string; name: string }) {
  const [ok, setOk] = useState(true);
  const img = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (img.current?.complete && img.current.naturalWidth === 0) setOk(false);
  }, []);

  return (
    <span className="org__logo" aria-hidden="true">
      {ok ? (
        <img ref={img} src={src} alt="" width={72} height={72} loading="lazy" decoding="async" onError={() => setOk(false)} />
      ) : (
        name.slice(0, 3)
      )}
    </span>
  );
}
