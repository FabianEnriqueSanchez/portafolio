---
titulo: "Serve MCP — Servidor MCP para SAP Business One"
descripcion: "Servidor Model Context Protocol que expone SAP Business One sobre HANA a agentes de IA: 65 tools de solo lectura, tipadas y auditadas."
actualizado: "2026-09-22"
orden: 1
---

## Visión general

**Serve MCP** es un servidor **MCP (Model Context Protocol)** en Python que
expone los datos de **SAP Business One 10.0 FP 2105 sobre SAP HANA** a agentes
de IA como Claude Desktop y Claude Code. Su objetivo es que cualquier persona
del negocio pueda preguntar en lenguaje natural —"¿cuánto stock tengo de este
SKU en el almacén 118201?", "mostrame la cartera vencida de este cliente"— y
obtener la respuesta tomada directamente de SAP, sin abrir la GUI de SAP B1 ni
escribir una línea de SQL.

MCP es un estándar abierto publicado por Anthropic que define cómo un agente de
IA se conecta a fuentes de datos externas. La analogía que guio el diseño: _MCP
es a los LLMs lo que ODBC fue a las bases de datos en los noventa_, un protocolo
común que evita escribir un integrador por cada combinación de cliente y fuente.

La versión 1.0 alcanzó **paridad de consulta con la GUI de SAP B1**: 65 tools de
lectura, tipadas y auditadas, con el modo solo lectura como invariante tanto en
HANA como en el Service Layer. El código es propiedad de la empresa, por lo que
este documento describe la arquitectura y las decisiones técnicas.

## Arquitectura

```text
 ┌───────────────────────────┐        ┌────────────────────────────────────┐
 │  Cliente MCP              │        │  Serve MCP (contenedor Docker)     │
 │  · Claude Desktop         │  HTTP  │  ┌──────────────────────────────┐  │
 │  · Claude Code            │ ─────► │  │ FastMCP /mcp /health /metrics│  │
 │  · Agente con el SDK MCP  │JSON-RPC│  └──────────────┬───────────────┘  │
 └───────────────────────────┘        │                 │                  │
                                      │  ┌──────────────▼───────────────┐  │
                                      │  │ Capa de tools (65)           │  │
                                      │  │ + sql_guard (validador AST)  │  │
                                      │  └──────────────┬───────────────┘  │
                                      │  ┌──────────────▼───────────────┐  │
                                      │  │ @audited — log JSON por      │  │
                                      │  │ cada invocación              │  │
                                      │  └──────────────┬───────────────┘  │
                                      │  ┌──────────────▼───────────────┐  │
                                      │  │ HanaClient — pool de         │  │
                                      │  │ conexiones thread-safe       │  │
                                      │  └──────────────┬───────────────┘  │
                                      └─────────────────┼──────────────────┘
                                                        │ hdbcli · TLS
                                                        ▼
                                      ┌────────────────────────────────────┐
                                      │  SAP HANA — company DB de SAP B1   │
                                      │  schema con whitelist              │
                                      │  usuario solo-SELECT               │
                                      └────────────────────────────────────┘
```

El punto crítico del diseño es que **el LLM nunca toca HANA**. Toda interacción
pasa por una función Python tipada, con parámetros validados por Pydantic contra
un schema generado desde los _type hints_, y —en la única tool que acepta SQL del
cliente— por un validador que analiza el árbol de la consulta.

## Stack técnico

| Capa          | Tecnología                      | Por qué                                                        |
| ------------- | ------------------------------- | -------------------------------------------------------------- |
| Lenguaje      | Python 3.11+                    | SDK oficial de MCP en Python                                   |
| Framework MCP | `mcp[fastmcp]`                  | Registro de tools por decoradores y transporte HTTP streamable |
| Driver        | `hdbcli` (oficial de SAP)       | Conexión nativa a HANA con cifrado TLS                         |
| Validación    | Pydantic v2 + pydantic-settings | Tipado de parámetros y respuestas; schemas automáticos         |
| Validador SQL | `sqlglot`                       | Parser AST multi-dialecto sobre el que se apoya el `sql_guard` |
| Logging       | `structlog`                     | Logs JSON estructurados para la auditoría                      |
| HTTP          | Starlette + Uvicorn             | Base del transporte de FastMCP                                 |
| Caché         | `cachetools`                    | TTL cache de la metadata de introspección                      |
| Pruebas       | pytest, pytest-asyncio, cov     | 153 pruebas, ~95 % de cobertura                                |
| Empaquetado   | Docker multi-stage              | Imagen final de ~150 MB, usuario no-root                       |

## Catálogo de tools

Las 65 tools se agrupan por dominio de negocio:

| Dominio                                           | Tools | Qué resuelve                                                          |
| ------------------------------------------------- | ----: | --------------------------------------------------------------------- |
| Catálogo SAP (consultas guardadas, UDT, UDF, UDO) |    12 | Acceso a los objetos que cada empresa define sobre SAP                |
| Documentos de ventas y compras                    |    10 | Ofertas, pedidos, entregas, facturas y notas de crédito               |
| Auditoría, aprobaciones y alertas                 |     9 | Historial de documentos, logs de cambios, aprobaciones pendientes     |
| Artículos y socios de negocio                     |     8 | Fichas, precios, saldos y datos maestros                              |
| Finanzas                                          |     6 | Cartera con días vencidos, asientos, plan de cuentas, pagos           |
| Service Layer de SAP B1 (GET-only)                |     6 | Consulta por la API REST oficial, no solo por SQL                     |
| Inventario y producción                           |     4 | Movimientos, traslados, órdenes de fabricación y listas de materiales |
| Introspección del schema                          |     4 | Permite al agente _descubrir_ la estructura antes de consultar        |
| Vistas modeladas de HANA                          |     3 | Consumo de vistas analíticas con doble whitelist                      |
| Consulta SQL dinámica                             |     1 | SQL del cliente, siempre a través del `sql_guard`                     |
| Enrutador polimórfico de documentos               |     1 | Un único punto de entrada sobre 10 tipos de objeto SAP                |
| Renderización de reportes                         |     1 | PDF vía Crystal Server cuando la infraestructura está disponible      |

## Seguridad

El servidor se diseñó bajo una invariante explícita: **solo lectura, sin
excepciones**. Se sostiene en varias capas independientes, de modo que ninguna
por sí sola sea el único punto de fallo:

- **`sql_guard`**: validador sobre el árbol sintáctico de la consulta que rechaza
  cualquier sentencia distinta de `SELECT`, incluso dentro de consultas guardadas
  y vistas modeladas.
- **Service Layer GET-only**: el cliente HTTP rechaza con error cualquier método
  que no sea `GET`, salvo el inicio y el cierre de sesión.
- **Usuario de base de datos solo-SELECT**, con verificación de privilegios en
  modo estricto al arrancar: si el usuario tiene más permisos de los que debería,
  el servidor no levanta.
- **Whitelists cerradas** de schemas, tablas de presets, tablas dinámicas (por
  expresión regular) y vistas modeladas.
- **Consultas parametrizadas siempre**: los valores del usuario viajan como
  parámetros del driver, nunca concatenados al SQL.
- **Auditoría completa**: cada invocación se registra en JSON con su tool,
  parámetros, duración y resultado.
- **Autenticación de clientes MCP** por API key, con matriz de tools permitidas
  por cliente y _rate limit_ configurable. `/health` y `/metrics` quedan abiertos.
- **Contenedor endurecido**: imagen multi-stage, usuario no-root y TLS hacia HANA.

## Decisiones técnicas

- **MCP en lugar de una API REST a medida:** una API propia habría obligado a
  construir además el cliente, la interfaz y el manejo de sesión. Con MCP,
  cualquier cliente compatible —Claude Desktop, Claude Code o un agente propio—
  consume el servidor sin integración específica, y el lenguaje natural ya es la
  interfaz.
- **Tools tipadas antes que SQL libre:** dejar que el modelo escriba consultas
  contra SAP es frágil y peligroso. Las tools con contrato fijo devuelven siempre
  la misma forma de datos, y la única entrada de SQL libre pasa por el validador.
- **Solo lectura en la primera fase:** escribir en SAP tiene consecuencias
  contables y fiscales. La escritura se incorpora a través del **Service Layer**
  —la API oficial, que aplica las reglas de negocio de SAP—, nunca por SQL
  directo.
- **Introspección cacheada:** el agente necesita descubrir el schema antes de
  consultar; cachear esa metadata con TTL evita golpear a HANA en cada pregunta.
- **Pool de conexiones propio:** HANA limita las conexiones concurrentes y un
  agente puede disparar varias tools en paralelo; el pool acota ese consumo.

## Calidad y operación

- **153 pruebas** automatizadas con ~95 % de cobertura.
- **Prueba de regresión extremo a extremo** que verifica que las 65 tools quedan
  registradas y que se mantienen las invariantes de seguridad entre módulos.
- **Endpoints de operación**: `/health` para el estado del servicio y `/metrics`
  con contadores por tool, por fuente (HANA o Service Layer) y por error.
- **Despliegue con Docker Compose** en un servidor interno, con toda la
  configuración en variables de entorno.

## Resultados

- El negocio consulta la información de SAP en lenguaje natural, sin pasar por la
  GUI ni esperar a que alguien prepare un informe.
- Paridad de consulta con SAP B1 en los dominios que importan: comercial,
  finanzas, inventario, auditoría y datos maestros.
- Una superficie de acceso auditada y acotada: se sabe exactamente qué tool se
  invocó, con qué parámetros y cuánto tardó.
