---
titulo: "Automatización de procesos internos"
descripcion: "Formularios y flujos con Power Automate y Power Apps que optimizaron procesos del negocio."
actualizado: "2026-07-07"
orden: 3
---

## Visión general

Conjunto de **formularios y flujos automatizados** construidos con
**Power Automate** y **Power Apps** que digitalizaron procesos internos del
negocio: solicitudes de soporte, aprobaciones y notificaciones que antes se
gestionaban por correo de forma manual. Las implementaciones son internas de
la empresa; la [demo interactiva](../../demos/automatizacion-procesos/) simula
el recorrido completo de una solicitud a través de uno de estos flujos.

## Problema

- Las solicitudes internas llegaban por correo o de palabra, sin registro
  centralizado ni trazabilidad.
- Las aprobaciones dependían de reenvíos manuales y se perdían con facilidad.
- No existían métricas de tiempos de atención.

## Solución

1. **Captura estructurada:** formularios en Power Apps con campos validados,
   categoría y prioridad.
2. **Flujo de aprobación:** Power Automate enruta cada solicitud al responsable
   según la categoría, con recordatorios automáticos si no hay respuesta.
3. **Notificaciones:** el solicitante recibe el estado en cada transición
   (recibido → en revisión → aprobado/rechazado → resuelto).
4. **Registro:** cada solicitud queda almacenada con su historial completo,
   lo que habilita métricas de tiempos y volumen.

## Resultados

- Reducción de los tiempos de atención de soporte al eliminar los reenvíos
  manuales.
- Trazabilidad completa: toda solicitud tiene responsable, estado e historial.
- Los datos capturados alimentan reportes de gestión mensuales.

## Herramientas

| Herramienta    | Uso                                        |
| -------------- | ------------------------------------------ |
| Power Apps     | Formularios de captura con validación      |
| Power Automate | Enrutamiento, aprobaciones y recordatorios |
| SharePoint     | Almacenamiento y listas de seguimiento     |
| Scrum          | Gestión iterativa del desarrollo           |
