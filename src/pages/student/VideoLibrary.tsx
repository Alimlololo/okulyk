import { useEffect, useRef, useState } from "react";
import { Check, Play, Video, X } from "lucide-react";
import { useAppStore, useCurrentStudent } from "@/store/AppStore";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { SubjectIcon } from "@/components/shared/SubjectIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LESSONS } from "@/data/lessons";
import { getSubject, SUBJECTS } from "@/data/subjects";
import { useLocale } from "@/i18n";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/lib/usePageTitle";
import type { Lesson, SubjectId } from "@/types";

export function VideoLibraryPage() {
  const student = useCurrentStudent();
  const { logout, markVideoWatched } = useAppStore();
  const { t } = useLocale();
  const [subjectFilter, setSubjectFilter] = useState<SubjectId | "all">("all");
  const [gradeFilter, setGradeFilter] = useState<number | "all">("all");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  usePageTitle(t("videos.title"));

  if (!student) return null;

  const grades = Array.from(new Set(LESSONS.map((l) => l.grade))).sort((a, b) => a - b);
  const filtered = LESSONS.filter(
    (l) =>
      (subjectFilter === "all" || l.subjectId === subjectFilter) &&
      (gradeFilter === "all" || l.grade === gradeFilter),
  );
  const watched = new Set(student.watchedVideoIds ?? []);

  return (
    <div className="space-y-6">
      <DashboardTopBar
        title={t("videos.title")}
        subtitle={t("videos.subtitle")}
        avatarName={student.name}
        avatarColor={student.avatarColor}
        onLogout={logout}
      />

      <div className="space-y-2">
        <FilterRow label={t("x.videos.subjectLabel")}>
          <FilterPill active={subjectFilter === "all"} onClick={() => setSubjectFilter("all")}>
            {t("videos.allSubjects")}
          </FilterPill>
          {SUBJECTS.map((s) => (
            <FilterPill key={s.id} active={subjectFilter === s.id} onClick={() => setSubjectFilter(s.id)}>
              <span className="mr-1" aria-hidden="true">
                {s.icon}
              </span>
              {t(`subjects.${s.id}.name`)}
            </FilterPill>
          ))}
        </FilterRow>
        <FilterRow label={t("x.videos.gradeLabel")}>
          <FilterPill active={gradeFilter === "all"} onClick={() => setGradeFilter("all")}>
            {t("videos.allGrades")}
          </FilterPill>
          {grades.map((g) => (
            <FilterPill key={g} active={gradeFilter === g} onClick={() => setGradeFilter(g)}>
              {t("videos.gradeShort", { grade: g })}
            </FilterPill>
          ))}
        </FilterRow>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🎬"
          title={t("x.videos.emptyTitle")}
          description={t("x.videos.emptyDesc")}
          action={
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSubjectFilter("all");
                setGradeFilter("all");
              }}
            >
              {t("x.videos.reset")}
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lesson) => {
            const subject = getSubject(lesson.subjectId);
            const isWatched = watched.has(lesson.id);
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => setActiveLesson(lesson)}
                className="group overflow-hidden rounded-card border border-ink/[0.06] bg-white text-left shadow-card transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="relative flex aspect-[16/8] items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${subject.color}22, ${subject.color}0a)` }}
                >
                  <span
                    className="grid h-12 w-12 place-items-center rounded-full text-white shadow-pop transition-transform group-hover:scale-105"
                    style={{ backgroundColor: subject.color }}
                  >
                    <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" aria-hidden="true" />
                  </span>
                  <span className="absolute left-2.5 top-2.5">
                    <Badge tone="neutral" className="bg-white/85">
                      {lesson.durationMin} {t("lesson.duration")}
                    </Badge>
                  </span>
                  {isWatched && (
                    <span className="absolute right-2.5 top-2.5">
                      <Badge tone="mint" className="bg-white/90">
                        <Check className="h-3 w-3" aria-hidden="true" />
                        {t("x.videos.watched")}
                      </Badge>
                    </span>
                  )}
                </div>
                <div className="flex items-start gap-2.5 p-3.5">
                  <SubjectIcon subjectId={lesson.subjectId} size="sm" />
                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-bold text-ink">{lesson.title}</p>
                    <p className="mt-0.5 text-xs text-muted">
                      {t(`subjects.${lesson.subjectId}.name`)} · {t("videos.gradeShort", { grade: lesson.grade })}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {activeLesson && (
        <VideoPlayerModal
          lesson={activeLesson}
          watched={watched.has(activeLesson.id)}
          onMarkWatched={() => markVideoWatched(student.id, activeLesson.id)}
          onClose={() => setActiveLesson(null)}
        />
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden w-16 shrink-0 text-xs font-semibold text-muted sm:block">{label}</span>
      <div className="-mx-1 flex min-w-0 flex-1 gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
        {children}
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 whitespace-nowrap rounded-pill px-3 py-1.5 text-xs font-semibold transition-colors",
        active ? "bg-ink text-white" : "bg-ink/[0.05] text-ink/70 hover:bg-ink/[0.08]",
      )}
    >
      {children}
    </button>
  );
}

function VideoPlayerModal({
  lesson,
  watched,
  onMarkWatched,
  onClose,
}: {
  lesson: Lesson;
  watched: boolean;
  onMarkWatched: () => void;
  onClose: () => void;
}) {
  const subject = getSubject(lesson.subjectId);
  const { t } = useLocale();
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `video-title-${lesson.id}`;

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      prevFocus?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div className="w-full max-w-lg overflow-hidden rounded-card bg-white shadow-pop" onClick={(e) => e.stopPropagation()}>
        <div
          className="relative flex aspect-video items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${subject.color}33, ${subject.color}11)` }}
        >
          <div className="max-w-xs px-6 text-center">
            <Video className="mx-auto h-8 w-8 text-ink/50" aria-hidden="true" />
            <p className="mt-2 text-sm font-bold text-ink">{t("x.lesson.videoSoonTitle")}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("videos.close")}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink hover:bg-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {t(`subjects.${lesson.subjectId}.name`)} · {t("videos.gradeShort", { grade: lesson.grade })}
          </p>
          <h2 id={titleId} className="mt-1 text-lg font-bold text-ink">
            {lesson.title}
          </h2>
          <p className="mt-2 text-sm text-ink/75">{lesson.summary}</p>
          <div className="mt-4 flex justify-end">
            {watched ? (
              <Badge tone="mint">
                <Check className="h-3 w-3" aria-hidden="true" />
                {t("x.videos.watched")}
              </Badge>
            ) : (
              <Button size="sm" variant="outline" onClick={onMarkWatched}>
                <Check className="h-4 w-4" aria-hidden="true" />
                {t("x.videos.markWatched")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
