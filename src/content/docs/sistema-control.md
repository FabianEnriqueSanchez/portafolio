---
titulo: "Sistema de control con Java y Arduino"
descripcion: "Integración de software en Java con hardware Arduino para automatizar procesos operativos."
proyecto: "sistema-control"
actualizado: "2026-06-14"
orden: 1
---

## Visión general

Sistema que conecta una aplicación de control escrita en **Java** con un
microcontrolador **Arduino** para monitorear y automatizar procesos operativos,
reduciendo intervención manual y mejorando la eficiencia.

## Arquitectura

```text
[ App Java ] ──serial/USB──> [ Arduino ] ──> [ Sensores / Actuadores ]
     │
     └──> Registro y reportes
```

- **Capa de software (Java):** lógica de control, interfaz y registro de eventos.
- **Capa de hardware (Arduino):** lectura de sensores y accionamiento.
- **Comunicación:** puerto serie entre el equipo y la placa.

## Componentes

| Componente   | Tecnología        | Función                          |
| ------------ | ----------------- | -------------------------------- |
| Controlador  | Java              | Lógica y coordinación            |
| Firmware     | Arduino (C/C++)   | Lectura/escritura de pines       |
| Comunicación | Serial (USB)      | Intercambio de datos             |

## Resultados

- Automatización de un proceso que antes era manual.
- Mejora en la eficiencia y trazabilidad de la operación.

> **Plantilla:** completa esta documentación con los detalles reales del
> proyecto (sensores usados, esquema de conexión, instrucciones de montaje).
> Edita el archivo `src/content/docs/sistema-control.md`.
