import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import { useLocale } from "@/i18n";
import { usePageTitle } from "@/lib/usePageTitle";

export function NotFoundPage() {
  const { t } = useLocale();
  usePageTitle("404");
  return (
    <div className="grid min-h-dvh place-items-center bg-paper px-4">
      <div className="text-center">
        <Logo className="justify-center" />
        <p className="mt-8 font-display text-6xl font-semibold text-ink/15">404</p>
        <h1 className="mt-2 text-xl">{t("notFound.title")}</h1>
        <p className="mt-2 text-sm text-muted">{t("notFound.subtitle")}</p>
        <Button asChild className="mt-6">
          <Link to="/">{t("notFound.home")}</Link>
        </Button>
      </div>
    </div>
  );
}
