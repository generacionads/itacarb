/**
 * Enlaces de los recursos, que se envían solo por email (solo servidor: lo
 * importa /api/recursos, nunca un componente de cliente ni una página, así el
 * enlace no aparece en la web).
 *
 * Los documentos de Drive deben estar compartidos como "Cualquier persona con
 * el enlace: Lector". Para Google Docs, `export?format=pdf` descarga un PDF.
 */
export const RECURSO_DOWNLOADS: Record<string, string> = {
  "checklist-web-industrial-b2b":
    "https://docs.google.com/document/d/1Dn8Pcj5jI4DXecqMGTZCjRCWcdKNkXiEOvYA1rQvpIc/export?format=pdf",
};
