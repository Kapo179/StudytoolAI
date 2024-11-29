import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center",
        className,
      )}
    >
      <div
        className="bg-gradient-to-r from-[#00DEA9] via-[#00de7e] to-[#00DEA9] bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]"
      >
        {children}
      </div>
    </div>
  );
}