import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/shared/Logo";
import { ConfettiBackdrop } from "@/components/shared/Decor";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useAppStore, type AuthError } from "@/store/AppStore";
import { AMINA, DINARA } from "@/data/users";
import { cn } from "@/lib/utils";
import { usePageTitle } from "@/lib/usePageTitle";
import { useLocale } from "@/i18n";
import type { UserRole } from "@/types";

type Mode = "register" | "login";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 6;

export function AuthPage() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register } = useAppStore();
  const { t } = useLocale();

  const initialRole = params.get("role");
  const [role, setRole] = useState<UserRole | null>(
    initialRole === "student" || initialRole === "parent" ? initialRole : null,
  );
  const mode: Mode = params.get("mode") === "login" ? "login" : "register";
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState<AuthError | null>(null);

  usePageTitle(mode === "register" ? t("auth.createAccount") : t("common.login"));

  const emailValid = EMAIL_RE.test(form.email.trim());
  const passwordValid =
    mode === "login" ? form.password.length > 0 : form.password.length >= MIN_PASSWORD;

  const canSubmit = useMemo(() => {
    if (!role || !emailValid || !passwordValid) return false;
    if (mode === "register") return form.name.trim().length > 1;
    return true;
  }, [role, mode, form.name, emailValid, passwordValid]);

  function switchMode(next: Mode) {
    const p = new URLSearchParams(params);
    if (next === "login") p.set("mode", "login");
    else p.delete("mode");
    if (role) p.set("role", role);
    setParams(p, { replace: true });
    setError(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role || !canSubmit) return;
    setSubmitting(true);
    setError(null);
    // Short simulated latency so the loading state is visible.
    setTimeout(() => {
      const err =
        mode === "login"
          ? login(role, form.email)
          : register(role, { name: form.name, email: form.email });
      if (err) {
        setError(err);
        setSubmitting(false);
        return;
      }
      if (role === "student") navigate(mode === "register" ? "/student/onboarding" : "/student");
      else navigate("/parent");
    }, 450);
  }

  return (
    <div className="relative isolate min-h-dvh overflow-hidden bg-paper">
      <ConfettiBackdrop />
      <div className="container-page flex min-h-dvh flex-col py-6">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="rounded-lg" aria-label={t("x.nav.home")}>
            <Logo />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher />
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-semibold text-muted hover:text-ink sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t("auth.backHome")}
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-8">
          <Card className="w-full max-w-md p-6 sm:p-8">
            <h1 className="text-center text-2xl">
              {mode === "register" ? t("auth.createAccount") : t("auth.welcomeBack")}
            </h1>
            <p className="mt-1 text-center text-sm text-muted">
              {mode === "register" ? t("auth.chooseRole") : t("auth.loginSubtitle")}
            </p>

            {/* Role picker */}
            <div className="mt-6">
              <p className="mb-2 text-sm font-semibold text-ink">{t("auth.roleLabel")}</p>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={t("auth.roleLabel")}>
                <RoleOption
                  active={role === "student"}
                  onClick={() => {
                    setRole("student");
                    setError(null);
                  }}
                  icon={<GraduationCap className="h-6 w-6" aria-hidden="true" />}
                  title={t("auth.iAmStudent")}
                  subtitle={t("auth.studentGrades")}
                />
                <RoleOption
                  active={role === "parent"}
                  onClick={() => {
                    setRole("parent");
                    setError(null);
                  }}
                  icon={<Users className="h-6 w-6" aria-hidden="true" />}
                  title={t("auth.iAmParent")}
                  subtitle={t("auth.parentWatch")}
                />
              </div>
              {!role && <p className="mt-2 text-xs text-fire-700">{t("x.auth.pickRoleHint")}</p>}
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
              {mode === "register" && (
                <Field
                  label={role === "parent" ? t("auth.nameLabelParent") : t("auth.nameLabelStudent")}
                  id="name"
                  value={form.name}
                  onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                  placeholder={t("auth.namePlaceholder")}
                  autoComplete="name"
                />
              )}
              <Field
                label={t("auth.emailLabel")}
                id="email"
                type="email"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                onBlur={() => setTouched((s) => ({ ...s, email: true }))}
                placeholder="you@example.kz"
                autoComplete="email"
                error={touched.email && form.email && !emailValid ? t("x.auth.emailInvalid") : undefined}
              />
              <Field
                label={t("auth.passwordLabel")}
                id="password"
                type="password"
                value={form.password}
                onChange={(v) => setForm((f) => ({ ...f, password: v }))}
                onBlur={() => setTouched((s) => ({ ...s, password: true }))}
                placeholder="••••••••"
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                hint={mode === "register" ? t("x.auth.passwordHint") : undefined}
                error={
                  mode === "register" && touched.password && form.password && !passwordValid
                    ? t("x.auth.passwordHint")
                    : undefined
                }
              />

              {error && (
                <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2.5 text-sm text-rose-800">
                  {error === "notFound" ? t("x.auth.notFound") : t("x.auth.emailTaken")}
                </p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={!canSubmit || submitting}>
                {submitting
                  ? t("auth.submitting")
                  : mode === "register"
                    ? t("auth.submitCreate")
                    : t("auth.submitLogin")}
              </Button>

              {mode === "login" && (
                <p className="text-center text-xs text-muted">
                  {t("x.auth.demoHint", { student: AMINA.email, parent: DINARA.email })}
                </p>
              )}
            </form>

            <div className="mt-5 text-center text-sm text-muted">
              {mode === "register" ? (
                <>
                  {t("auth.haveAccount")}{" "}
                  <button
                    type="button"
                    className="font-semibold text-ink hover:underline"
                    onClick={() => switchMode("login")}
                  >
                    {t("common.login")}
                  </button>
                </>
              ) : (
                <>
                  {t("auth.noAccount")}{" "}
                  <button
                    type="button"
                    className="font-semibold text-ink hover:underline"
                    onClick={() => switchMode("register")}
                  >
                    {t("auth.registerLink")}
                  </button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function RoleOption({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-1 rounded-[22px] border-2 p-4 text-left transition-colors",
        active ? "border-berry bg-berry-soft" : "border-ink/10 bg-white hover:border-ink/25",
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl",
          active ? "bg-berry text-white" : "bg-ink/[0.05] text-ink/60",
        )}
      >
        {icon}
      </span>
      <span className="mt-1 text-sm font-semibold text-ink">{title}</span>
      <span className="text-xs text-muted">{subtitle}</span>
    </button>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  autoComplete,
  hint,
  error,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
  error?: string;
}) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={cn(
          "h-11 w-full rounded-xl border-2 bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-ink focus-visible:ring-0",
          error ? "border-rose-300" : "border-ink/10",
        )}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-xs text-rose-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
