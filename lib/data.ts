/**
 * Fuente única de contenido de WALC 2026.
 * Todo el texto del sitio sale de aquí: para cambiar un precio, una fecha
 * o un instructor, edita este archivo y nada más.
 *
 * Fuente: https://eslared.net/walc2026/ (consultado el 8 de octubre de 2026).
 */

export const OFFICIAL = 'https://eslared.net/walc2026';

export const event = {
  name: 'WALC 2026',
  longName: 'Workshop para América Latina y el Caribe',
  edition: '29.ª edición',
  tagline: 'El punto de encuentro de la evolución tecnológica en la región',
  dates: '16 al 20 de noviembre de 2026',
  datesShort: '16—20 NOV 2026',
  /** Lunes 16 de noviembre, hora de Ecuador (UTC−5). */
  startISO: '2026-11-16T00:00:00-05:00',
  endISO: '2026-11-20T23:59:59-05:00',
  venue: 'Universidad Técnica del Norte',
  faculty: 'Facultad de Ingeniería en Ciencias Aplicadas',
  city: 'Ibarra',
  country: 'Ecuador',
  email: 'walc.eslared@gmail.com',
  links: {
    official: `${OFFICIAL}/`,
    preinscripcion: `${OFFICIAL}/pre-inscripcion/`,
    matricula: `${OFFICIAL}/matricula/`,
    sede: `${OFFICIAL}/ecuador-ibarra/`,
    hoteles: `${OFFICIAL}/hoteles/`,
    ingreso: `${OFFICIAL}/requisitos-para-ingresar-a-ecuador/`,
    organizacion: `${OFFICIAL}/organizacion/`,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Matrícula                                                           */
/* ------------------------------------------------------------------ */

export type Fee = {
  id: string;
  label: string;
  who: string;
  price: number;
  note: string;
};

/** Tarifas en dólares estadounidenses. */
export const fees: Fee[] = [
  {
    id: 'general',
    label: 'General',
    who: 'Profesionales y público general',
    price: 200,
    note: 'Tarifa regular de matrícula.',
  },
  {
    id: 'becado',
    label: 'Becados',
    who: 'Becados de fuera de la ciudad de Ibarra',
    price: 100,
    note: 'Media matrícula subvencionada. Cupos de beca muy limitados.',
  },
  {
    id: 'utn',
    label: 'Estudiantes UTN',
    who: 'Estudiantes de la Universidad Técnica del Norte',
    price: 70,
    note: 'Tarifa preferencial para la comunidad estudiantil anfitriona.',
  },
];

export const feeIncludes = [
  'Participación en el track que elijas (40 horas)',
  'Material de apoyo',
  'Certificado de participación',
];

export const feeExcludes =
  'La matrícula no incluye alojamiento, desayunos, almuerzos, cenas, traslados, seguros médicos ni de hospitalización, ni pasajes aéreos o terrestres.';

/** Datos de pago publicados en la página oficial de matrícula. */
export const payment = [
  { k: 'Banco', v: 'Banco del Pichincha' },
  { k: 'Tipo de cuenta', v: 'Cuenta Corriente' },
  { k: 'Número de cuenta', v: '2100088362', copy: true },
  { k: 'Titular', v: 'SOL & TECH SOLUCIONES Y TECNOLOGIA' },
  { k: 'RUC', v: '1391712944001', copy: true },
];

/* ------------------------------------------------------------------ */
/* Tracks                                                              */
/* ------------------------------------------------------------------ */

export type Day = { day: string; title: string; theory: string[]; lab: string[] };
export type Block = { title: string; items: string[] };
export type Person = { name: string; org: string; place: string; note?: string };

export type Track = {
  n: number;
  slug: string;
  title: string;
  /** Título partido en líneas para la tipografía de gran formato. */
  lines: string[];
  modality: 'Presencial' | 'Online';
  color: string;
  poster: string;
  lead: string;
  summary: string[];
  tags: string[];
  audience?: string[];
  requirements: string[];
  learn?: string[];
  days?: Day[];
  modules?: Block[];
  extras?: { title: string; body?: string; items?: string[]; link?: { href: string; label: string } }[];
  outcomes?: string[];
  coordinator: string;
  instructors: Person[];
  seats: number;
  hours: number;
  official: string;
};

export const tracks: Track[] = [
  {
    n: 1,
    slug: 'programacion-agentica-para-ia',
    title: 'Programación Agéntica para IA',
    lines: ['Programación', 'Agéntica', 'para IA'],
    modality: 'Presencial',
    color: '#ff6b1a',
    poster: '/posters/track-1.jpg',
    lead: 'Diseña, construye y despliega agentes que razonan, usan herramientas y conversan con otros sistemas.',
    summary: [
      'Una semana intensiva y práctica para diseñar, construir y desplegar agentes de inteligencia artificial capaces de razonar, usar herramientas, recuperar información propia (RAG) e interactuar con sistemas externos mediante el Model Context Protocol (MCP).',
      'El recorrido va desde los fundamentos de LLMs y prompt engineering hasta los sistemas multiagente en producción. Cada día combina teoría breve, un laboratorio con código real y trabajo en grupo: el proyecto que arranca el lunes crece día a día y se presenta el viernes como demo final.',
    ],
    tags: ['LLMs', 'RAG', 'MCP', 'Multiagente', 'Tool Use'],
    requirements: ['Conocimientos básicos de Python.', 'No se requiere experiencia previa en IA.'],
    learn: [
      'Fundamentos de IA Generativa y LLMs',
      'Prompt Engineering, Structured Outputs y Function Calling',
      'Diseño e implementación de agentes inteligentes',
      'Uso de herramientas (Tool Use) y memoria',
      'Retrieval-Augmented Generation (RAG)',
      'Model Context Protocol (MCP): cliente y servidor',
      'Arquitecturas multiagente',
      'Despliegue local de modelos de IA',
      'Buenas prácticas para agentes de IA',
    ],
    days: [
      {
        day: 'Lunes',
        title: 'Fundamentos de IA Generativa y Agentes',
        theory: ['Introducción a LLMs', 'Prompt Engineering', 'Structured Outputs', 'Function Calling', '¿Qué es un agente?'],
        lab: ['Configuración del entorno con modelos open-source locales.', 'Primer agente conversacional.'],
      },
      {
        day: 'Martes',
        title: 'Herramientas, Memoria y RAG',
        theory: ['Arquitectura de agentes', 'Tool Use', 'Memoria', 'Retrieval-Augmented Generation (RAG)'],
        lab: ['Construcción de un agente con herramientas, memoria y RAG sobre una base de conocimiento propia.'],
      },
      {
        day: 'Miércoles',
        title: 'Integración con Sistemas',
        theory: ['APIs', 'Model Context Protocol (MCP)', 'Cliente y servidor MCP'],
        lab: ['Creación de un servidor MCP propio y consumo de sus herramientas desde un agente.'],
      },
      {
        day: 'Jueves',
        title: 'Sistemas Multiagente',
        theory: ['Patrones de agentes', 'Coordinación entre agentes', 'Frameworks multiagente', 'Despliegue local'],
        lab: ['Construcción de un sistema multiagente.'],
      },
      {
        day: 'Viernes',
        title: 'Agentes para Producción',
        theory: ['Seguridad', 'Human in the Loop', 'Evaluación de agentes', 'Buenas prácticas'],
        lab: ['Integración final del proyecto y presentación de resultados.'],
      },
    ],
    extras: [
      {
        title: 'Proyecto',
        body: 'Durante toda la semana, los equipos desarrollan una solución de IA agéntica que incorpora progresivamente lo aprendido cada día.',
      },
      { title: 'Herramientas', body: 'Se utilizan herramientas de código abierto.' },
    ],
    outcomes: [
      'Diseñar agentes basados en LLMs.',
      'Implementar agentes con herramientas, memoria y RAG.',
      'Integrar agentes con servicios externos mediante MCP.',
      'Construir sistemas multiagente.',
      'Desplegar soluciones de IA de forma local.',
      'Aplicar principios básicos de seguridad en aplicaciones de IA agéntica.',
    ],
    coordinator: 'Ronald Criollo',
    instructors: [
      { name: 'Ronald Criollo', org: 'Escuela Superior Politécnica del Litoral, ESPOL', place: 'Guayaquil, Ecuador' },
      { name: 'Stalin Arciniegas', org: 'Pontificia Universidad Católica del Ecuador, PUCE', place: 'Ibarra, Ecuador' },
    ],
    seats: 30,
    hours: 40,
    official: `${OFFICIAL}/track-1-programacion-agentica-para-ia/`,
  },
  {
    n: 2,
    slug: 'ai-engineering',
    title: 'AI Engineering',
    lines: ['AI', 'Engineering'],
    modality: 'Presencial',
    color: '#a67bff',
    poster: '/posters/track-2.jpg',
    lead: 'Entrena y ejecuta tus propios modelos en hardware real, sin depender de la nube.',
    summary: [
      'Una semana intensiva y práctica para construir y desplegar modelos de inteligencia artificial directamente en dispositivos. El recorrido va desde los fundamentos de IA y Machine Learning hasta la IA generativa ejecutándose en el borde (Edge), pasando por visión, audio y movimiento.',
      'Cada día combina teoría breve, un laboratorio con hardware real y un trabajo en grupo que se desarrolla a lo largo de la semana y se presenta el viernes. Al terminar, habrás entrenado y desplegado modelos de clasificación de imágenes, sonidos y movimientos en microcontroladores, y ejecutado un modelo generativo (SLM) en un dispositivo de borde.',
    ],
    tags: ['Edge AI', 'TinyML', 'Visión', 'Audio', 'SLMs'],
    audience: [
      'Profesores, estudiantes y profesionales de ingeniería, redes y computación que quieran terminar la semana habiendo entrenado y ejecutado sus propios modelos en hardware embebido.',
    ],
    requirements: ['Conocimientos básicos de Python.', 'No se requiere experiencia previa en IA.'],
    days: [
      {
        day: 'Lunes',
        title: 'Fundamentos y setup',
        theory: ['Introducción al track', 'Inteligencia Artificial: introducción'],
        lab: ['Tools & Setup: configuración de entornos y dispositivos.', 'Arranque del trabajo en grupos.'],
      },
      {
        day: 'Martes',
        title: 'Visión por computadora',
        theory: ['Machine Learning: introducción', 'CNN y Computer Vision: introducción'],
        lab: ['Clasificación de imágenes.', 'Trabajo en grupos.'],
      },
      {
        day: 'Miércoles',
        title: 'Audio',
        theory: ['Computer Vision avanzado', 'Procesamiento de audio'],
        lab: ['Clasificación de sonidos.', 'Trabajo en grupos.'],
      },
      {
        day: 'Jueves',
        title: 'Movimiento y series temporales',
        theory: ['Movimiento y detección de anomalías', 'Modelos neuronales recursivos (RNN, LSTM/GRU)'],
        lab: ['Clasificación de movimientos.', 'Trabajo en grupos.'],
      },
      {
        day: 'Viernes',
        title: 'IA Generativa y cierre',
        theory: ['Ética en IA', 'Transformers, LLMs e IA Generativa'],
        lab: ['IA Generativa en el Edge.', 'Presentación de los trabajos.'],
      },
    ],
    extras: [
      {
        title: 'Hardware de los laboratorios',
        body: 'Propuesta por confirmar.',
        items: [
          'Arduino Nicla / Seeed XIAOML Kit para los labs de TinyML (martes a jueves): cámara, micrófono e IMU para entrenar y desplegar modelos pequeños en el microcontrolador.',
          'Arduino UNO-Q para el lab de IA generativa (viernes): ejecuta modelos de lenguaje pequeños (SLMs) con llama.cpp.',
        ],
      },
      { title: 'Horario propuesto', body: '9:00 a 12:00 y 13:00 a 16:00 (6 h diarias, con corte de almuerzo).' },
      {
        title: 'El proyecto en grupo',
        body: 'Es el hilo conductor: crece cada día a medida que se incorporan visión, audio, movimiento y generación. El viernes, cada equipo presenta una solución de Edge AI integrada.',
      },
    ],
    coordinator: 'Marcelo Rovai',
    instructors: [
      { name: 'Marcelo Rovai', org: 'Universidade Federal de Itajubá, IESTI', place: 'Brasil' },
      { name: 'Diego Méndez Chávez', org: 'Universidad Javeriana', place: 'Bogotá, Colombia' },
      { name: 'Jesús López', org: 'Universidad Autónoma de Occidente', place: 'Cali, Colombia' },
      { name: 'Stalin Arciniegas', org: 'Pontificia Universidad Católica del Ecuador, PUCE', place: 'Ibarra, Ecuador' },
    ],
    seats: 30,
    hours: 40,
    official: `${OFFICIAL}/track-2-ai-engineering/`,
  },
  {
    n: 3,
    slug: 'ciberseguridad',
    title: 'Ciberseguridad',
    lines: ['Ciber', 'seguridad'],
    modality: 'Presencial',
    color: '#ff4450',
    poster: '/posters/track-3.jpg',
    lead: 'Gobierno, gestión de riesgos, arquitectura y respuesta a incidentes sobre escenarios reales.',
    summary: [
      'El objetivo es capacitar a los participantes en los conocimientos fundamentales de gobierno, evaluación de riesgos y prácticas de gestión de ciberseguridad en entornos organizacionales.',
      'El taller se desarrolla con sesiones magistrales dinámicas, laboratorios prácticos y aprendizaje basado en problemas, aplicado sobre escenarios reales en diferentes entornos organizacionales.',
    ],
    tags: ['Gobierno', 'Riesgos', 'Arquitectura', 'Respuesta a incidentes', 'Poscuántica'],
    audience: [
      'Administradores, ingenieros y técnicos responsables del diseño, implementación, mantenimiento y mejora continua de programas de ciberseguridad en instituciones académicas, oficinas de gobierno y empresas de diferentes sectores.',
    ],
    requirements: [
      'Conocimientos básicos de protocolos TCP/IP.',
      'Conocimientos básicos de virtualización y computación en nube.',
      'Administración básica de sistemas operativos (Linux/Windows).',
      'Administración básica de contenedores (Docker).',
    ],
    modules: [
      { title: 'Fundamentos de ciberseguridad', items: ['Conceptos básicos', 'Gobierno y estrategia', 'Modelos de gestión'] },
      {
        title: 'Gestión de riesgos de ciberseguridad',
        items: ['Conceptos básicos', 'Evaluación de riesgos', 'Tratamiento de riesgos', 'Casos de estudio'],
      },
      {
        title: 'Arquitectura de ciberseguridad',
        items: [
          'Consideraciones generales',
          'Gestión de la identidad digital',
          'Desarrollo seguro de aplicaciones',
          'Protección de plataformas tecnológicas',
          'Análisis de escenarios',
        ],
      },
      {
        title: 'Detección y respuesta',
        items: [
          'Conceptos básicos',
          'Monitoreo de exposición a amenazas',
          'Gestión de incidentes de seguridad',
          'Continuidad de operaciones',
          'Casos de estudio',
        ],
      },
      {
        title: 'Tendencias en ciberseguridad',
        items: ['Seguridad de los servicios de IA', 'Criptografía poscuántica (PQC)', 'Ataques a la cadena de suministros'],
      },
    ],
    coordinator: 'Javier Contreras',
    instructors: [
      { name: 'Javier Contreras', org: 'N38 Consulting SAS', place: 'Medellín, Colombia' },
      { name: 'Rayner Durango', org: 'Escuela Superior Politécnica del Litoral, ESPOL', place: 'Ecuador' },
    ],
    seats: 30,
    hours: 40,
    official: `${OFFICIAL}/track-3-ciberseguridad/`,
  },
  {
    n: 4,
    slug: 'iot-machine-learning',
    title: 'IoT Machine Learning',
    lines: ['IoT', 'Machine', 'Learning'],
    modality: 'Presencial',
    color: '#8be03a',
    poster: '/posters/track-4.jpg',
    lead: 'Los componentes de un sistema de Internet de las Cosas y sus aplicaciones, de principio a fin.',
    summary: [
      'Los asistentes obtendrán una visión general sobre los aspectos principales que componen un sistema de Internet de las Cosas (IoT) y sus aplicaciones.',
    ],
    tags: ['IoT', 'Sistemas embebidos', 'Redes', 'GNU/Linux'],
    audience: [
      'Profesionales de las TIC interesados en ampliar sus conocimientos en IoT.',
      'Investigadores y científicos que aspiren a usar tecnologías IoT en sus áreas de trabajo.',
      'Desarrolladores de software que quieran aprender sobre IoT.',
      'Profesionales que trabajan con plataformas de hardware limitadas con software embebido.',
    ],
    requirements: [
      'Conocimientos básicos de redes de computadoras y electrónica.',
      'Conocimientos básicos de sistemas GNU/Linux o Unix.',
      'Conocimientos básicos de programación.',
      'WhatsApp como canal de comunicación durante la semana del taller.',
    ],
    extras: [
      {
        title: 'Material de apoyo',
        body: 'Descarga el libro «Internet de las Cosas», con material didáctico útil para este taller.',
        link: { href: 'http://wireless.ictp.it/Papers/InternetdelasCosas.pdf', label: 'Descargar el libro (PDF)' },
      },
    ],
    coordinator: 'Ronald Criollo',
    instructors: [
      { name: 'Ronald Criollo', org: 'Escuela Superior Politécnica del Litoral, ESPOL', place: 'Guayaquil, Ecuador' },
      { name: 'Ermanno Pietrosemoli', org: 'ICTP', place: 'Trieste, Italia' },
      { name: 'Stalin Arciniegas', org: 'Pontificia Universidad Católica del Ecuador, PUCE', place: 'Ibarra, Ecuador' },
    ],
    seats: 30,
    hours: 40,
    official: `${OFFICIAL}/track-4-iot-machine-learning/`,
  },
  {
    n: 5,
    slug: 'data-science',
    title: 'Data Science',
    lines: ['Data', 'Science'],
    modality: 'Online',
    color: '#3cc4ff',
    poster: '/posters/track-5.jpg',
    lead: 'Del primer análisis exploratorio a tus primeros modelos de machine learning. En línea.',
    summary: [
      'Una semana práctica e introductoria a la ciencia de datos: desde Business Intelligence y la exploración y visualización de datos con Python, hasta los primeros modelos de machine learning supervisado y no supervisado, con una mirada a Big Data.',
    ],
    tags: ['Python', 'Pandas', 'Visualización', 'scikit-learn', 'Big Data'],
    requirements: [
      'Conocimientos básicos de Python.',
      'No se requiere experiencia previa en ciencia de datos ni en estadística.',
    ],
    learn: [
      'Fundamentos de ciencia de datos, Business Intelligence y del flujo de trabajo con datos',
      'Manipulación y análisis de datos con Python (Pandas, NumPy)',
      'Estadística descriptiva básica',
      'Visualización de datos y storytelling',
      'Machine learning supervisado: regresión y clasificación',
      'Machine learning no supervisado: clustering',
      'Nociones conceptuales de Big Data y Deep Learning',
      'Buenas prácticas y ética en ciencia de datos',
    ],
    days: [
      {
        day: 'Lunes',
        title: 'Business Intelligence y Python para Datos',
        theory: [
          '¿Qué es la ciencia de datos?',
          'Business Intelligence',
          'El flujo de trabajo de un proyecto de datos',
          'Repaso de Python, Pandas y NumPy',
        ],
        lab: ['Configuración del entorno (Jupyter/Colab).', 'Primer análisis exploratorio guiado sobre un dataset real.'],
      },
      {
        day: 'Martes',
        title: 'Estadística Descriptiva y Visualización',
        theory: ['Medidas de tendencia central y dispersión', 'Tipos de gráficos y cuándo usarlos', 'Storytelling con datos'],
        lab: ['Construcción de visualizaciones con Matplotlib y Seaborn a partir del dataset del proyecto.'],
      },
      {
        day: 'Miércoles',
        title: 'Machine Learning Supervisado',
        theory: ['¿Qué es un modelo predictivo?', 'Regresión y clasificación', 'Entrenamiento y prueba de un modelo'],
        lab: ['Entrenamiento de un primer modelo de regresión o clasificación con scikit-learn.'],
      },
      {
        day: 'Jueves',
        title: 'Machine Learning No Supervisado',
        theory: ['¿Qué es el aprendizaje no supervisado?', 'Segmentación de datos con clustering (K-Means)'],
        lab: ['Segmentación de datos del proyecto mediante clustering e interpretación de resultados.'],
      },
      {
        day: 'Viernes',
        title: 'Big Data, Buenas Prácticas y Cierre',
        theory: [
          'Introducción a Big Data',
          'Procesamiento de datos a gran escala',
          'Nociones conceptuales de Deep Learning',
          'Ética y buenas prácticas en ciencia de datos',
        ],
        lab: ['Integración final del proyecto y presentación de resultados.'],
      },
    ],
    extras: [
      {
        title: 'Herramientas',
        body: 'Código abierto: Python, Jupyter/Google Colab, Pandas, NumPy, scikit-learn, Matplotlib y Seaborn.',
      },
    ],
    outcomes: [
      'Aplicar Business Intelligence y comprender el flujo de trabajo de un proyecto de ciencia de datos.',
      'Realizar análisis exploratorio de datos con Python.',
      'Aplicar estadística descriptiva básica.',
      'Crear visualizaciones efectivas para comunicar hallazgos.',
      'Entrenar y evaluar un primer modelo de machine learning supervisado.',
      'Aplicar clustering para segmentar datos.',
      'Reconocer los conceptos básicos de Big Data y Deep Learning.',
      'Aplicar buenas prácticas y principios éticos en ciencia de datos.',
    ],
    coordinator: 'Efrén Jiménez',
    instructors: [
      { name: 'Efrén Jiménez', org: 'TEC', place: 'Costa Rica' },
      { name: 'Stalin Arciniegas', org: 'Pontificia Universidad Católica del Ecuador, PUCE', place: 'Ibarra, Ecuador' },
      { name: 'Ronald Criollo', org: 'Escuela Superior Politécnica del Litoral, ESPOL', place: 'Guayaquil, Ecuador' },
      { name: 'Jesús López', org: 'Universidad Autónoma de Occidente', place: 'Cali, Colombia', note: 'Por confirmar' },
    ],
    seats: 30,
    hours: 40,
    official: `${OFFICIAL}/track-5-data-science/`,
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);

/* ------------------------------------------------------------------ */
/* Portada                                                             */
/* ------------------------------------------------------------------ */

export const ticker = [
  '29.ª edición',
  '16 al 20 de noviembre de 2026',
  'Ibarra, Ecuador',
  '5 tracks simultáneos',
  '40 horas por track',
  '30 cupos por track',
  '34 años de trayectoria',
  '4 presenciales + 1 online',
  'Universidad Técnica del Norte',
];

export const stats = [
  { value: '29', unit: '.ª', label: 'Edición del taller', note: 'Activo desde 1992' },
  { value: '34', unit: '', label: 'Años formando a la región', note: 'Trayectoria académica ininterrumpida' },
  { value: '5', unit: '', label: 'Tracks simultáneos', note: '4 presenciales, 1 online' },
  { value: '40', unit: 'h', label: 'De formación por track', note: 'Lunes a viernes' },
  { value: '30', unit: '', label: 'Cupos por track', note: 'Grupos pequeños, trabajo práctico' },
  { value: '9', unit: '', label: 'Instructores', note: 'De cinco países' },
];

export const purposes = [
  {
    title: 'Capacitación regional',
    body: 'Formar a técnicos y profesionales de América Latina y el Caribe en TIC, con un enfoque netamente práctico centrado en redes, proyectos tecnológicos y los desarrollos más recientes del sector.',
  },
  {
    title: 'Vínculos estratégicos',
    body: 'Identificar y establecer lazos individuales e institucionales que impulsen proyectos cooperativos de alcance nacional o regional.',
  },
  {
    title: 'Desarrollo del talento',
    body: 'Aprovechar el potencial de las TIC para fortalecer las competencias del capital humano y fomentar la innovación tecnológica en toda la región.',
  },
];

export const steps = [
  {
    title: 'Elige un track',
    body: 'Los cinco talleres ocurren al mismo tiempo, así que solo puedes participar en uno. Revisa los programas y decide.',
    cta: { href: '/#tracks', label: 'Ver los tracks' },
  },
  {
    title: 'Pre-inscríbete',
    body: 'Completa el formulario oficial una sola vez. En los tres días siguientes recibirás un correo de acuse de recibo.',
    cta: { href: event.links.preinscripcion, label: 'Ir al formulario', external: true },
  },
  {
    title: 'Formaliza tu matrícula',
    body: 'Realiza el pago según tu categoría y asegura tu cupo: hay 30 lugares por track.',
    cta: { href: '/matricula/', label: 'Ver matrícula y pago' },
  },
];

export const faqs = [
  {
    q: '¿Puedo tomar más de un track?',
    a: 'No. Los cinco tracks se dictan de manera simultánea durante la misma semana, por lo que solo puedes pre-inscribirte y participar en uno.',
  },
  {
    q: '¿Cuánto cuesta la matrícula?',
    a: 'US$ 200 la tarifa general, US$ 100 para becados de fuera de la ciudad de Ibarra y US$ 70 para estudiantes de la Universidad Técnica del Norte.',
  },
  {
    q: '¿Qué incluye?',
    a: 'La participación en el taller que elijas, el material de apoyo y el certificado de participación. No incluye alojamiento, alimentación, traslados, seguros ni pasajes.',
  },
  {
    q: '¿Hay becas?',
    a: 'Sí, pero en número muy limitado. Subvencionan media matrícula y, en casos excepcionales, la matrícula completa.',
  },
  {
    q: '¿Necesito experiencia previa en inteligencia artificial?',
    a: 'No para los tracks 1, 2 y 5: basta con conocimientos básicos de Python. Ciberseguridad e IoT piden bases de redes y sistemas; cada track detalla sus requisitos.',
  },
  {
    q: '¿Cómo sé que recibieron mi pre-inscripción?',
    a: 'Recibirás un correo de acuse de recibo dentro de los tres días siguientes. Si no llega, escribe a walc.eslared@gmail.com.',
  },
  {
    q: '¿El track online tiene la misma carga horaria?',
    a: 'Sí. Data Science se dicta en línea durante la misma semana, con 40 horas y 30 cupos, igual que los tracks presenciales.',
  },
];

export const organizers = [
  {
    name: 'ESLARED',
    full: 'Fundación Escuela Latinoamericana de Redes',
    role: 'Organización general',
    href: 'https://eslared.net/',
    logo: `${OFFICIAL}/wp-content/uploads/2026/07/LOGOS-ESLARED-1-300x278.png`,
  },
  {
    name: 'UTN',
    full: 'Universidad Técnica del Norte',
    role: 'Institución anfitriona',
    href: 'https://www.utn.edu.ec/',
    logo: `${OFFICIAL}/wp-content/uploads/2026/07/logo-UTN-300x295.png`,
  },
];

export const sponsors = [
  { name: 'EDGE AI Foundation', role: 'Patrocinador internacional', href: 'https://www.edgeaifoundation.org/' },
  { name: 'AIEng4D', role: 'Patrocinador internacional', href: '' },
];

/* ------------------------------------------------------------------ */
/* Sede                                                                */
/* ------------------------------------------------------------------ */

const up = `${OFFICIAL}/wp-content/uploads/2026/07`;

export const venue = {
  heroPhoto: `${up}/banner1_vistalaguna_walc2026-scaled.jpg`,
  ecuador: [
    'Ecuador es un destino único donde la naturaleza, la cultura y la aventura se unen en un solo lugar. En un territorio compacto es posible recorrer playas del océano Pacífico, imponentes volcanes andinos, exuberantes bosques amazónicos y las mundialmente famosas Islas Galápagos.',
    'Cada región ofrece experiencias inolvidables: ciudades patrimoniales, mercados tradicionales, gastronomía de primer nivel, paisajes espectaculares y una cálida hospitalidad.',
  ],
  ibarra: [
    'Ubicada al norte del Ecuador, Ibarra cautiva con su arquitectura colonial, calles amplias y paisajes andinos. Conocida como la Ciudad Blanca, destaca por su agradable clima, su rica tradición cultural y la calidez de su gente.',
    'A pocos minutos se encuentran la Laguna de Yahuarcocha, el volcán Imbabura y pueblos artesanales como Otavalo y Cotacachi. Y su gastronomía, encabezada por los tradicionales helados de paila, es una experiencia en sí misma.',
  ],
  photos: [
    { src: `${up}/4.-IBARRA-volcan-imbabura-scaled-1000x750.jpg`, alt: 'Volcán Imbabura visto desde Ibarra' },
    { src: `${up}/4.-IBARRA.-Iglesia-1000x750.jpg`, alt: 'Iglesia en el centro de Ibarra' },
    { src: `${up}/4.-IBARRA.-VISTA-CAMPUS-HOSPITAL-VIEJO-UTN-scaled-1000x750.png`, alt: 'Campus de la Universidad Técnica del Norte' },
  ],
  sites: [
    {
      name: 'Centro Histórico de Ibarra',
      distance: 'En la ciudad',
      body: 'El casco colonial revive el renacer de la urbe tras el terremoto de 1868. El Parque Pedro Moncayo y el Centro Cultural El Cuartel son paradas obligatorias.',
      points: [
        'El antiguo cuartel militar es hoy un complejo con salas de exposición, talleres y muestras históricas.',
        'Helados de paila hechos a mano en vasijas de bronce, arrope de mora y nogadas.',
      ],
      photo: `${up}/Centro-historico-de-ibarra-e1782900526153.jpg`,
    },
    {
      name: 'Laguna de Yahuarcocha',
      distance: 'A minutos del centro',
      body: 'El principal icono turístico y natural del cantón, rodeado de montañas y de leyendas históricas preincas.',
      points: [
        'Autódromo Internacional José Tobar Tobar, escenario de competencias nacionales e internacionales.',
        'Paseos en bote o kayak, senderos para caminar o pedalear, y tilapia frita como plato estrella.',
      ],
      photo: `${up}/Laguna-de-Yahuarcocha-1024x768.jpg`,
    },
    {
      name: 'San Antonio de Ibarra',
      distance: 'A 10 minutos',
      body: 'Reconocida internacionalmente por el talento de sus artesanos y sus esculturas en madera.',
      points: [
        'Calles y plazas llenas de talleres: del arte sacro clásico al arte contemporáneo.',
        'Una técnica declarada Patrimonio Cultural Inmaterial del Ecuador.',
      ],
      photo: `${up}/San-Antonio-de-Ibarra-e1782901145275.jpg`,
    },
  ],
};
