---
titulo: "Control de Ingresos — Custodia y trazabilidad de equipos de cómputo"
descripcion: "Sistema multisucursal de ingreso, salida y préstamo de equipos, con validación por token de correo y auditoría completa."
actualizado: "2026-09-22"
orden: 3
---

## Visión general

**Control de Ingresos** es un sistema web multisucursal para la custodia y
trazabilidad de equipos de cómputo en una institución educativa. Responde en
todo momento a tres preguntas: qué equipos hay dentro, quién los metió o los
sacó, y qué equipos institucionales están prestados y a quién.

La regla que sostiene el diseño es que **ninguna operación queda sostenida
únicamente por la palabra de quien la registra**: el préstamo y la devolución se
confirman con un token enviado al correo de la persona, y todo movimiento puede
reconstruirse meses después desde la auditoría.

## Arquitectura

```text
                        [ Nginx — punto de entrada único ]
                                      │
                    ┌─────────────────┴─────────────────┐
             [ Frontend Vue 3 ]                  [ Backend FastAPI ]
              Vite · Vue Router                   Python 3.12 · JWT
                                                        │
                                      ┌─────────────────┼──────────────┐
                              [ PostgreSQL 16 ]   [ Alembic ]   [ SMTP ]
                                                  migraciones   tokens y alertas
```

## Componentes

| Capa                 | Tecnología                                   |
| -------------------- | -------------------------------------------- |
| Frontend             | Vue 3 + Vue Router + Vite, servido por Nginx |
| Backend              | Python 3.12 + FastAPI                        |
| Sesión               | JWT con expiración; contraseñas con bcrypt   |
| Base de datos        | PostgreSQL 16                                |
| Migraciones          | Alembic                                      |
| Proxy                | Nginx como punto de entrada único            |
| Correo               | SMTP institucional (Mailpit en desarrollo)   |
| Integración continua | GitHub Actions                               |
| Infraestructura      | Docker + Docker Compose                      |

## Perfiles de usuario

El sistema se diseñó a partir de tres formas muy distintas de trabajar sobre la
misma base de datos:

| Perfil                   | Contexto de uso                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Vigilante de portería    | De pie, con cola de personas esperando. Necesita cerrar una operación en segundos, en PC o en pantalla táctil. |
| Responsable de préstamos | Oficina y sesiones largas. Trabajo documental: cada paso deja rastro y debe poder justificarse.                |
| Administrador            | Configura sucursales, usuarios, roles y catálogos; consulta dashboard, alertas y auditoría.                    |

Cada usuario opera únicamente sobre su sede; solo el administrador ve toda la
institución.

## Funcionalidades

- **Ingreso y salida de equipos personales** con registro inmediato y sin
  ambigüedad sobre qué acaba de ocurrir.
- **Préstamo y devolución de equipos institucionales**, confirmados con un
  **token enviado por correo** a la persona responsable.
- **Autorizaciones de salida** verificables desde portería.
- **Multisucursal**: aislamiento de datos por sede, con visión global para la
  administración.
- **Dashboard, alertas y reportes** sobre el estado del inventario.
- **Auditoría** de todos los movimientos, pensada para reconstruir el pasado.

## Diseño de interfaz

La interfaz se rige por dos documentos de cumplimiento obligatorio en el propio
repositorio: uno de producto (usuarios, propósito y principios) y otro de diseño
(tokens, componentes, patrones y prohibiciones). De ahí salen dos decisiones que
marcan el producto:

- **Dos densidades de interfaz** —cómoda y táctil—, donde portería activa la
  táctil por sí sola porque opera sobre una pantalla montada en el puesto.
- **Dos temas**, claro y oscuro, conmutables y persistidos en el navegador.

Los estilos se escriben con Tailwind CSS v4 sobre tokens propios, y el contraste
de esos tokens se verifica con un script dedicado (`npm run contraste`) en lugar
de confiarlo a la revisión visual.

## Calidad y operación

- **Backlog formal:** 130 ítems, 525 _story points_ y 12 sprints planificados
  bajo Scrum.
- **Pruebas automatizadas:** `pytest` en el backend y Vitest en los componentes
  del frontend, ejecutadas en GitHub Actions.
- **Arranque autónomo:** el backend espera a PostgreSQL, aplica las migraciones
  pendientes y siembra el primer administrador si no existe ninguno; ese
  administrador está obligado a cambiar la contraseña en el primer inicio de
  sesión, porque quien preparó el despliegue la conoce.
- **Verificación integrada:** _health checks_ de API y base de datos, y un
  comando para comprobar el envío de correo antes de poner el sistema en
  producción.

## Decisiones técnicas

- **Token por correo como prueba de consentimiento:** convierte un préstamo en un
  hecho verificable en lugar de un apunte administrativo.
- **Nginx como punto de entrada único:** frontend y API comparten origen, así que
  no hay CORS que configurar ni orígenes que mantener sincronizados.
- **Densidad táctil automática por rol:** la interfaz se adapta al puesto de
  trabajo en lugar de exigir que el vigilante la configure.
- **Documentos de producto y diseño versionados con el código:** las reglas de
  interfaz se revisan en el _pull request_, como cualquier otro cambio.

## Resultados

- Respuesta inmediata y verificable a qué equipos hay dentro y quién los movió.
- Operaciones de portería que se completan sin dudas ni reintentos, incluso en
  hora pico.
- Historial reconstruible meses después, con respaldo documental de cada
  préstamo y cada devolución.
