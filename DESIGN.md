---
name: Ítacarb
description: Consultoría estratégica de marketing para sectores que exigen profundidad.
colors:
  fire-controlled: "#c8553d"
  fire-deep: "#a3422e"
  ink: "#36383a"
  background: "#f9f8f6"
  muted: "#6b6b7b"
  placeholder: "#d9d9d9"
typography:
  display:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "72px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  heading:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "48px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "32px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: 1.6
  body-sm:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "16px"
    fontWeight: 300
    lineHeight: 1.6
  label:
    fontFamily: "Satoshi, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  sm: "4px"
spacing:
  page-x-desktop: "64px"
  page-x-mobile: "16px"
  section-y: "64px"
  gap-md: "32px"
  gap-sm: "24px"
  gap-xs: "16px"
components:
  button-primary:
    backgroundColor: "{colors.fire-controlled}"
    textColor: "{colors.background}"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.fire-deep}"
  footer-surface:
    backgroundColor: "{colors.fire-controlled}"
    textColor: "{colors.ink}"
  sidebar-nav-active:
    textColor: "{colors.fire-deep}"
  sidebar-nav-default:
    textColor: "{colors.muted}"
---

# Design System: Ítacarb

## 1. Overview

**Creative North Star: "La Claridad con Carácter"**

Ítacarb no diseña para impresionar; diseña para demostrar. Cada decisión visual — la terracota que interrumpe el fondo mineral, las esquinas sin redondeo, el único peso de fuente en juego — es un argumento antes de que el usuario lea una sola palabra. El principio operativo es *el diseño es la prueba*: si hay que explicar la credibilidad, el diseño ha fallado.

El sistema rechaza activamente tres reflejos: el formalismo corporativo frío (consultoras con blues navy y tipografía serif conservadora), la creatividad maximalista de agencias (degradados, decoración gratuita, múltiples familias tipográficas), y la ligereza genérica del SaaS (cards idénticas, esquinas exageradamente redondeadas, sombras omnipresentes). Lo que queda es profundidad sin ostentación: un solo color de acento usado con disciplina, una sola familia tipográfica en tres pesos, y una paleta neutra que no pide atención.

La densidad es intencionadamente baja. El espacio en blanco no es ausencia — es la señal de que el equipo sabe qué dejar fuera.

**Key Characteristics:**
- Un solo acento cromático (Fuego Controlado, #c8553d) sobre una base mineral
- Una sola familia tipográfica (Satoshi) en tres pesos, sin fuente de display separada
- Diseño completamente plano: profundidad por contraste de color, no por sombras ni capas
- Esquinas vivas (0px) en componentes interactivos; mínimamente redondeadas (4px) solo en imágenes y placeholders
- El espacio como argumento: secciones de 64px de padding vertical, páginas sin ruido decorativo

## 2. Colors: La Paleta del Fuego Controlado

Una paleta de contención deliberada — un único acento saturado sobre neutros minerales. La riqueza visual viene de la proporción, no de la variedad.

### Primary
- **Fuego Controlado** (#c8553d): El único color de acento activo del sistema. Aparece en CTAs primarios (botón de contacto en header), como fondo del footer completo, como fondo de los banners H2 sticky en páginas interiores, y como color de texto en elementos de énfasis semántico (verbos destacados en subsecciones de servicio). Su riqueza terrosa ancla el sistema sin agresividad.
- **Fuego Profundo** (#a3422e): Estado de hover exclusivamente. Nunca aparece en reposo. Su única función es el feedback de interacción en elementos que usan Fuego Controlado. También se usa como color activo en SidebarNav para no competir con los CTAs de acción.

### Neutral
- **Tinta** (#36383a): Color de texto primario. Usado en toda la prosa, headings, y como fondo de los chips de idioma y redes sociales dentro del footer terracota. Casi negro pero con temperatura neutra, no fría.
- **Fondo Mineral** (#f9f8f6): Color de fondo del cuerpo y de todas las páginas. Diferenciado del blanco puro con un leve cálido que lo hace visualmente suave sin caer en beige. El header lo usa al 60% de opacidad con `backdrop-blur` para el efecto de vidrio esmerilado.
- **Voz Secundaria** (#6b6b7b): Texto de segundo nivel. Ratio de contraste 4.99:1 sobre Fondo Mineral (pasa WCAG AA). Usado en el estado por defecto de SidebarNav y en cargos del equipo. Prohibido en texto corrido.
- **Ceniza Placeholder** (#d9d9d9): Exclusivamente para el fondo de áreas de imagen pendiente (fotos de equipo, imágenes de proyectos). No usar como color de UI funcional.

### Named Rules

**La Regla del Fuego Escaso.** Fuego Controlado ocupa superficie en ≤3 posiciones simultáneas en pantalla (header CTA, footer, un elemento de énfasis en página). Su escasez es su poder. Si aparece en más de 3 lugares en la misma vista, se elimina el menos importante.

**La Regla de un Solo Acento.** El sistema tiene exactamente un color de acento activo. No añadir un segundo acento aunque parezca complementario. Si el diseño parece necesitar más color, la solución es más espacio o más jerarquía tipográfica, no más cromática.

## 3. Typography

**Display / Body / Label Font:** Satoshi (Fontshare CDN), con fallback `sans-serif`

**Character:** El sistema utiliza una sola familia en dos pesos únicos — Satoshi light (300) y Satoshi medium (500). No existe un tercer peso; la variación expresiva viene exclusivamente del tamaño y del cambio entre estos dos pesos. La combinación de tracking negativo en headings (-0.04em) y positivo en labels (+0.04em) crea una tensión deliberada entre lo editorial y lo funcional — la misma fuente, dos voces.

### Hierarchy
- **Display** (medium 500, 72px, leading 1, -0.04em): Titulares de máxima jerarquía. Footer "Hablemos", H1 de /sectores. Solo cuando la pantalla necesita una afirmación, no una descripción.
- **Heading** (medium 500, 48px, leading 1, -0.04em): H2 de secciones interiores, H1 de páginas como /nosotros y /servicio. El nivel por defecto para titulares de página.
- **Title** (medium 500, 32px, leading 1.2, -0.04em): Sub-headings dentro de sección. Texto de énfasis semántico (la frase verbo+cuerpo en /servicio). Títulos de categoría en /proyectos.
- **Body** (light 300, 18px, leading 1.6): Prosa de páginas interiores. Cap recomendado: 65–75ch.
- **Body-sm** (light 300, 16px, leading 1.6): Texto de segunda jerarquía, detalles, cargos de equipo, links legales en footer.
- **Label** (medium 500, 16px, +0.04em): Links de navegación (header y footer), texto de botones CTA, etiquetas de redes sociales. Siempre en mayúscula de frase, nunca en ALLCAPS.

### Named Rules

**La Regla del -0.04em.** -0.04em es el tracking mínimo en headings. Valores más negativos (-0.05em o superiores) hacen que las letras de Satoshi se toquen a 48px+. Si un display se lee "apretado", el tracking es el culpable, no el peso.

**La Regla de los Dos Pesos.** El sistema usa exactamente dos pesos: medium (500) para display/heading/title/label, y light (300) para body. No hay bold, no hay regular. Si un texto no encaja en ninguno de los dos, el problema es de jerarquía, no de peso.

## 4. Elevation

Este sistema no usa sombras (`box-shadow`) en ningún componente. La profundidad no es física — es cromática y posicional.

Un cambio de plano se comunica de tres formas: (1) salto tonal de color — el footer en Fuego Controlado vs. el cuerpo en Fondo Mineral comunica "nueva sección" más claramente que cualquier sombra; (2) posicionamiento sticky — el header y los sidebars comunican "por encima" mediante `position: sticky/fixed` con `backdrop-blur`, no por elevación visual; (3) jerarquía tipográfica — el tamaño y peso del texto indica la profundidad del contenido, no el contenedor.

**La Regla de Profundidad sin Capas.** Si un componente parece necesitar una sombra para "destacar", el problema es de contraste o posicionamiento, no de elevación. La solución es más espacio o un cambio de color. Las sombras nunca.

## 5. Components

### Buttons
El único botón primario del sistema. Carácter: directo y sin rodeos.

- **Shape:** Sin radio (0px). Los botones tienen bordes vivos — la calidez la aporta el color, no la forma.
- **Primary:** Fondo Fuego Controlado (#c8553d), texto Fondo Mineral (#f9f8f6). Padding 12px vertical × 24px horizontal. Label en tracking +0.04em, font-medium (500).
- **Hover:** Fondo Fuego Profundo (#a3422e). Transición `transition-colors` (200ms). Sin transform, sin shadow, sin underline.
- **Ghost / Secondary:** No existe en el sistema actual. El lenguaje de botón es monolítico: un estilo, un propósito.

### Navigation
- **Header:** Fijo top-0, altura 72px desktop / 64px mobile. Fondo Mineral al 60% de opacidad con `backdrop-blur-md`. Links en Tinta, hover en Fuego Controlado. Tracking +0.04em, font-medium. Mobile: panel desplegable con fondo background/85.
- **Footer:** Links en Tinta sobre Fuego Controlado, hover `opacity-70`. Chips de idioma (ES) y redes sociales en fondo Tinta con texto Fondo Mineral — inversión de colores dentro de la superficie terracota.

### SidebarNav (Componente Firma)
Aparece en /nosotros, /servicio y /sectores. Navegación de documento lateral sincronizada con IntersectionObserver.

- **Posición:** `sticky self-start`, width 33%, padding horizontal 64px desktop.
- **Estado por defecto:** Voz Secundaria (#6b6b7b). Hover: Tinta (#36383a).
- **Estado activo (IntersectionObserver):** Fuego Profundo (#a3422e) — la variante oscura del acento, no la principal, para no competir visualmente con los CTAs.
- **Tipografía:** 20px, font-medium, tracking -0.04em.

### Accordion
Usado en /servicio (ítems de servicio) y /sectores (FAQs).

- **Borde:** solo `border-b border-brand-border` (#eae8e3) — línea inferior únicamente, no un recuadro.
- **Trigger:** texto Tinta, 18px font-light. Icono +/− en Fuego Controlado a la derecha, `aria-expanded` implementado.
- **Panel:** apertura/cierre condicional (sin animación de altura en estado actual).
- **Padding:** py-4 px-1 en trigger, pb-6 px-1 en contenido.

### Footer
El footer es una superficie completa en Fuego Controlado — el único uso del acento como fondo de página entera.

- **Fondo:** Fuego Controlado (#c8553d). Texto: Tinta (#36383a) — no blanco puro. El contraste grafito sobre terracota evita el look de "landing SaaS genérica" y da más peso visual al pie.
- **Chips:** Fondo Tinta, texto Fondo Mineral. Inversión cromática dentro de la superficie terracota.
- **Altura mínima:** 578px desktop / 420px mobile.

### Inputs / Campos de contacto
- **Estilo:** fondo transparente, borde inferior únicamente (`border-b border-brand-muted`), sin borde lateral ni superior. Sin border-radius.
- **Placeholder:** Voz Secundaria (#6b6b7b) — 4.99:1 sobre Fondo Mineral, pasa WCAG AA.
- **Focus:** sin estado visual diferenciado definido actualmente.

## 6. Do's and Don'ts

### Do:
- **Do** mantener Fuego Controlado en ≤3 posiciones por vista simultánea. Si aparece en más de 3 lugares, identificar y eliminar el menos importante.
- **Do** usar esquinas a 0px en todos los componentes interactivos — buttons, borders de métricas, acordeones. Solo imágenes y placeholders llevan border-radius (4px).
- **Do** usar font-light (300) en todo el texto de cuerpo y descripciones; reservar font-medium (500) para headings, labels y CTAs.
- **Do** usar `border-brand-border` (#eae8e3) como el único mecanismo de separación visual dentro de página. No añadir dividers decorativos extra.
- **Do** verificar contraste antes de usar Voz Secundaria (#6b6b7b): solo es válido sobre Fondo Mineral (#f9f8f6). Sobre cualquier otro fondo, recalcular el ratio (mínimo 4.5:1).
- **Do** mantener el footer en Fuego Controlado en todas las páginas — es el cierre cromático del sistema.

### Don't:
- **Don't** añadir sombras (`box-shadow`) a ningún componente. Si un elemento necesita "destacar", la solución es espacio o contraste cromático.
- **Don't** imitar agencias genéricas SaaS: nada de cards idénticas con icono + título + texto, nada de kickers en mayúsculas sobre cada sección, nada de border-radius de 24px o más en componentes.
- **Don't** imitar agencias creativas maximalistas: sin degradados de texto, sin múltiples familias tipográficas, sin acumulación de texturas o ilustraciones decorativas SVG.
- **Don't** imitar consultoras corporativas frías: sin blues navy como acento activo, sin tipografía serif en headings, sin layouts densos con márgenes ajustados y sin aire.
- **Don't** imitar marketing local sin diseño: sin fondos de color sólido sin jerarquía, sin ausencia de tracking en tipografía, sin elementos sin alineación intencional.
- **Don't** usar `#7a7c7e` ni valores más claros para texto secundario — el ratio de contraste (3.95:1) falla WCAG AA. El umbral mínimo para muted es #6b6b7b (4.99:1) sobre Fondo Mineral.
- **Don't** añadir un segundo color de acento. Si el diseño parece necesitar más color, la respuesta es más espacio o más jerarquía tipográfica, no más cromática.
