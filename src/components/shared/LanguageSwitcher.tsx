import { useLocale } from "@/i18n";
import { LOCALES, LOCALE_LABEL } from "@/i18n";
import { cn } from "@/lib/utils";

/** Compact RU / KZ / EN pill selector. Used in the public header and in both dashboards. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div
      role="radiogroup"
      aria-label="Язык интерфейса / Тіл / Language"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-pill border border-ink/10 bg-white p-0.5",
        className,
      )}
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={locale === l}
          onClick={() => setLocale(l)}
          className={cn(
            "rounded-pill px-2 py-1 text-xs font-semibold transition-colors",
            locale === l ? "bg-ink text-white" : "text-ink/50 hover:text-ink",
          )}
        >
          {LOCALE_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
