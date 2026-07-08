// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// ─────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE DESPLIEGUE (GitHub Pages)
//
// Caso 1 — Repositorio de proyecto (ej. github.com/usuario/portafolio):
//   site: 'https://usuario.github.io'   base: '/portafolio'
//
// Caso 2 — Repositorio de usuario (github.com/usuario/usuario.github.io):
//   site: 'https://usuario.github.io'   base: '/'
// ─────────────────────────────────────────────────────────────────────────
const SITE = "https://fabianenriquesanchez.github.io";
const BASE = "/portafolio";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  // GitHub Pages sirve directorios con barra final; enlazar y canonicalizar
  // siempre con barra evita redirects 301 y URLs duplicadas.
  trailingSlash: "always",
  // Pre-carga los enlaces internos visibles: la navegación index ↔ docs ↔ demos
  // se siente instantánea.
  prefetch: { prefetchAll: true },
  build: {
    // GitHub Pages cachea los assets solo 10 minutos; con el CSS inline se
    // elimina esa petición render-blocking en cada visita.
    inlineStylesheets: "always",
  },
  integrations: [
    sitemap({
      // El admin y las vistas previas del CV llevan noindex: fuera del sitemap.
      filter: (page) =>
        !page.includes("/admin/") &&
        !/\/cv\/(moderna|clasica|compacta)\//.test(page),
    }),
  ],
});
