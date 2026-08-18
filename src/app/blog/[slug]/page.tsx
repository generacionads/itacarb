import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/wordpress";
import { WpHtml } from "@/components/ui/WpHtml";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const CATEGORY_LABELS: Record<string, string> = {
  "marketing": "Marketing",
  "estrategia": "Estrategia",
  "casos-de-exito": "Casos de éxito",
  "tendencias": "Tendencias",
  "herramientas": "Herramientas",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug).catch(() => null);
  if (!article) return { title: "Artículo no encontrado | Ítacarb" };

  return {
    title: `${article.title} | Ítacarb Blog`,
    description: article.excerpt,
    openGraph: article.cover
      ? {
          images: [{ url: article.cover.url }],
        }
      : undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug).catch(() => null);
  if (!article) notFound();

  const date = article.publishedAt ?? article.createdAt;
  const categoryLabel = article.category ? CATEGORY_LABELS[article.category] : null;

  return (
    <>
      <Header />
      <ReadingProgress />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">
        <article className="flex-1 px-4 sm:px-16 pt-16 pb-20 flex flex-col gap-10">
          {/* Meta bar */}
          <div className="flex items-center gap-3 flex-wrap">
            {categoryLabel && (
              <span className="text-brand-accent text-[12px] font-medium uppercase tracking-[0.1em]">
                {categoryLabel}
              </span>
            )}
            {categoryLabel && (
              <span className="text-brand-border text-[12px]">·</span>
            )}
            <time className="text-brand-muted text-[13px]">{formatDate(date)}</time>
            {article.readTime && (
              <>
                <span className="text-brand-border text-[12px]">·</span>
                <span className="text-brand-muted text-[13px]">{article.readTime} min de lectura</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-foreground text-[40px] md:text-[64px] font-medium tracking-[-0.03em] leading-none text-balance max-w-[800px]">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-brand-muted text-[18px] font-light leading-relaxed max-w-[65ch]">
            {article.excerpt}
          </p>

          {/* Cover image */}
          {article.cover && (
            <div className="relative w-full max-w-[900px] aspect-[16/9] overflow-hidden">
              <Image
                src={article.cover.url}
                alt={article.cover.alternativeText ?? article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Article content */}
          {article.contentHtml && (
            <div className="max-w-[700px]">
              <WpHtml html={article.contentHtml} />
            </div>
          )}

          {/* Back link */}
          <div className="pt-12 border-t border-brand-border max-w-[700px]">
            <a
              href="/blog"
              className="group inline-flex items-center gap-2 text-foreground text-[14px] font-medium hover:text-brand-accent transition-colors duration-200"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-1"
              >
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
