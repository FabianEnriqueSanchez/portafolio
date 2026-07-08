# Portafolio

Portafolio personal construido con **Astro** y desplegado en **GitHub Pages**.
Incluye presentación, sección "sobre mí", proyectos demo y documentación
técnica navegable, con modo claro/oscuro y diseño responsive.

## 🚀 Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # servidor local en http://localhost:4321
npm run build    # construir el sitio en ./dist/
npm run preview  # previsualizar la build
```

## ✏️ Cómo personalizarlo

Casi todo se edita desde **un solo archivo**:

- **`src/data/site.ts`** — tu nombre, rol, frase, contacto, redes, stack y la
  lista de proyectos. Los componentes leen de aquí; no necesitas tocar el HTML.

Otros puntos de personalización:

| Quiero cambiar...        | Archivo                                            |
| ------------------------ | -------------------------------------------------- |
| Datos personales / proyectos | `src/data/site.ts`                             |
| Colores / tipografía     | `src/styles/global.css` (tokens `:root`)           |
| Documentación de proyectos | `src/content/docs/*.md` (un `.md` por proyecto)  |
| Tu CV en PDF             | coloca `cv.pdf` en `public/`                       |
| Favicon                  | `public/favicon.svg`                               |

### Añadir un documento

1. Crea `src/content/docs/mi-proyecto.md` con este encabezado:
   ```yaml
   ---
   titulo: "Mi proyecto"
   descripcion: "Descripción corta."
   actualizado: "2026-06-14"
   orden: 3
   ---
   ## Contenido en Markdown...
   ```
2. En `src/data/site.ts`, pon `doc: "mi-proyecto"` en el proyecto para enlazarlo.

## 🌐 Despliegue en GitHub Pages

1. Edita `SITE` y `BASE` en `astro.config.mjs`:
   - Repo de proyecto (`github.com/usuario/portafolio`):
     `SITE='https://usuario.github.io'`, `BASE='/portafolio'`
   - Repo de usuario (`usuario.github.io`):
     `SITE='https://usuario.github.io'`, `BASE='/'`
2. Sube el código a GitHub (rama `main`).
3. En GitHub: **Settings → Pages → Source → GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` construye y publica en cada push.

## 🧱 Estructura

```text
src/
├── components/        # Header, Hero, About, Projects, Contact, Footer
├── content/docs/      # documentación en Markdown (colección de Astro)
├── data/site.ts       # ← datos editables del portafolio
├── layouts/           # BaseLayout (head, SEO, tema)
├── lib/utils.ts       # helper de rutas con base
├── pages/             # index.astro y /docs
└── styles/global.css  # sistema de diseño (tokens, base)
```

## 🛠️ Herramientas de IA del proyecto

Este repositorio está configurado con herramientas para Claude Code
(ver `HERRAMIENTAS.md` para el detalle): OpenSpec, impeccable, agentes de
aitmpl, Grill Me y GBrain.

---

Construido con [Astro](https://astro.build).
