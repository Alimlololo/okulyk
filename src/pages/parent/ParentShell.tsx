import { useState } from "react";
import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { Activity, Bell, Home, Settings } from "lucide-react";
import { useAppStore, useCurrentParent } from "@/store/AppStore";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { STUDENTS } from "@/data/users";
import { useLocale } from "@/i18n";
import type { StudentUser } from "@/types";

interface ParentContext {
  child: StudentUser;
  childId: string;
  setChildId: (id: string) => void;
  children: StudentUser[];
}

export function ParentShell() {
  const parent = useCurrentParent();
  const { students } = useAppStore();
  const [childId, setChildId] = useState<string>(parent?.childIds[0] ?? "");
  const { t } = useLocale();

  if (!parent) return <Navigate to="/auth?role=parent" replace />;

  const children = parent.childIds
    .map((id) => students[id] ?? STUDENTS[id])
    .filter(Boolean) as StudentUser[];
  const child = children.find((c) => c.id === childId) ?? children[0];

  const NAV = [
    { to: "/parent", icon: Home, label: t("parentShell.navOverview"), end: true },
    { to: "/parent/activity", icon: Activity, label: t("parentShell.navActivity"), end: false },
    { to: "/parent/notifications", icon: Bell, label: t("parentShell.navNotifications"), end: false },
    { to: "/parent/settings", icon: Settings, label: t("parentShell.navSettings"), end: false },
  ];

  if (!child) {
    return (
      <DashboardShell navItems={NAV}>
        <div className="grid min-h-[50vh] place-items-center p-6 text-center text-muted">
          {t("x.parent.noChild")}
        </div>
      </DashboardShell>
    );
  }

  const ctx: ParentContext = { child, childId: child.id, setChildId, children };

  return (
    <DashboardShell navItems={NAV}>
      <Outlet context={ctx} />
    </DashboardShell>
  );
}

export function useParentContext(): ParentContext {
  return useOutletContext<ParentContext>();
}
