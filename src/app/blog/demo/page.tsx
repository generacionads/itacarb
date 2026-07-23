import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StrapiBlocks } from "@/components/ui/StrapiBlocks";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import type { StrapiBlock } from "@/lib/strapi";

const DEMO_CONTENT: StrapiBlock[] = [
  {
    type: "paragraph",
    children: [{ type: "text", text: "Cuando el Dr. Morales Raya nos contactó, su clínica dental en Sevilla llevaba 12 años funcionando. Buenos pacientes, excelente reputación en el barrio, y un crecimiento que dependía casi por completo del boca a boca. El problema: ese modelo tiene techo." }],
  },
  {
    type: "heading",
    level: 2,
    children: [{ type: "text", text: "El diagnóstico inicial" }],
  },
  {
    type: "paragraph",
    children: [{ type: "text", text: "Al analizar su situación encontramos tres cuellos de botella claros:" }],
  },
  {
    type: "list",
    format: "unordered",
    children: [
      { type: "list-item", children: [{ type: "text", text: "Ninguna presencia en buscadores para términos como \"clínica dental Sevilla\" o \"implantes dentales Sevilla\"." }] },
      { type: "list-item", children: [{ type: "text", text: "Perfil de Google Business desactualizado, sin fotos profesionales ni respuestas a reseñas." }] },
      { type: "list-item", children: [{ type: "text", text: "Web antigua, sin formulario de contacto funcional y con tiempo de carga superior a 5 segundos en móvil." }] },
    ],
  },
  {
    type: "heading",
    level: 2,
    children: [{ type: "text", text: "La estrategia en tres fases" }],
  },
  {
    type: "paragraph",
    children: [
      { type: "text", text: "Diseñamos un plan de 9 meses dividido en tres fases bien diferenciadas. La clave fue " },
      { type: "text", text: "no intentar hacer todo a la vez", bold: true },
      { type: "text", text: ", sino priorizar lo que generaría resultados más rápido." },
    ],
  },
  {
    type: "heading",
    level: 3,
    children: [{ type: "text", text: "Fase 1 — Visibilidad local (meses 1-3)" }],
  },
  {
    type: "paragraph",
    children: [{ type: "text", text: "Optimizamos el perfil de Google Business con fotografías profesionales de las instalaciones, actualización del horario y servicios, y una estrategia sistemática para solicitar reseñas a pacientes satisfechos. En 60 días, la clínica pasó de 18 a 74 reseñas con una valoración media de 4,8 estrellas." }],
  },
  {
    type: "heading",
    level: 3,
    children: [{ type: "text", text: "Fase 2 — Captación digital (meses 4-6)" }],
  },
  {
    type: "paragraph",
    children: [{ type: "text", text: "Lanzamos campañas de Google Ads enfocadas en los servicios de mayor ticket: implantes, ortodoncia invisible y carillas. El coste por lead inicial fue de 28€, que bajamos a 14€ en el tercer mes optimizando las audiencias y los creativos." }],
  },
  {
    type: "quote",
    children: [{ type: "text", text: "En cuatro meses pasamos de recibir 3-4 consultas nuevas a la semana a más de 25. Tuvimos que contratar a una recepcionista adicional." }],
  },
  {
    type: "heading",
    level: 3,
    children: [{ type: "text", text: "Fase 3 — Consolidación y fidelización (meses 7-9)" }],
  },
  {
    type: "paragraph",
    children: [{ type: "text", text: "Con la captación funcionando, el foco cambió a la retención. Implementamos un sistema de recordatorios automatizados para revisiones anuales y lanzamos una newsletter mensual con consejos de salud dental. La tasa de retención pasó del 61% al 84%." }],
  },
  {
    type: "heading",
    level: 2,
    children: [{ type: "text", text: "Los resultados" }],
  },
  {
    type: "paragraph",
    children: [{ type: "text", text: "Al terminar los 9 meses, la clínica había pasado de unos ingresos mensuales de 28.000€ a 86.000€. No por casualidad, sino por construir un sistema de captación reproducible y medible." }],
  },
  {
    type: "paragraph",
    children: [
      { type: "text", text: "¿Tu negocio está en una situación similar? " },
      { type: "text", text: "Hablemos.", bold: true },
    ],
  },
];

export default function BlogDemoPage() {
  return (
    <>
      <Header />
      <ReadingProgress />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">
        <article className="flex-1 px-4 sm:px-16 pt-16 pb-20 flex flex-col gap-10">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-brand-accent text-[12px] font-medium uppercase tracking-[0.1em]">
              Casos de éxito
            </span>
            <span className="text-brand-border text-[12px]">·</span>
            <time className="text-brand-muted text-[13px]">23 de julio de 2026</time>
            <span className="text-brand-border text-[12px]">·</span>
            <span className="text-brand-muted text-[13px]">7 min de lectura</span>
          </div>

          <h1 className="text-foreground text-[40px] md:text-[64px] font-medium tracking-[-0.03em] leading-none text-balance max-w-[800px]">
            Cómo multiplicar por 3 la facturación de una clínica dental en 9 meses
          </h1>

          <p className="text-brand-muted text-[18px] font-light leading-relaxed max-w-[65ch]">
            El caso real de Clínica Dr. Morales Raya: de depender del boca a boca a construir un sistema de captación digital que genera pacientes nuevos cada semana.
          </p>

          <div className="relative w-full max-w-[900px] aspect-[16/9] overflow-hidden bg-placeholder" />

          <div className="max-w-[700px]">
            <StrapiBlocks blocks={DEMO_CONTENT} />
          </div>

          <div className="pt-12 border-t border-brand-border max-w-[700px]">
            <a
              href="/blog"
              className="group inline-flex items-center gap-2 text-foreground text-[14px] font-medium hover:text-brand-accent transition-colors duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:-translate-x-1">
                <path d="M19 12 L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M11 6 L5 12 L11 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Volver al blog
            </a>
          </div>
        </article>

        <Footer />
      </main>
    </>
  );
}
