---
titulo: "SIGAF — Sistema Integral de Gestión de Activos Fijos"
descripcion: "PWA para el control de activos fijos: entregas, devoluciones, documentos firmados y evidencia fotográfica en SharePoint."
actualizado: "2026-09-22"
orden: 3
---

## Visión general

**SIGAF** es una aplicación web progresiva (PWA) desarrollada para **ARDISA SA**
que gestiona el ciclo de vida de los activos fijos de la compañía: qué equipo
tiene asignado cada persona, cómo se entrega, cómo se devuelve y qué respaldo
documental queda de cada movimiento.

El proceso que automatiza era antes manual y en papel: un acta de entrega
impresa, firmada, escaneada y archivada en algún lugar. SIGAF lo convierte en un
flujo trazable —documento generado, firmado, fotografiado y almacenado— con
notificaciones, auditoría y un panel de control sobre el estado del inventario.

El código es propiedad de la empresa, por lo que este documento describe la
arquitectura y las decisiones técnicas.

## Arquitectura

```text
                              Internet
                                 │
                     [ Nginx — proxy inverso ]
                  rate limiting · security headers
                        /                  \
                  /api/*                    /*
                     │                       │
            [ Backend FastAPI ]      [ Frontend Vue 3 ]
              Uvicorn · 4 workers        SPA + PWA
                 │        │
        ┌────────┘        └────────┐
   [ MariaDB 11.4 ]          [ Redis 7.4 ]
                                   │
                          [ Worker Celery ]
                          colas: email, photos
                                   │
                    [ SharePoint Online — MS Graph ]
```

## Componentes

| Componente        | Descripción                                                          | Tecnología                             |
| ----------------- | -------------------------------------------------------------------- | -------------------------------------- |
| Backend API       | API REST de activos, documentos, catálogos, usuarios y dashboard     | Python 3.12, FastAPI 0.115, SQLAlchemy |
| Frontend          | SPA instalable como PWA, con gráficos y modo offline básico          | Vue 3.5, Vite 6, Pinia, Tailwind CSS 4 |
| Worker asíncrono  | Envío de correos y subida/procesamiento de fotos sin bloquear la API | Celery 5.4 sobre Redis                 |
| Base de datos     | Almacenamiento transaccional de activos y documentos                 | MariaDB 11.4                           |
| Cache / broker    | Cache de tokens, broker de Celery y backend de resultados            | Redis 7.4                              |
| Generación de PDF | Actas de entrega y devolución listas para firma                      | WeasyPrint 63 + Jinja2                 |
| Almacenamiento    | Documentos firmados y evidencia fotográfica                          | SharePoint Online (Microsoft Graph)    |
| Proxy inverso     | Punto de entrada único, cabeceras de seguridad y rate limiting       | Nginx 1.27                             |

## Módulos funcionales

| Módulo                | Qué resuelve                                                           |
| --------------------- | ---------------------------------------------------------------------- |
| Activos               | Inventario, ficha técnica y asignación de cada equipo a su responsable |
| Documentos            | Borrador → PDF → firma → evidencia fotográfica → cierre del proceso    |
| Catálogos             | Categorías, áreas y puntos de venta que estructuran el inventario      |
| Pruebas por categoría | Checklist de verificación específico según el tipo de equipo           |
| Notificaciones        | Avisos in-app y por correo en cada paso del flujo                      |
| Portal del usuario    | "Mis activos" y "Mi historial" para el empleado final                  |
| Dashboard             | Indicadores del inventario y del estado de los documentos              |

## Flujo de entrega y devolución

1. El responsable genera un **documento de entrega o devolución** en borrador,
   con los activos involucrados y sus pruebas de categoría.
2. El sistema produce el **PDF del acta** con WeasyPrint y lo pone a disposición
   para su descarga y firma.
3. El usuario sube las **fotos de evidencia**; el worker de Celery las procesa y
   las almacena en **SharePoint** vía Microsoft Graph, sin bloquear la interfaz.
4. Tras la revisión visual, el proceso se **completa** y el activo cambia de
   responsable. Los documentos rechazados se purgan automáticamente.
5. Cada paso dispara **notificaciones** in-app y por correo, y queda registrado
   para la auditoría.

## Seguridad

- **Autenticación con Microsoft Entra ID** (OAuth2 + MSAL), con cache de tokens
  en Redis.
- **Cabeceras de seguridad y rate limiting** aplicados en el proxy Nginx.
- Servicios internos **sin puertos publicados**: solo Nginx queda expuesto.
- Auditoría integral del código realizada en julio de 2026 (backend, capa de
  datos, frontend, UI/UX e infraestructura), con corrección de la totalidad de
  los hallazgos críticos y altos accionables por código.

## Decisiones técnicas

- **Celery para lo lento:** subir fotos a SharePoint y enviar correos son
  operaciones de red impredecibles; sacarlas del ciclo de petición mantiene la
  API rápida. El encolado se hace **después del commit** para evitar que el
  worker procese una fila que todavía no existe.
- **SharePoint como almacén documental:** la empresa ya opera sobre Microsoft
  365, así que las actas y evidencias quedan donde el negocio las busca, con sus
  permisos y su retención, en vez de en un bucket aparte.
- **PDF en el servidor:** generar el acta con WeasyPrint garantiza que el
  documento firmado sea idéntico para todos, sin depender del navegador.
- **PWA antes que app nativa:** el usuario final solo necesita consultar sus
  activos y tomar fotos; una PWA instalable evita mantener y distribuir binarios.

## Resultados

- Trazabilidad completa de cada activo: quién lo tiene, desde cuándo y con qué
  documento firmado lo respalda.
- Sustitución del acta en papel por un flujo digital con evidencia fotográfica
  verificable.
- Visibilidad inmediata del inventario y del estado de los procesos desde el
  dashboard, sin consolidar hojas de cálculo.
