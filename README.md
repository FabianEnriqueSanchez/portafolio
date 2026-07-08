# Portafolio

Portafolio personal construido con **Astro** y desplegado en **GitHub Pages**.
Incluye presentación, sección "sobre mí", experiencia, proyectos con **demos
interactivas**, documentación técnica navegable, **hoja de vida imprimible con
plantillas** y un **panel de administración** para editar todo el contenido
sin tocar código. Modo claro/oscuro y diseño responsive.

## 🚀 Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # servidor local en http://localhost:4321/portafolio/
npm run build    # construir el sitio en ./dist/ (genera también og.png)
npm run preview  # previsualizar la build
npm run check    # verificar tipos y componentes (astro check)
npm run format   # formatear con Prettier
```

## ✏️ Cómo editar el contenido

Todo el contenido vive en **un solo archivo**: `src/data/site.json`
(nombre, rol, contacto, redes, stack, proyectos, experiencia, formación,
certificaciones, idiomas, navegación y configuración del CV).

Hay dos maneras de editarlo:

1. **Panel de administración** — abre `/admin` en el sitio publicado (o en
   `npm run dev`). Pega un token _fine-grained_ de GitHub (permiso
   **Contents: Read and write** solo sobre este repositorio) y podrás editar
   y publicar cualquier sección; cada guardado hace un commit y GitHub
   Actions reconstruye el sitio en ~2 minutos.
2. **A mano** — edita `src/data/site.json` y haz commit. `src/data/site.ts`
   solo tipa y reexporta ese JSON; no dupliques datos ahí.

Otros puntos de personalización:

| Quiero cambiar...              | Archivo                                                 |
| ------------------------------ | ------------------------------------------------------- |
| Datos personales / proyectos   | `src/data/site.json` (o el panel `/admin`)              |
| Colores / tipografía           | `src/styles/global.css` (tokens `:root`)                |
| Documentación de proyectos     | `src/content/docs/*.md` (un `.md` por proyecto)         |
| Plantilla de la hoja de vida   | clave `cv.plantilla` en `site.json` (o `/admin`)        |
| Imagen para redes (Open Graph) | se genera sola en cada build (`scripts/generar-og.mjs`) |
| Favicon                        | `public/favicon.svg`                                    |

## 📄 Hoja de vida (CV)

- `/cv/` muestra la hoja de vida generada desde los datos del sitio con la
  plantilla activa (`moderna`, `clasica` o `compacta`) y un botón
  **Descargar PDF** (imprime a PDF con estilos optimizados para A4).
- `/cv/<plantilla>/` sirve la vista previa de cada plantilla (enlazadas desde
  el admin).
- Si prefieres servir un PDF estático, coloca el archivo en `public/` y pon su
  nombre en `cv.archivoEstatico` (p. ej. `"cv.pdf"`).

## 🧪 Demos interactivas

Cada proyecto tiene una demo 100% en el navegador (sin backend):

- `/demos/sistema-control/` — panel de control estilo SCADA que simula el
  sistema Java + Arduino (sensores, umbrales, relés y monitor serie).
- `/demos/apis-datos/` — explorador de API REST con servidor simulado
  (endpoints, autenticación por token, validación y respuestas JSON).
- `/demos/automatizacion-procesos/` — recorrido animado de una solicitud por
  un flujo de aprobación estilo Power Automate.

### Añadir un documento

1. Crea `src/content/docs/mi-proyecto.md` con este encabezado:
   ```yaml
   ---
   titulo: "Mi proyecto"
   descripcion: "Descripción corta."
   actualizado: "2026-07-07"
   orden: 4
   ---
   ```
2. En `src/data/site.json`, pon `"doc": "mi-proyecto"` en el proyecto para
   enlazarlo.

## 🌐 Despliegue en GitHub Pages

1. Edita `SITE` y `BASE` en `astro.config.mjs` si tu usuario/repo cambian:
   - Repo de proyecto (`github.com/usuario/portafolio`):
     `SITE='https://usuario.github.io'`, `BASE='/portafolio'`
   - Repo de usuario (`usuario.github.io`):
     `SITE='https://usuario.github.io'`, `BASE='/'`
2. Sube el código a GitHub (rama `main`).
3. En GitHub: **Settings → Pages → Source → GitHub Actions**.
4. `.github/workflows/deploy.yml` verifica (`astro check`), construye y
   publica en cada push a `main`; `.github/workflows/ci.yml` valida los
   pull requests.

## 🧱 Estructura

```text
src/
├── components/        # Header, Hero, About, Experience, Projects, Contact, Footer
│   └── cv/            # plantillas de la hoja de vida
├── content/docs/      # documentación en Markdown (colección de Astro)
├── data/site.json     # ← contenido editable del portafolio (admin)
├── data/site.ts       # tipos + reexport del JSON
├── layouts/           # BaseLayout (head, SEO, tema) y CvLayout (impresión)
├── lib/utils.ts       # helper de rutas con base
├── pages/             # index, /docs, /cv, /demos/*, /admin, 404
└── styles/global.css  # sistema de diseño (tokens, base)
scripts/
└── generar-og.mjs     # genera og.png y apple-touch-icon.png en cada build
```

## 🛠️ Herramientas de IA del proyecto

Este repositorio está configurado con herramientas para Claude Code
(ver `HERRAMIENTAS.md` para el detalle): OpenSpec, impeccable, agentes de
aitmpl, Grill Me y GBrain.

---

Construido con [Astro](https://astro.build).
