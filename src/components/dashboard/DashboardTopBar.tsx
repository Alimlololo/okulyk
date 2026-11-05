import type { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import { Avatar } from "@/components/shared/Avatar";
import { Sparkle } from "@/components/shared/Decor";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useLocale } from "@/i18n";

interface DashboardTopBarProps {
  title: string;
  subtitle: string;
  avatarName: string;
  avatarColor: string;
  onLogout: () => void;
  /** e.g. a child switcher, rendered right before the account pill. */
  identityExtra?: ReactNode;
  /** When set, a bell button links to the notification settings. */
  notificationsHref?: string;
}

/** Page title + language / notifications / account controls inside the dashboard panel. */
export function DashboardTopBar({
  title,
  subtitle,
  avatarName,
  avatarColor,
  onLogout,
  identityExtra,
  notificationsHref,
}: DashboardTopBarProps) {
  const { t } = useLocale();
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/", { replace: true });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0">
        <h1 className="flex items-center gap-2 text-[1.7rem] sm:text-[2.1rem]">
          <span>{title}</span>
          <Sparkle color="sun" size={22} />
        </h1>
        <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        {notificationsHref && (
          <Link
            to={notificationsHref}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 text-ink/60 hover:text-ink"
            aria-label={t("dashboardTop.notifications")}
            title={t("dashboardTop.notifications")}
          >
            <Bell className="h-4 w-4" aria-hidden="true" />
          </Link>
        )}
        {identityExtra}
        <div className="flex items-center gap-2 rounded-pill border border-ink/10 py-1 pl-1 pr-1">
          <Avatar name={avatarName} color={avatarColor} size="sm" />
          <span className="max-w-[10rem] truncate text-sm font-semibold text-ink">{avatarName}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold text-muted hover:bg-ink/[0.05] hover:text-ink"
            title={t("dashboardTop.logout")}
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            {t("dashboardTop.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
