import { useParentContext } from "@/pages/parent/ParentShell";
import { useAppStore, useCurrentParent } from "@/store/AppStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { SavedIndicator, useSavedFlash } from "@/components/ui/saved-indicator";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { ChildSwitcherCompact } from "@/components/parent/ChildSwitcherCompact";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { LOAD_LEVELS, LOAD_TASK_COUNTS, DEFAULT_LOAD_LEVEL } from "@/data/load";
import { usePageTitle } from "@/lib/usePageTitle";
import { useLocale } from "@/i18n";
import { cn } from "@/lib/utils";
import type { LoadLevel } from "@/types";

const LOAD_LABEL_KEY: Record<LoadLevel, string> = {
  light: "parentSettings.levelLight",
  standard: "parentSettings.levelStandard",
  intense: "parentSettings.levelIntense",
};

export function ParentSettingsPage() {
  const { child, childId, setChildId, children } = useParentContext();
  const parent = useCurrentParent()!;
  const { updateSubjectLoad, logout } = useAppStore();
  const { t } = useLocale();
  const [saved, flashSaved] = useSavedFlash();

  usePageTitle(t("parentSettings.title"));

  return (
    <div className="space-y-6">
      <DashboardTopBar
        title={t("parentSettings.title")}
        subtitle={t("parentSettings.subtitle", { name: child.name })}
        avatarName={parent.name}
        avatarColor={parent.avatarColor}
        onLogout={logout}
        notificationsHref="/parent/notifications"
        identityExtra={<ChildSwitcherCompact items={children} value={childId} onChange={setChildId} />}
      />

      <div className="mx-auto max-w-2xl space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-muted">
            {t("x.parent.selectedOnly", { name: child.name })} {t("parentSettings.savedHint")}
          </p>
          <SavedIndicator visible={saved} label={t("x.parent.saved")} />
        </div>

        {child.selectedSubjects.length === 0 && (
          <EmptyState icon="📚" title={t("x.parent.noSubjects", { name: child.name })} />
        )}

        {child.selectedSubjects.map((subjectId) => {
          const level = child.subjectLoad?.[subjectId] ?? DEFAULT_LOAD_LEVEL;
          return (
            <Card key={subjectId}>
              <CardHeader className="flex flex-row items-center gap-3 pb-3">
                <SubjectIcon subjectId={subjectId} />
                <CardTitle className="text-base">{t(`subjects.${subjectId}.name`)}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label={t(`subjects.${subjectId}.name`)}>
                  {LOAD_LEVELS.map((candidate) => {
                    const active = candidate === level;
                    return (
                      <button
                        key={candidate}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          if (active) return;
                          updateSubjectLoad(child.id, subjectId, candidate);
                          flashSaved();
                        }}
                        className={cn(
                          "rounded-xl border-2 px-2 py-2.5 text-center transition-colors",
                          active ? "border-berry bg-berry-soft" : "border-ink/10 bg-white hover:border-ink/25",
                        )}
                      >
                        <span className="block text-sm font-bold text-ink">{t(LOAD_LABEL_KEY[candidate])}</span>
                        <span className="block text-xs text-muted">
                          {t("parentSettings.tasksPerDay", { count: LOAD_TASK_COUNTS[candidate] })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
