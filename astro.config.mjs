// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ─────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN DE DESPLIEGUE (GitHub Pages)
//
// Caso 1 — Repositorio de proyecto (ej. github.com/usuario/portafolio):
//   site: 'https://usuario.github.io'   base: '/portafolio'
//
// Caso 2 — Repositorio de usuario (github.com/usuario/usuario.github.io):
//   site: 'https://usuario.github.io'   base: '/'
//
// 👉 Ajusta SITE y BASE con tu usuario/repositorio real de GitHub.
// ─────────────────────────────────────────────────────────────────────────
const SITE = 'https://fabianenriquesanchez.github.io';
const BASE = '/portafolio';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
