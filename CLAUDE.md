# Ítacarb — Sitio Web Corporativo

Sitio web de Ítacarb, consultoría estratégica de marketing.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS 4** para estilos
- **Fuentes**: Inter (body) + Playfair Display (headings) — Google Fonts via `next/font`

## Estructura

```
src/
  app/               # App Router (páginas y layout raíz)
  components/
    layout/          # Header, Footer
    sections/        # Secciones de página (Hero, Services, About, Contact)
    ui/              # Primitivos reutilizables (Button, Container)
  lib/               # utils.ts (cn helper)
  types/             # Tipos TypeScript compartidos
```

## Tokens de diseño (globals.css)

| Variable | Valor | Uso |
|---|---|---|
| `--color-brand-primary` | `#1a1a2e` | Azul oscuro corporativo |
| `--color-brand-accent` | `#c9a84c` | Dorado — CTAs, énfasis |
| `--color-brand-light` | `#f5f3ef` | Fondos suaves |
| `--color-brand-muted` | `#6b6b7b` | Texto secundario |

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # ESLint
```

## Instrucciones generales

- Todos los cambios deben ser responsive (mobile-first).
- Usar el helper `cn()` de `@/lib/utils` para clases condicionales.
- Las secciones de página van en `src/components/sections/`.
- Los componentes de UI genéricos van en `src/components/ui/`.
