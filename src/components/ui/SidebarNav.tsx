import { cn } from "@/lib/utils";

interface SidebarNavProps {
  items: { id: string; label: string }[];
  activeId: string;
  onSelect: (id: string) => void;
  top?: number;
  ariaLabel?: string;
}

export function SidebarNav({ items, activeId, onSelect, top = 72, ariaLabel }: SidebarNavProps) {
  return (
    <aside
      className="hidden md:flex flex-col sticky self-start w-[33%] shrink-0 px-4 sm:px-16 py-16"
      style={{ top }}
    >
      <nav className="flex flex-col gap-8" aria-label={ariaLabel}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "text-left text-[20px] font-medium tracking-[-0.04em] capitalize transition-colors duration-200",
              activeId === item.id
                ? "text-brand-accent-dark"
                : "text-brand-muted hover:text-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
