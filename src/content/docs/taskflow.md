---
titulo: "TaskFlow — Plataforma de gestión de tareas y proyectos"
descripcion: "Espacio de trabajo colaborativo self-hosted para equipos: jerarquía de proyectos, múltiples vistas, automatizaciones y SSO corporativo."
actualizado: "2026-09-22"
orden: 2
---

## Visión general

**TaskFlow** es una plataforma interna de gestión de tareas y proyectos entre
equipos, concebida como un reemplazo _self-hosted_ de herramientas comerciales
tipo ClickUp o Asana: sin costo por licencia y con acceso para toda la compañía.
Cubre el ciclo completo del trabajo —planificación, ejecución, seguimiento y
reporte— sobre una jerarquía que va del espacio de trabajo hasta la subtarea.

El código es propiedad de la empresa, por lo que este documento describe la
arquitectura y las decisiones técnicas en lugar del código fuente.

## Arquitectura

```text
                     [ Reverse proxy (Nginx/Caddy + HTTPS) ]
                                      │
                        ┌─────────────┴─────────────┐
                 [ Next.js 15 — App Router ]   [ Microsoft Entra ID ]
                 React 19 · Server Actions      SSO Microsoft 365
                 Motor de automatizaciones
                 Canal SSE (tiempo real)
                                │
              ┌─────────────────┼──────────────────┐
        [ PostgreSQL 16 ]  [ Almacenamiento ]  [ SMTP ]
          Prisma ORM        local o S3        notificaciones
```

Toda la aplicación corre en un único proceso Next.js con **Server Actions** como
capa de dominio, lo que evita mantener una API REST paralela. Las rutas de `api/`
quedan reservadas para lo que sí necesita ser un endpoint: autenticación,
_health check_ y el canal de tiempo real (SSE).

## Componentes

| Componente              | Descripción                                                    | Tecnología                                    |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------- |
| Aplicación web          | UI completa y lógica de dominio en Server Actions              | Next.js 15 (App Router), React 19, TypeScript |
| Modelo de datos         | 57 modelos: jerarquía, campos, vistas, flujos, auditoría       | PostgreSQL 16, Prisma ORM                     |
| Autenticación           | SSO corporativo con auto-aprovisionamiento por dominio         | Auth.js (NextAuth v5), Microsoft Entra ID     |
| Motor de automatización | Disparador → condiciones → acciones, con registro y anti-bucle | TypeScript, planificador propio               |
| Tiempo real             | Notificaciones y actualizaciones en vivo                       | Server-Sent Events (SSE)                      |
| Interfaz                | Componentes propios, tema claro/oscuro, UI en español          | Tailwind CSS                                  |
| Infraestructura         | Imagen multi-stage y orquestación portable de local a AWS EC2  | Docker, Docker Compose                        |

## Funcionalidades

- **Jerarquía completa:** Espacio de trabajo → Espacios → Carpetas → Listas →
  Tareas → Subtareas, con espacios privados y permisos por recurso.
- **Tareas ricas:** estados configurables, prioridades, asignados, observadores,
  fechas, estimaciones, etiquetas, checklists, dependencias, comentarios con
  @menciones y reacciones, adjuntos, recurrencia y _time tracking_.
- **Campos personalizados:** texto, número, moneda, desplegable, fecha, personas,
  email, teléfono, URL, progreso, archivos, relación, ubicación y —los dos más
  exigentes— **fórmulas** (campos calculados) y **rollups** sobre subtareas.
- **Más de 6 vistas:** Lista, Tablero Kanban con _drag & drop_, Tabla tipo hoja de
  cálculo, Calendario, Gantt, Timeline y Carga de trabajo, con agrupación,
  filtros, orden y vistas guardadas.
- **Automatizaciones:** 15 disparadores y 16 acciones combinables, con historial
  de ejecuciones y protección contra bucles.
- **Formularios públicos:** constructor de formularios que crean tareas de forma
  automática desde un enlace compartible, sin necesidad de iniciar sesión.
- **Administración:** usuarios, roles, equipos, capacidad, estadísticas y
  auditoría; búsqueda global, "Mi trabajo", favoritos y papelera con _soft-delete_.

## Seguridad y control de acceso

- **SSO con Microsoft 365** (Entra ID) mediante Auth.js; el login con contraseña
  queda restringido a desarrollo y se desactiva en producción.
- **Auto-aprovisionamiento acotado:** solo los correos del dominio autorizado
  pueden crear cuenta, y siempre con el rol mínimo (_Member_).
- **Roles globales** (Owner, Admin, Manager, Member, Guest) combinados con
  **permisos por recurso** a nivel de espacio, carpeta y lista.
- **Registro de actividad** sobre las operaciones del dominio, con papelera y
  borrado lógico para poder revertir errores.

## Decisiones técnicas

- **Server Actions en lugar de una API REST:** al ser una aplicación interna con
  un único cliente, mantener endpoints y tipos duplicados no aportaba nada.
  El tipado extremo a extremo reduce toda una clase de errores de integración.
- **Prisma sobre PostgreSQL:** el modelo tiene 57 entidades muy relacionadas
  (campos calculados, dependencias, flujos de trabajo versionados); las
  migraciones declarativas y el tipado generado hacen sostenible esa complejidad.
- **SSE en vez de WebSockets:** las actualizaciones viajan del servidor al
  cliente, no al revés, así que un canal unidireccional cubre el caso con mucha
  menos infraestructura.
- **Almacenamiento conmutable:** los adjuntos usan un volumen local o S3 según la
  configuración, de modo que el mismo despliegue sirve en una máquina de
  pruebas y en AWS.

## Resultados

- Eliminación del costo por licencia de una herramienta comercial, con acceso
  para toda la compañía en lugar de unos pocos asientos pagos.
- Un único lugar donde vive el trabajo de los equipos, en español y con los
  procesos propios de la empresa modelados en automatizaciones y flujos.
- Despliegue portable: el mismo `docker compose` levanta el entorno local y el
  servidor de producción en AWS EC2.
