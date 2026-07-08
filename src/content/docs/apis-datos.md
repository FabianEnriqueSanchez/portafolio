---
titulo: "APIs y servidores de gestión de datos"
descripcion: "APIs REST y servidores para integrar y gestionar datos empresariales."
proyecto: "apis-datos"
actualizado: "2026-06-14"
orden: 2
---

## Visión general

Conjunto de **APIs REST** y servidores desarrollados para integrar y gestionar
datos entre distintos sistemas de la empresa, sirviendo de base para varias
automatizaciones internas.

## Tecnologías

- **Lenguaje:** Python
- **Base de datos:** MySQL
- **Infraestructura:** AWS EC2
- **Control de versiones:** Git

## Endpoints (ejemplo)

| Método | Ruta             | Descripción                  |
| ------ | ---------------- | ---------------------------- |
| `GET`  | `/datos`         | Consulta registros           |
| `POST` | `/datos`         | Crea un registro             |
| `GET`  | `/datos/:id`     | Detalle de un registro       |
| `POST` | `/integracion`   | Sincroniza con otro sistema  |

## Ejemplo de uso

```bash
curl -X POST https://api.ejemplo.com/datos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"registro","valor":42}'
```

## Despliegue

El servicio se ejecuta en una instancia **AWS EC2**. El flujo habitual:

```bash
git pull
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python api/main.py --serve
```

> **Plantilla:** completa con los endpoints reales, el modelo de datos y las
> automatizaciones que dependen de esta API.
> Edita el archivo `src/content/docs/apis-datos.md`.
