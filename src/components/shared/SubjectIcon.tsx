import type { SubjectId } from "@/types";
import { getSubject } from "@/data/subjects";
import { cn } from "@/lib/utils";

interface SubjectIconProps {
  subjectId: SubjectId;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-9 w-9 text-base",
  md: "h-12 w-12 text-xl",
  lg: "h-16 w-16 text-[1.7rem]",
} as const;

export function SubjectIcon({ subjectId, size = "md", className }: SubjectIconProps) {
  const subject = getSubject(subjectId);
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full ring-2",
        subject.theme.soft,
        subject.theme.ring,
        sizes[size],
        className,
      )}
      role="img"
      aria-label={subject.name}
      title={subject.name}
    >
      <span aria-hidden="true">{subject.icon}</span>
    </span>
  );
}
