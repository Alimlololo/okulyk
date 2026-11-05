import { Link } from "react-router-dom";
import { Logo } from "@/components/shared/Logo";
import { SUBJECTS } from "@/data/subjects";
import { useLocale } from "@/i18n";

export function SiteFooter() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-ink/[0.06] bg-paper">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">{t("footer.tagline")}</p>
        </div>

        <nav aria-label="Subjects">
          <h4 className="text-sm font-bold text-ink">{t("footer.subjects")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {SUBJECTS.map((s) => (
              <li key={s.id}>
                <a href="/#subjects" className="hover:text-ink">
                  <span className="mr-1.5" aria-hidden="true">
                    {s.icon}
                  </span>
                  {t(`subjects.${s.id}.name`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Platform">
          <h4 className="text-sm font-bold text-ink">{t("footer.platform")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <a href="/#how" className="hover:text-ink">
                {t("nav.how")}
              </a>
            </li>
            <li>
              <a href="/#streak" className="hover:text-ink">
                {t("footer.aboutStreak")}
              </a>
            </li>
            <li>
              <a href="/#faq" className="hover:text-ink">
                {t("nav.faq")}
              </a>
            </li>
            <li>
              <Link to="/auth" className="hover:text-ink">
                {t("footer.register")}
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <h4 className="text-sm font-bold text-ink">{t("footer.accounts")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li>
              <Link to="/auth?role=student" className="hover:text-ink">
                {t("footer.iAmStudent")}
              </Link>
            </li>
            <li>
              <Link to="/auth?role=parent" className="hover:text-ink">
                {t("footer.iAmParent")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/[0.06]">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
          <p>{t("footer.madeFor")}</p>
        </div>
      </div>
    </footer>
  );
}
