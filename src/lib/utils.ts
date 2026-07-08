// Construye una URL respetando el `base` configurado para GitHub Pages.
// Ej: withBase("docs") -> "/portafolio/docs"
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.replace(/^\//, "");
  return clean ? `${base}/${clean}` : `${base}/`;
}
