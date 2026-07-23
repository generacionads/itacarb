import { cn } from "@/lib/utils";

export function WpHtml({ html }: { html: string }) {
  const clean = html
    .replace(/\s+class="[^"]*"/g, "")
    .replace(/\s+id="[^"]*"/g, "");

  return (
    <div
      className={cn(
        "text-foreground text-[17px] font-light leading-[1.75]",
        "[&_p]:mb-5 [&_p:last-child]:mb-0",
        "[&_h2]:text-[26px] [&_h2]:font-medium [&_h2]:tracking-[-0.03em] [&_h2]:leading-tight [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-foreground",
        "[&_h3]:text-[20px] [&_h3]:font-medium [&_h3]:tracking-[-0.02em] [&_h3]:leading-snug [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-foreground",
        "[&_h4]:text-[17px] [&_h4]:font-medium [&_h4]:mt-6 [&_h4]:mb-2",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:space-y-2",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:space-y-2",
        "[&_li]:text-foreground [&_li]:leading-relaxed",
        "[&_strong]:font-semibold [&_strong]:text-foreground",
        "[&_em]:italic",
        "[&_a]:text-brand-accent [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:opacity-80",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-brand-accent [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:text-brand-muted",
        "[&_code]:font-mono [&_code]:text-[0.875em] [&_code]:bg-brand-border [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded",
        "[&_pre]:bg-brand-border [&_pre]:rounded-[4px] [&_pre]:px-5 [&_pre]:py-4 [&_pre]:overflow-x-auto [&_pre]:mb-5",
        "[&_hr]:border-brand-border [&_hr]:my-8",
        "[&_img]:max-w-full [&_img]:my-6",
      )}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
