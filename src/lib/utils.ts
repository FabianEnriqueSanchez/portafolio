// Construye una URL respetando el `base` configurado para GitHub Pages.
// Las rutas de página reciben barra final automática (GitHub Pages responde
// con un redirect 301 a la versión con barra; enlazarla directa lo evita).
// Ej: withBase("docs") -> "/portafolio/docs/"
//     withBase("og.png") -> "/portafolio/og.png"
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.replace(/^\//, "");
  if (!clean) return `${base}/`;
  const ultimoSegmento = clean.split("/").pop() ?? "";
  const esArchivo = ultimoSegmento.includes(".");
  const llevaBarra = clean.endsWith("/") || esArchivo;
  return `${base}/${clean}${llevaBarra ? "" : "/"}`;
}
