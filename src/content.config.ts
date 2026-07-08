import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Colección de documentación: cada archivo .md en src/content/docs/
// se convierte en una página dentro de /docs.
const docs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/docs" }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    proyecto: z.string().optional(),
    actualizado: z.string().optional(),
    orden: z.number().default(99),
  }),
});

export const collections = { docs };
