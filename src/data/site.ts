// ============================================================
//  DATOS DEL PORTAFOLIO
//  El contenido vive en src/data/site.json y puede editarse a
//  mano o desde el panel de administración (/admin).
//  Este módulo solo tipa y reexporta ese JSON para los
//  componentes; no dupliques datos aquí.
// ============================================================
import data from "./site.json";

export type Proyecto = {
  slug: string;
  titulo: string;
  descripcion: string;
  tags: string[];
  /** Ruta interna ("/demos/...") o URL externa. "" oculta el botón. */
  demo: string;
  /** URL del repositorio. "" oculta el botón (p. ej. código privado de empresa). */
  repo: string;
  /** Slug del documento en src/content/docs. "" si no tiene documentación. */
  doc: string;
  año: string;
  destacado: boolean;
};

export type Experiencia = {
  puesto: string;
  empresa: string;
  periodo: string;
  puntos: string[];
};

export type Educacion = {
  titulo: string;
  institucion: string;
  periodo: string;
};

export type Certificacion = {
  nombre: string;
  entidad: string;
  año: string;
};

export type Idioma = { idioma: string; nivel: string };

export type EnlaceNavegacion = { texto: string; href: string };

export type PlantillaCV = "moderna" | "clasica" | "compacta";

export type ConfigCV = {
  /** Plantilla activa que se sirve en /cv. */
  plantilla: PlantillaCV;
  /** Si se define (p. ej. "cv.pdf"), el botón "Descargar CV" usa ese archivo de /public. */
  archivoEstatico: string;
  /** Resumen profesional específico para la hoja de vida. */
  perfilProfesional: string;
};

export const PLANTILLAS_CV: PlantillaCV[] = ["moderna", "clasica", "compacta"];

export const perfil = data.perfil;
export const sobreMi = data.sobreMi;
export const proyectos: Proyecto[] = data.proyectos;
export const experiencia: Experiencia[] = data.experiencia;
export const educacion: Educacion[] = data.educacion;
export const certificaciones: Certificacion[] = data.certificaciones;
export const idiomas: Idioma[] = data.idiomas;
export const navegacion: EnlaceNavegacion[] = data.navegacion;
export const cv: ConfigCV = data.cv as ConfigCV;

export type ConfigContacto = {
  /** Access Key pública de Web3Forms (segura para código cliente). */
  web3formsKey: string;
  /** Asunto por defecto del formulario de contacto. */
  asuntoDefecto: string;
};
export const contacto: ConfigContacto = data.contacto as ConfigContacto;

export const admin = data.admin;
