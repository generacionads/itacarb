import Image from "next/image";
import { getStrapiImageUrl, type StrapiBlock } from "@/lib/strapi";

type TextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

type LinkNode = {
  type: "link";
  url: string;
  children: TextNode[];
};

type InlineNode = TextNode | LinkNode;

function renderInline(node: InlineNode, i: number) {
  if (node.type === "link") {
    return (
      <a
        key={i}
        href={node.url}
        target={node.url.startsWith("http") ? "_blank" : undefined}
        rel={node.url.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-brand-accent underline underline-offset-2 hover:text-brand-accent-dark transition-colors"
      >
        {node.children.map((c, j) => renderText(c, j))}
      </a>
    );
  }
  return renderText(node as TextNode, i);
}

function renderText(node: TextNode, i: number) {
  let el: React.ReactNode = node.text;
  if (node.code) el = <code key={i} className="font-mono text-[0.875em] bg-brand-border px-1.5 py-0.5 rounded">{el}</code>;
  if (node.bold) el = <strong key={i} className="font-semibold">{el}</strong>;
  if (node.italic) el = <em key={i}>{el}</em>;
  if (node.underline) el = <u key={i}>{el}</u>;
  if (node.strikethrough) el = <s key={i}>{el}</s>;
  return <span key={i}>{el}</span>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Block({ node }: { node: StrapiBlock & Record<string, any> }) {
  const children = (node.children ?? []) as InlineNode[];

  switch (node.type) {
    case "paragraph":
      if (!children.length || (children.length === 1 && (children[0] as TextNode).text === "")) {
        return <div className="h-4" />;
      }
      return (
        <p className="text-foreground text-[17px] font-light leading-[1.75] text-pretty">
          {children.map((c, i) => renderInline(c, i))}
        </p>
      );

    case "heading": {
      const level = node.level as 1 | 2 | 3 | 4 | 5 | 6;
      const styles: Record<number, string> = {
        1: "text-[36px] font-medium tracking-[-0.03em] leading-tight",
        2: "text-[28px] font-medium tracking-[-0.03em] leading-tight",
        3: "text-[22px] font-medium tracking-[-0.02em] leading-snug",
        4: "text-[18px] font-medium",
        5: "text-[16px] font-medium",
        6: "text-[14px] font-medium uppercase tracking-[0.06em]",
      };
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return (
        <Tag className={`text-foreground ${styles[level]}`}>
          {children.map((c, i) => renderInline(c, i))}
        </Tag>
      );
    }

    case "list": {
      const isOrdered = node.format === "ordered";
      const Tag = isOrdered ? "ol" : "ul";
      const listStyle = isOrdered
        ? "list-decimal list-inside space-y-2"
        : "list-disc list-inside space-y-2";
      return (
        <Tag className={`text-foreground text-[17px] font-light leading-relaxed ${listStyle} pl-2`}>
          {(node.children as StrapiBlock[]).map((item, i) => (
            <li key={i}>
              {((item.children ?? []) as InlineNode[]).map((c, j) => renderInline(c, j))}
            </li>
          ))}
        </Tag>
      );
    }

    case "quote":
      return (
        <blockquote className="border-l-2 border-brand-accent pl-6 py-1">
          <p className="text-foreground text-[18px] font-light leading-relaxed italic">
            {children.map((c, i) => renderInline(c, i))}
          </p>
        </blockquote>
      );

    case "code":
      return (
        <pre className="bg-brand-border rounded-[4px] px-5 py-4 overflow-x-auto">
          <code className="font-mono text-[14px] text-foreground leading-relaxed">
            {children.map((c, i) => (c as TextNode).text).join("")}
          </code>
        </pre>
      );

    case "image": {
      const img = node.image as { url: string; alternativeText?: string; width?: number; height?: number } | undefined;
      if (!img) return null;
      return (
        <figure className="w-full">
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-placeholder">
            <Image
              src={getStrapiImageUrl(img.url)}
              alt={img.alternativeText ?? ""}
              fill
              className="object-cover"
            />
          </div>
          {img.alternativeText && (
            <figcaption className="mt-2 text-[13px] text-brand-muted text-center">
              {img.alternativeText}
            </figcaption>
          )}
        </figure>
      );
    }

    default:
      return null;
  }
}

export function StrapiBlocks({ blocks }: { blocks: StrapiBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => (
        <Block key={i} node={block as StrapiBlock & Record<string, unknown>} />
      ))}
    </div>
  );
}
