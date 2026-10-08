import { ticker } from '@/lib/data';

/** Cinta superior de datos. Se duplica el contenido para un bucle continuo. */
export function Ticker() {
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="ticker__track" aria-hidden={hidden || undefined}>
      {ticker.map((t) => (
        <li key={t} className="ticker__item label">
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker" role="region" aria-label="Datos clave de WALC 2026">
      <Row />
      <Row hidden />
      <Row hidden />
    </div>
  );
}
