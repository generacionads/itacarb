/**
 * PDF de cada recurso, que se adjunta al email (solo servidor: lo importa
 * /api/recursos, nunca un componente ni una página).
 *
 * Los PDF viven en /private/recursos, fuera de /public, así que la web no los
 * sirve: solo llegan por email. Para actualizar un recurso, exporta de nuevo el
 * documento a PDF (Drive: Archivo > Descargar > Documento PDF) y sustituye el
 * archivo con el mismo nombre. next.config.ts incluye esta carpeta en el
 * despliegue de /api/recursos.
 */
import path from "node:path";

export const RECURSOS_PRIVATE_DIR = path.join(process.cwd(), "private", "recursos");

export const RECURSO_FILES: Record<string, { file: string; attachmentName: string }> = {
  "checklist-web-industrial-b2b": {
    file: "checklist-web-industrial-b2b.pdf",
    attachmentName: "Checklist-Web-Industrial-B2B-Itaca-RB.pdf",
  },
};
