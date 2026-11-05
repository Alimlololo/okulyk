import { useAppStore, useCurrentParent } from "@/store/AppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { SavedIndicator, useSavedFlash } from "@/components/ui/saved-indicator";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { usePageTitle } from "@/lib/usePageTitle";
import { useLocale } from "@/i18n";
import type { NotificationPrefs } from "@/types";

type BoolPref = Exclude<keyof NotificationPrefs, "whatsappPhone">;

const EVENT_SETTINGS: BoolPref[] = ["eveningReminder", "streakLost", "weeklyReport", "newWeakTopic"];
const CHANNEL_SETTINGS: BoolPref[] = ["channelPush", "channelWhatsApp"];

export function ParentNotificationsPage() {
  const parent = useCurrentParent();
  const { updateNotificationPrefs, logout } = useAppStore();
  const { t } = useLocale();
  const [saved, flashSaved] = useSavedFlash();

  usePageTitle(t("parentNotifications.title"));

  if (!parent) return null;
  const prefs = parent.notificationPrefs;

  function update(patch: Partial<NotificationPrefs>) {
    updateNotificationPrefs(parent!.id, patch);
    flashSaved();
  }

  return (
    <div className="space-y-6">
      <DashboardTopBar
        title={t("parentNotifications.title")}
        subtitle={t("parentNotifications.subtitle")}
        avatarName={parent.name}
        avatarColor={parent.avatarColor}
        onLogout={logout}
      />

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted">{t("x.parent.notificationsHint")}</p>
          <SavedIndicator visible={saved} label={t("x.parent.saved")} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("parentNotifications.events")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            {EVENT_SETTINGS.map((key) => (
              <Switch
                key={key}
                label={t(`parentNotifications.${key}Label`)}
                description={t(`parentNotifications.${key}Desc`)}
                checked={Boolean(prefs[key])}
                onCheckedChange={(v) => update({ [key]: v })}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("parentNotifications.channels")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-4">
            {CHANNEL_SETTINGS.map((key) => (
              <Switch
                key={key}
                label={t(`parentNotifications.${key}Label`)}
                description={t(`parentNotifications.${key}Desc`)}
                checked={Boolean(prefs[key])}
                onCheckedChange={(v) => update({ [key]: v })}
              />
            ))}
            {prefs.channelWhatsApp && (
              <div>
                <label htmlFor="wa-phone" className="mb-1.5 block text-sm font-semibold text-ink">
                  {t("x.parent.whatsappPhone")}
                </label>
                <input
                  id="wa-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  defaultValue={prefs.whatsappPhone ?? ""}
                  placeholder={t("x.parent.whatsappPlaceholder")}
                  onBlur={(e) => {
                    if (e.target.value !== (prefs.whatsappPhone ?? "")) update({ whatsappPhone: e.target.value.trim() });
                  }}
                  className="h-11 w-full max-w-xs rounded-xl border-2 border-ink/10 bg-white px-3.5 text-sm text-ink outline-none placeholder:text-ink/30 focus:border-ink"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
