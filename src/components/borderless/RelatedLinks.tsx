import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass } from "lucide-react";
import type { RelatedLink } from "@/lib/related-links";

type Group = { heading: string; links: RelatedLink[] };

export function RelatedLinks({ groups, title = "Keep reading" }: { groups: Group[]; title?: string }) {
  const visible = groups.filter((g) => g.links.length > 0);
  if (!visible.length) return null;

  return (
    <nav aria-label="Related pages" className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-2">
        <Compass className="h-4 w-4 text-primary" strokeWidth={1.8} />
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="mt-4 space-y-5">
        {visible.map((group) => (
          <div key={group.heading}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-mono">{group.heading}</p>
            <ul className="mt-2 space-y-2">
              {group.links.map((l) => (
                <li key={l.key}>
                  <Link
                    to={l.href}
                    className="flex items-start justify-between gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary"
                  >
                    <span className="min-w-0">
                      {l.prefix && (
                        <span className="block text-[9px] uppercase tracking-[0.25em] text-primary font-mono">{l.prefix}</span>
                      )}
                      <span className="mt-0.5 block text-sm font-medium text-foreground">{l.label}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">{l.note}</span>
                    </span>
                    <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
