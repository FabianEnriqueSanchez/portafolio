// Genera public/og.png (1200×630, imagen para redes sociales) y
// public/apple-touch-icon.png (180×180) a partir de src/data/site.json.
// Se ejecuta automáticamente antes de cada build (script "prebuild"),
// así la imagen siempre refleja los datos editados desde el admin.
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const raiz = new URL("..", import.meta.url);
const site = JSON.parse(
  await readFile(fileURLToPath(new URL("src/data/site.json", raiz)), "utf8"),
);

const { nombre, rol, ubicacion } = site.perfil;
const iniciales = nombre
  .split(" ")
  .slice(0, 2)
  .map((p) => p[0])
  .join("");

const escapar = (t) =>
  t.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const svgOg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0c0a09"/>
  <rect x="0" y="0" width="1200" height="8" fill="#2dd4bf"/>
  <rect x="80" y="96" width="96" height="96" rx="24" fill="#0f766e"/>
  <text x="128" y="160" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif"
    font-size="44" font-weight="700" fill="#ffffff">${escapar(iniciales)}</text>
  <text x="80" y="304" font-family="Segoe UI, Arial, sans-serif"
    font-size="64" font-weight="700" fill="#f5f3f0">${escapar(nombre)}</text>
  <text x="80" y="380" font-family="Segoe UI, Arial, sans-serif"
    font-size="38" font-weight="500" fill="#2dd4bf">${escapar(rol)}</text>
  <text x="80" y="448" font-family="Segoe UI, Arial, sans-serif"
    font-size="30" fill="#b3ada4">Python · Java · JavaScript · Vue.js · APIs REST · AWS</text>
  <text x="80" y="546" font-family="Consolas, monospace"
    font-size="26" fill="#6b655f">${escapar(ubicacion)}</text>
</svg>`;

await writeFile(
  fileURLToPath(new URL("public/og.png", raiz)),
  await sharp(Buffer.from(svgOg)).png().toBuffer(),
);

const favicon = await readFile(
  fileURLToPath(new URL("public/favicon.svg", raiz)),
);
await writeFile(
  fileURLToPath(new URL("public/apple-touch-icon.png", raiz)),
  await sharp(favicon, { density: 300 }).resize(180, 180).png().toBuffer(),
);

console.log("✔ public/og.png y public/apple-touch-icon.png generados");
