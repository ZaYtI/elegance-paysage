import { cn } from "@/lib/utils";

type SubmitFeedbackProps = {
  message: string;
  isError: boolean;
};

export function SubmitFeedback({ message, isError }: SubmitFeedbackProps) {
  if (!message) return null;

  return (
    <span
      role="status"
      className={cn("text-[0.85rem]", isError ? "text-destructive" : "text-stone-400")}
    >
      {message}
    </span>
  );
}
