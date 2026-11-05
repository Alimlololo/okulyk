import { Navigate, Outlet, useLocation } from "react-router-dom";
import { BookOpen, Home, Video } from "lucide-react";
import { useCurrentStudent } from "@/store/AppStore";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { useLocale } from "@/i18n";

export function StudentShell() {
  const student = useCurrentStudent();
  const location = useLocation();
  const { t } = useLocale();

  if (!student) return <Navigate to="/auth?role=student" replace />;

  const fullScreen =
    location.pathname.startsWith("/student/onboarding") ||
    location.pathname.startsWith("/student/diagnostic");

  if (!student.onboarded && !fullScreen) {
    return <Navigate to="/student/onboarding" replace />;
  }
  if (fullScreen) {
    // Onboarding + diagnostic render full-screen, without the dashboard shell.
    return <Outlet />;
  }

  const NAV = [
    { to: "/student", icon: Home, label: t("studentShell.navDashboard"), end: true },
    { to: "/student/subjects", icon: BookOpen, label: t("studentShell.navSubjects"), end: false },
    { to: "/student/videos", icon: Video, label: t("studentShell.navVideos"), end: false },
  ];

  return (
    <DashboardShell navItems={NAV}>
      <Outlet />
    </DashboardShell>
  );
}
