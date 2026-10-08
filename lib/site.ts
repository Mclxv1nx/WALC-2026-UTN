const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Antepone el basePath a recursos de /public usados en <img> o CSS. */
export const asset = (path: string) => (/^https?:/.test(path) ? path : `${base}${path}`);

export const pad2 = (n: number) => String(n).padStart(2, '0');
