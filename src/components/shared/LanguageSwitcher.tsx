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
        "inline-flex items-center gap-0.5 rounded-pill bg-snow p-1 ring-1 ring-ink/[0.08]",
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
            "rounded-pill px-2.5 py-1 text-xs font-bold transition-colors",
            locale === l ? "bg-ink text-white" : "text-ink/60 hover:text-ink",
          )}
        >
          {LOCALE_LABEL[l]}
        </button>
      ))}
    </div>
  );
}
