import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getArticleBySlug, getArticles } from "@/lib/wordpress";
import type { WpArticle } from "@/lib/wordpress";
import { WpHtml } from "@/components/ui/WpHtml";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const CATEGORY_LABELS: Record<string, string> = {
  "marketing": "Marketing",
  "estrategia": "Estrategia",
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

function RelatedCard({ article }: { article: WpArticle }) {
  const label = article.category ? CATEGORY_LABELS[article.category] : null;
  return (
    <a
      href={`/blog/${article.slug}`}
      className="group flex flex-col gap-4 border border-brand-border hover:border-foreground transition-colors duration-200"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-brand-border">
        {article.cover && (
          <Image
            src={article.cover.url}
            alt={article.cover.alternativeText ?? article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="px-5 pb-6 flex flex-col gap-2">
        {label && (
          <span className="text-brand-accent text-[11px] font-medium uppercase tracking-[0.1em]">
            {label}
          </span>
        )}
        <p className="text-foreground text-[18px] font-medium tracking-[-0.02em] leading-snug group-hover:text-brand-accent transition-colors duration-200 line-clamp-3">
          {article.title}
        </p>
        <span className="text-brand-muted text-[13px]">{formatDate(article.publishedAt)}</span>
      </div>
    </a>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug).catch(() => null);
  if (!article) return { title: "Artículo no encontrado" };

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: article.cover
      ? { images: [{ url: article.cover.url }] }
      : undefined,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug).catch(() => null),
    getArticles().catch(() => [] as WpArticle[]),
  ]);
  if (!article) notFound();

  const categoryLabel = article.category ? CATEGORY_LABELS[article.category] : null;

  const related = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3);

  // Fallback: si no hay suficientes de la misma categoría, completa con recientes
  if (related.length < 3) {
    const extra = allArticles
      .filter((a) => a.slug !== slug && !related.find((r) => r.slug === a.slug))
      .slice(0, 3 - related.length);
    related.push(...extra);
  }

  return (
    <>
      <Header />
      <ReadingProgress />
      <main className="pt-[72px] bg-background min-h-screen flex flex-col">
        <article className="flex-1 px-4 sm:px-8 pt-16 pb-20">
          <div className="max-w-[780px] mx-auto flex flex-col gap-10">

            {/* Meta bar */}
            <div className="flex items-center gap-3 flex-wrap">
              {categoryLabel && (
                <span className="text-brand-accent text-[12px] font-medium uppercase tracking-[0.1em]">
                  {categoryLabel}
                </span>
              )}
              {categoryLabel && <span className="text-brand-border text-[12px]">·</span>}
              <time className="text-brand-muted text-[13px]">{formatDate(article.publishedAt)}</time>
              {article.readTime && (
                <>
                  <span className="text-brand-border text-[12px]">·</span>
                  <span className="text-brand-muted text-[13px]">{article.readTime} min de lectura</span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-foreground text-[40px] md:text-[64px] font-medium tracking-[-0.03em] leading-none text-balance">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-brand-muted text-[18px] font-light leading-relaxed">
              {article.excerpt}
            </p>

            {/* Cover image */}
            {article.cover && (
              <div className="relative w-full aspect-[16/9] overflow-hidden">
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
              <WpHtml html={article.contentHtml} />
            )}

            {/* Back link */}
            <div className="pt-12 border-t border-brand-border">
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
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="max-w-[1100px] mx-auto mt-24 flex flex-col gap-10">
              <h2 className="text-foreground text-[28px] font-medium tracking-[-0.03em]">
                También te puede interesar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <RelatedCard key={rel.slug} article={rel} />
                ))}
              </div>
            </div>
          )}
        </article>

        <Footer />
      </main>
    </>
  );
}
