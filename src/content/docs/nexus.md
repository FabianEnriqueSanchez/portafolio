---
titulo: "Nexus — Sistema centralizado de scripts empresariales"
descripcion: "Plataforma cliente-servidor para distribuir, versionar, ejecutar y monitorear scripts Python empresariales."
actualizado: "2026-07-16"
orden: 0
---

## Visión general

**Nexus** es un sistema cliente-servidor desarrollado para **ARDISA SA** que
centraliza la distribución, el versionamiento, la ejecución y el monitoreo de
scripts Python empresariales (SAP, Magento, contabilidad, cartera, etc.). Permite
al departamento de TI gestionar de forma segura los scripts que automatizan
procesos de negocio y distribuirlos a los usuarios finales. El código es
propiedad de la empresa, por lo que este documento describe la arquitectura y las
decisiones técnicas.

## Arquitectura

```text
                       [ Nginx (proxy inverso + SSL) ]
                                    │
              ┌─────────────────────┴─────────────────────┐
      [ Panel Admin Web ]                          [ Backend API ]
       Vue.js 3 + Vite                          FastAPI + SQLAlchemy
                                                     │    │    │
                                       ┌─────────────┘    │    └───────────┐
                                  [ MariaDB ]         [ Redis ]        [ Storage ]

      [ Launcher de escritorio ] ──────────────────> Backend API
        CustomTkinter (equipos de usuario)
```

## Componentes

| Componente          | Descripción                                                        | Tecnología                                    |
| ------------------- | ------------------------------------------------------------------ | --------------------------------------------- |
| Backend API         | API REST para scripts, usuarios, permisos, secretos y logs         | Python, FastAPI, SQLAlchemy 2.0, Alembic      |
| Panel Admin Web     | Interfaz administrativa para el equipo de TI                       | Vue.js 3, Vite, Pinia, CSS puro               |
| Launcher Escritorio | App de escritorio con la que los usuarios ejecutan los scripts     | Python, CustomTkinter, PyInstaller            |
| Base de datos       | Almacenamiento persistente (20 tablas)                             | MariaDB 11.x (InnoDB, utf8mb4)                |
| Cache / Rate limit  | Rate limiting y cache de autenticación                            | Redis 7                                       |
| Proxy inverso       | Enrutamiento, SSL, compresión y headers de seguridad              | Nginx 1.25                                     |

## Funcionamiento

1. El equipo de TI **sube y versiona** los scripts desde el panel administrativo;
   cada versión se identifica con versionado semántico y un hash **SHA-256** para
   verificar su integridad.
2. Los permisos se asignan por **rol (RBAC)**, controlando qué usuario puede
   ejecutar cada script.
3. El **launcher de escritorio** autentica al usuario contra la API, descarga el
   script autorizado y lo ejecuta en un entorno aislado, resolviendo sus
   dependencias y secretos.
4. Cada ejecución queda **registrada y monitoreada**, con logs disponibles desde
   el panel para trazabilidad.

## Seguridad

- Autenticación **JWT** con access token (30 min) y refresh token.
- **Bcrypt** con cost factor 12 para el hashing de contraseñas.
- Cifrado **AES-256** para los secretos almacenados.
- **Rate limiting** contra fuerza bruta en los endpoints de autenticación.
- Sesión única por usuario y *blacklist* de tokens al cerrar sesión.
- Verificación de integridad de scripts mediante **SHA-256**.

## Stack técnico

- **Backend:** Python 3.11+, FastAPI, SQLAlchemy 2.0, Alembic, PyJWT, Pydantic v2.
- **Frontend:** Vue.js 3.4+, JavaScript ES6+, Axios, Vue Router, Pinia, Vite 5.
- **Launcher:** Python 3.11+, CustomTkinter, Requests, PyInstaller, Keyring.
- **Infraestructura:** Docker, Docker Compose, Nginx, Redis.
- **Conexión SAP:** hdbcli (driver nativo de HANA).

## Resultados

- Distribución centralizada y segura de scripts que antes se compartían de forma
  manual y descoordinada.
- Trazabilidad completa: cada ejecución queda registrada con su usuario, versión
  y resultado.
- Control de acceso granular por rol y verificación de integridad en cada versión.
