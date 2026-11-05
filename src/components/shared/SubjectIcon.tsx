import type { SubjectId } from "@/types";
import { getSubject } from "@/data/subjects";
import { cn } from "@/lib/utils";

interface SubjectIconProps {
  subjectId: SubjectId;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "h-8 w-8 text-base rounded-lg",
  md: "h-11 w-11 text-xl rounded-xl",
  lg: "h-14 w-14 text-2xl rounded-2xl",
} as const;

export function SubjectIcon({ subjectId, size = "md", className }: SubjectIconProps) {
  const subject = getSubject(subjectId);
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center ring-1",
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
