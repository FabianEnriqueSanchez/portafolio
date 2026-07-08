# Herramientas de IA instaladas

Resumen de las librerías/configuraciones para Claude Code que se instalaron en
este proyecto y cómo usarlas.

## 1. OpenSpec — desarrollo guiado por especificaciones

Acuerdas *qué* construir antes de escribir código. Crea propuestas de cambio
revisables en la carpeta `openspec/`.

- **Estructura:** `openspec/changes/` y `openspec/specs/`
- **Comandos (en Claude Code):**
  - `/opsx:propose "tu idea"` — crear una propuesta de cambio
  - `/opsx:apply` — aplicar el cambio aprobado
  - `/opsx:archive` — archivar al terminar
- **Actualizar:** `openspec update`

## 2. impeccable — calidad de diseño de la UI

Detecta 41 errores típicos de UIs generadas por IA (gradientes morados, glows,
padding apretado, contraste bajo, etc.).

- **Escanear desde la terminal:**
  ```bash
  npx impeccable detect dist/index.html
  npx impeccable detect "src/**/*.astro"
  ```
- **Configurar contexto de diseño (en Claude Code):** `/impeccable init`
  (escribe `PRODUCT.md` con tu marca, voz, colores y tipografía).
- **Comandos de diseño:** `/impeccable polish`, `/impeccable audit`,
  `/impeccable critique`, etc.

> El sitio actual pasa el detector **sin anti-patrones**.

## 3. Agentes de aitmpl (Claude Code Templates)

Agentes especializados instalados en `.claude/agents/`:

| Agente               | Para qué sirve                                |
| -------------------- | --------------------------------------------- |
| `frontend-developer` | Desarrollo de interfaz y componentes          |
| `ui-ux-designer`     | Diseño de experiencia e interfaz              |
| `accessibility`      | Revisión de accesibilidad (WCAG)              |
| `seo-analyzer`       | Optimización para buscadores                  |
| `technical-writer`   | Redacción de documentación técnica            |

Instalar más componentes:
```bash
npx claude-code-templates@latest --agent "categoria/nombre" --yes
```

## 4. Grill Me — entrevista socrática para planear

Plugin que convierte a Claude en un entrevistador que te hace preguntas para
sacar requisitos y planear mejor antes de construir.

- Instalado como plugin de usuario (`grillme@grillme-marketplace`).
- Úsalo cuando quieras refinar el contenido o el alcance de un proyecto.

## 5. GBrain — memoria de largo plazo para agentes

Capa de memoria local (Postgres embebido con PGLite) más servidor MCP, para que
los agentes recuerden contexto entre sesiones.

- **Base local:** `C:\Users\PC\.gbrain` (esquema v117, ya migrado)
- **MCP conectado** a Claude Code (`gbrain serve`)
- **Salud:** `gbrain doctor`

⚠️ **Pendiente (opcional):** la búsqueda semántica requiere una clave de
embeddings. Para activarla:

```powershell
# Opción A (OpenAI)
setx OPENAI_API_KEY "tu-clave"
# Opción B (ZeroEntropy)
setx ZEROENTROPY_API_KEY "tu-clave"
# luego, en una terminal nueva:
gbrain embed --stale
```

Sin clave, GBrain funciona igual pero sin búsqueda por similitud semántica.

> Nota: el ejecutable `bun` y `gbrain` se añadieron al PATH del usuario
> (`C:\Users\PC\.bun\bin`). Si abres una terminal nueva y no se encuentran,
> reinicia la terminal para recargar el PATH.
