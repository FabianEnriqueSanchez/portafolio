---
titulo: "PhysCalc Pro — Calculadora de propiedades físicas"
descripcion: "Calculadora web interactiva para el análisis de propiedades físicas industriales."
actualizado: "2026-07-16"
orden: 5
---

## Visión general

**PhysCalc Pro** es una calculadora web interactiva desarrollada como caso de
estudio para la empresa **TecnoIndustria S.A.S.** Reúne en una sola interfaz los
cálculos de propiedades físicas más frecuentes en un entorno industrial, de modo
que el usuario obtenga resultados inmediatos sin depender de hojas de cálculo
dispersas. Puedes probarla en la [demo en vivo](https://fabianenriquesanchez.github.io/PhysCalcPro/).

## Módulos de cálculo

| Módulo               | Qué calcula                                        |
| -------------------- | -------------------------------------------------- |
| Calor                | Transferencia de calor a partir de sus variables   |
| Temperatura          | Conversión y análisis de temperatura               |
| Presión              | Presión en función de fuerza y área                |
| Caudal               | Flujo volumétrico del fluido                        |
| Energía potencial    | Energía asociada a masa, gravedad y altura          |
| Eficiencia energética| Relación entre energía útil y energía suministrada  |

## Stack técnico

- **HTML5** para la estructura semántica de la interfaz.
- **CSS3** para el diseño responsivo y la presentación visual.
- **JavaScript (Vanilla)** para toda la lógica de cálculo, sin frameworks ni
  dependencias externas.
- **GitHub Pages** como plataforma de despliegue estático.

## Decisiones de diseño

- **Sin dependencias:** al usar JavaScript puro, la aplicación carga rápido y no
  requiere ningún proceso de build ni servidor, lo que simplifica el despliegue
  en GitHub Pages.
- **Cálculo en el cliente:** todas las operaciones se resuelven en el navegador,
  por lo que la herramienta funciona incluso sin conexión una vez cargada.
- **Interfaz por módulos:** cada propiedad física se aísla en su propio bloque,
  facilitando el uso y el mantenimiento del código.

## Resultados

- Centralización de los cálculos físicos más usados en una única herramienta
  accesible desde cualquier navegador.
- Reducción de errores manuales al automatizar las fórmulas.
- Base extensible: agregar un nuevo módulo de cálculo sólo requiere sumar su
  bloque de interfaz y su función correspondiente.
