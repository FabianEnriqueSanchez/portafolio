// ============================================================
//  DATOS DEL PORTAFOLIO
//  Edita este archivo para personalizar todo el sitio.
//  No necesitas tocar el HTML: los componentes leen de aquí.
// ============================================================

export const perfil = {
  nombre: "Fabián Enrique Sánchez Solano",
  // Rol / título corto que aparece bajo tu nombre
  rol: "Analista de Sistemas y Desarrollador de TI",
  // Frase potente del hero (1-2 líneas)
  titular:
    "Desarrollo software, automatizo procesos y construyo APIs que mejoran la productividad de las empresas.",
  // Subtítulo del hero
  resumen:
    "Más de 3 años de experiencia en desarrollo backend y frontend, automatización de procesos y soporte técnico. Trabajo con Python, Java, JavaScript y Vue.js, integración de APIs REST, AWS y metodologías ágiles Scrum.",
  ubicacion: "Santander, Colombia",
  email: "fabienrisanchez@gmail.com",
  telefono: "+57 302 262 4361",
  // Enlaces sociales (deja vacío "" los que no uses)
  social: {
    github: "https://github.com/FabianEnriqueSanchez",
    // 👉 Pon aquí tu perfil real de LinkedIn (o déjalo "" para ocultarlo)
    linkedin: "",
    twitter: "",
    // Ruta a tu CV en PDF dentro de /public
    cv: "/cv.pdf",
  },
};

// Bloque "Sobre mí"
export const sobreMi = {
  parrafos: [
    "Soy Analista de Sistemas y Desarrollador de TI con más de 3 años de experiencia. Me especializo en backend, frontend y bases de datos, y disfruto convertir necesidades del negocio en software fiable que genera impacto real en la productividad.",
    "Actualmente lidero el área de desarrollo en Grupo Ardisa, donde construyo APIs, automatizo procesos internos y doy soporte técnico avanzado. Me destaco por la resolución de problemas, la optimización de procesos y el trabajo en equipo bajo metodología Scrum.",
  ],
  // Tu stack — se muestran como etiquetas
  stack: [
    "Python",
    "JavaScript",
    "Java",
    "Vue.js",
    "SQL / MySQL",
    "APIs REST",
    "AWS (EC2)",
    "Git",
    "Power Automate",
    "Power Apps",
    "Scrum",
    "Análisis de datos",
  ],
};

export type Proyecto = {
  slug: string; // identificador único (también enlaza a su documentación)
  titulo: string;
  descripcion: string;
  // Etiquetas de tecnología
  tags: string[];
  // Enlaces (deja "" para ocultar el botón)
  demo: string;
  repo: string;
  // Si tiene documentación en /docs, pon el slug del doc; si no, ""
  doc: string;
  // Año o estado
  año: string;
  // Destacado: aparece más grande en la cuadrícula
  destacado?: boolean;
};

export const proyectos: Proyecto[] = [
  {
    slug: "sistema-control",
    titulo: "Sistema de control con Java y Arduino",
    descripcion:
      "Sistema de control que integra software en Java con hardware Arduino para automatizar y optimizar procesos operativos internos.",
    tags: ["Java", "Arduino", "IoT", "Automatización"],
    demo: "",
    repo: "https://github.com/FabianEnriqueSanchez",
    doc: "sistema-control",
    año: "2024",
    destacado: true,
  },
  {
    slug: "apis-datos",
    titulo: "APIs y servidores de gestión de datos",
    descripcion:
      "Desarrollo de APIs REST y servidores para la integración y gestión de datos empresariales, base de varias automatizaciones internas.",
    tags: ["Python", "API REST", "MySQL", "AWS EC2"],
    demo: "",
    repo: "https://github.com/FabianEnriqueSanchez",
    doc: "apis-datos",
    año: "2023",
  },
  {
    slug: "automatizacion-procesos",
    titulo: "Automatización de procesos internos",
    descripcion:
      "Formularios y flujos automatizados con Power Automate y Power Apps que redujeron tiempos de soporte y optimizaron procesos del negocio.",
    tags: ["Power Automate", "Power Apps", "Scrum"],
    demo: "",
    repo: "",
    doc: "",
    año: "2023",
  },
];

// Experiencia laboral
export const experiencia = [
  {
    puesto: "Analista de TI",
    empresa: "Grupo Ardisa",
    periodo: "Abril 2022 – Actualidad",
    puntos: [
      "Liderazgo del área de desarrollo, con responsabilidad en backend y frontend.",
      "Desarrollo de automatizaciones y formularios que optimizaron procesos internos.",
      "Soporte técnico avanzado en sistemas SAP, Google y Microsoft.",
      "Implementación de un sistema de control con Java y Arduino para mejorar la eficiencia operativa.",
      "Desarrollo de APIs y servidores para integración y gestión de datos empresariales.",
    ],
  },
  {
    puesto: "Aprendiz Técnico en Sistemas",
    empresa: "Clínica Chicamocha (SENA)",
    periodo: "Octubre 2021 – Febrero 2022",
    puntos: [
      "Mantenimiento preventivo y correctivo de equipos de cómputo.",
      "Soporte técnico presencial y remoto en conectividad, plataformas y herramientas digitales.",
    ],
  },
];

// Formación académica
export const educacion = [
  {
    titulo: "Tecnología en Análisis y Desarrollo de Software",
    institucion: "SENA",
    periodo: "En curso",
  },
  {
    titulo: "Técnico en Bases de Datos: Generalidades y Sistemas de Gestión",
    institucion: "SENA",
    periodo: "2021",
  },
];

// Cursos y certificaciones
export const certificaciones = [
  {
    nombre: "Python de cero a experto",
    entidad: "Fundación Universitaria Comfenalco Santander",
    año: "2025",
  },
  {
    nombre: "Metodología Scrum",
    entidad: "Cámara de Comercio Proyecta",
    año: "2024",
  },
  {
    nombre: "Programación y manejo del Internet de las Cosas (IoT)",
    entidad: "SENA",
    año: "2020",
  },
];

// Idiomas
export const idiomas = [
  { idioma: "Español", nivel: "Nativo" },
  { idioma: "Inglés", nivel: "Intermedio" },
];

// Navegación principal
export const navegacion = [
  { texto: "Inicio", href: "#inicio" },
  { texto: "Sobre mí", href: "#sobre-mi" },
  { texto: "Experiencia", href: "#experiencia" },
  { texto: "Proyectos", href: "#proyectos" },
  { texto: "Documentación", href: "/docs" },
  { texto: "Contacto", href: "#contacto" },
];
