export const SECTORS = {
  sanitarios: {
    slug: "clinicas-y-sector-salud",
    brevoListEnvKey: "BREVO_LIST_SANITARIOS",
  },
  arquitectura: {
    slug: "arquitectura-y-diseno",
    brevoListEnvKey: "BREVO_LIST_ARQUITECTURA",
  },
  industrial: {
    slug: "industrial",
    brevoListEnvKey: "BREVO_LIST_INDUSTRIAL",
  },
} as const;

export type SectorKey = keyof typeof SECTORS;

export const SLUG_TO_SECTOR: Record<string, SectorKey> = Object.fromEntries(
  (Object.entries(SECTORS) as [SectorKey, (typeof SECTORS)[SectorKey]][]).map(
    ([key, val]) => [val.slug, key]
  )
);
