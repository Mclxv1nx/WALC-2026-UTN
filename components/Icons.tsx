type P = { className?: string };

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'square' as const,
  'aria-hidden': true,
  focusable: false,
};

export const Arrow = ({ className = 'arrow' }: P) => (
  <svg {...base} className={className}>
    <path d="M3 12h17M13 5l7 7-7 7" />
  </svg>
);

export const ArrowOut = ({ className = 'arrow arrow--out' }: P) => (
  <svg {...base} className={className}>
    <path d="M6 18 18 6M8 6h10v10" />
  </svg>
);

export const Check = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const Copy = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M9 9h11v11H9zM15 9V4H4v11h5" />
  </svg>
);

export const Bookmark = ({ className, filled }: P & { filled?: boolean }) => (
  <svg {...base} className={className} fill={filled ? 'currentColor' : 'none'}>
    <path d="M6 3h12v18l-6-4.5L6 21z" />
  </svg>
);
