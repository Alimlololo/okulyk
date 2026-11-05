import { BookOpenCheck, Flame, ListChecks } from "lucide-react";
import { useParentContext } from "@/pages/parent/ParentShell";
import { useActivity, useAppStore, useCurrentParent } from "@/store/AppStore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { ChildSwitcherCompact } from "@/components/parent/ChildSwitcherCompact";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { usePageTitle } from "@/lib/usePageTitle";
import { useRelativeTime } from "@/lib/useActivityRows";
import { useLocale } from "@/i18n";
import type { ActivityEntry } from "@/types";

export function ParentActivityPage() {
  const { child, childId, setChildId, children } = useParentContext();
  const parent = useCurrentParent()!;
  const { logout } = useAppStore();
  const entries = useActivity(child.id);
  const { t } = useLocale();

  usePageTitle(t("parentActivity.title"));

  return (
    <div className="space-y-6">
      <DashboardTopBar
        title={t("parentActivity.title")}
        subtitle={t("parentActivity.subtitle", { name: child.name })}
        avatarName={parent.name}
        avatarColor={parent.avatarColor}
        onLogout={logout}
        notificationsHref="/parent/notifications"
        identityExtra={<ChildSwitcherCompact items={children} value={childId} onChange={setChildId} />}
      />

      {entries.length === 0 ? (
        <EmptyState
          icon="🗒️"
          title={t("parentActivity.emptyTitle")}
          description={t("parentActivity.emptyDesc", { name: child.name })}
        />
      ) : (
        <ol className="mx-auto max-w-3xl space-y-3">
          {entries.map((entry) => (
            <li key={entry.id}>
              <ActivityRow entry={entry} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function ActivityRow({ entry }: { entry: ActivityEntry }) {
  const { t } = useLocale();
  const when = useRelativeTime();
  const scorePct = entry.score ? Math.round((entry.score.correct / entry.score.total) * 100) : null;

  return (
    <Card className="shadow-none">
      <CardContent className="flex items-center gap-3 py-4">
        {entry.subjectId ? (
          <SubjectIcon subjectId={entry.subjectId} />
        ) : (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-butter-soft text-butter-ink">
            <Flame className="h-5 w-5" aria-hidden="true" />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <p className="text-sm font-semibold text-ink">{entry.title}</p>
            <KindBadge kind={entry.kind} />
          </div>
          <p className="mt-0.5 text-xs text-muted">
            {entry.subjectId ? `${t(`subjects.${entry.subjectId}.name`)} · ` : ""}
            {when(entry.date)}
          </p>
        </div>

        <div className="shrink-0 text-right">
          {scorePct !== null && entry.score && (
            <p
              className={`text-sm font-bold ${
                scorePct >= 80 ? "text-mint-ink" : scorePct >= 50 ? "text-butter-ink" : "text-rose-700"
              }`}
            >
              {entry.score.correct}/{entry.score.total}
            </p>
          )}
          <p className="text-xs text-muted">+{entry.xp} XP</p>
        </div>
      </CardContent>
    </Card>
  );
}

function KindBadge({ kind }: { kind: ActivityEntry["kind"] }) {
  const { t } = useLocale();
  if (kind === "lesson_completed")
    return (
      <Badge tone="neutral">
        <BookOpenCheck className="h-3 w-3" aria-hidden="true" />
        {t("parentActivity.lesson")}
      </Badge>
    );
  if (kind === "practice_completed")
    return (
      <Badge tone="neutral">
        <ListChecks className="h-3 w-3" aria-hidden="true" />
        {t("parentActivity.practice")}
      </Badge>
    );
  return (
    <Badge tone="neutral">
      <Flame className="h-3 w-3" aria-hidden="true" />
      {t("parentActivity.streakKind")}
    </Badge>
  );
}
