import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { lazy, Suspense, type ReactNode } from "react";
import { useSession } from "@/store/AppStore";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { LandingPage } from "@/pages/Landing";
import { AuthPage } from "@/pages/Auth";
import { NotFoundPage } from "@/pages/NotFound";
import { StudentShell } from "@/pages/student/StudentShell";
import { StudentDashboard } from "@/pages/student/StudentDashboard";
import { MySubjectsPage } from "@/pages/student/MySubjects";
import { LessonPage } from "@/pages/student/LessonPage";
import { OnboardingPage } from "@/pages/student/Onboarding";
import { DiagnosticPage } from "@/pages/student/Diagnostic";
import { VideoLibraryPage } from "@/pages/student/VideoLibrary";
import { ParentShell } from "@/pages/parent/ParentShell";
// The overview pulls in recharts — load it on demand so the landing page stays light.
const ParentOverview = lazy(() =>
  import("@/pages/parent/ParentOverview").then((m) => ({ default: m.ParentOverview })),
);
import { ParentActivityPage } from "@/pages/parent/ParentActivity";
import { ParentNotificationsPage } from "@/pages/parent/ParentNotifications";
import { ParentSettingsPage } from "@/pages/parent/ParentSettings";

function RequireRole({ role, children }: { role: "student" | "parent"; children: ReactNode }) {
  const session = useSession();
  const location = useLocation();
  if (!session) {
    return <Navigate to={`/auth?role=${role}`} replace state={{ from: location.pathname }} />;
  }
  if (session.role !== role) {
    return <Navigate to={session.role === "student" ? "/student" : "/parent"} replace />;
  }
  return <>{children}</>;
}

/** Remount the lesson per id so "next task" never inherits the previous lesson state. */
function LessonRoute() {
  const { lessonId = "" } = useParams();
  return <LessonPage key={lessonId} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<LandingPage />} />
      </Route>

      <Route path="/auth" element={<AuthPage />} />

      <Route
        path="/student"
        element={
          <RequireRole role="student">
            <StudentShell />
          </RequireRole>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="subjects" element={<MySubjectsPage />} />
        <Route path="videos" element={<VideoLibraryPage />} />
        <Route path="lesson/:lessonId" element={<LessonRoute />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="diagnostic" element={<DiagnosticPage />} />
      </Route>

      <Route
        path="/parent"
        element={
          <RequireRole role="parent">
            <ParentShell />
          </RequireRole>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<div className="h-64 animate-pulse rounded-card bg-ink/[0.04]" />}>
              <ParentOverview />
            </Suspense>
          }
        />
        <Route path="activity" element={<ParentActivityPage />} />
        <Route path="notifications" element={<ParentNotificationsPage />} />
        <Route path="settings" element={<ParentSettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
