import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useLocale();

  const NAV = [
    { href: "/#how", label: t("nav.how") },
    { href: "/#subjects", label: t("nav.subjects") },
    { href: "/#streak", label: t("nav.streak") },
    { href: "/#parents", label: t("nav.parents") },
    { href: "/#faq", label: t("nav.faq") },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur-md">
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Link to="/" className="shrink-0 rounded-lg" aria-label="Munara — home">
          <Logo />
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-pill px-3 py-2 text-[15px] font-semibold text-ink/75 transition-colors hover:bg-snow hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            to="/auth?mode=login"
            className="text-[15px] font-bold text-ink transition-colors hover:text-berry"
          >
            {t("common.login")}
          </Link>
          <Button size="sm" variant="outline" className="group" onClick={() => navigate("/auth")}>
            {t("common.startFree")}
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-pill text-ink hover:bg-ink/[0.05] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-ink/[0.06] bg-paper shadow-float lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-page flex flex-col py-3" aria-label="Mobile navigation">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-pill px-3 py-3 text-base font-semibold text-ink/80 hover:bg-snow hover:text-ink"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-2 flex items-center justify-between gap-2 px-1">
            <LanguageSwitcher />
          </div>
          <div className="mt-2 flex gap-2 px-1">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setOpen(false);
                navigate("/auth?mode=login");
              }}
            >
              {t("common.login")}
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setOpen(false);
                navigate("/auth");
              }}
            >
              {t("common.startFree")}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
