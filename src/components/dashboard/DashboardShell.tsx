import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { useLocale } from "@/i18n";
import { cn } from "@/lib/utils";

export interface DashboardNavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  end?: boolean;
}

interface DashboardShellProps {
  navItems: DashboardNavItem[];
  children: ReactNode;
}

/**
 * Shared "panel over canvas" dashboard frame for /student/* and /parent/*:
 * a muted lavender page ground, a labelled icon sidebar, and one large white
 * rounded panel holding the top bar + page content.
 */
export function DashboardShell({ navItems, children }: DashboardShellProps) {
  const { t } = useLocale();

  return (
    <div className="min-h-dvh bg-canvas p-3 pb-24 sm:p-5 sm:pb-5 lg:p-6">
      <div className="mx-auto flex max-w-[1440px] items-start gap-3 lg:gap-4">
        <aside className="sticky top-6 hidden w-20 shrink-0 flex-col items-center gap-2 sm:flex">
          <Link
            to="/"
            title={t("x.nav.home")}
            aria-label={t("x.nav.home")}
            className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-card"
          >
            <Logo withText={false} />
          </Link>
          <nav className="mt-3 flex w-full flex-col gap-1" aria-label="Dashboard navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 rounded-2xl px-1 py-2 text-center text-[11px] font-medium leading-tight transition-colors",
                    isActive ? "bg-ink text-white" : "text-ink/60 hover:bg-ink/[0.06] hover:text-ink",
                  )
                }
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 rounded-[1.75rem] bg-white p-4 shadow-card sm:rounded-[2.25rem] sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav — the sidebar collapses into this below sm */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-ink/[0.06] bg-white px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 sm:hidden"
        aria-label="Dashboard navigation"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-[10px] font-medium",
                isActive ? "text-ink" : "text-muted",
              )
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={cn(
                    "grid h-8 w-12 place-items-center rounded-full transition-colors",
                    isActive && "bg-ink text-white",
                  )}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="w-full truncate text-center">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
