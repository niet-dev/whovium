import type { ReactNode } from "react";

export default function ColoredBackground({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <div className="from-brand to-background/0 absolute inset-0 bg-linear-to-r from-0% to-15%"></div>
      <div className="to-brand from-background/0 absolute inset-0 bg-linear-to-r from-85%"></div>

      <div className="bg-brand h-full min-h-[95dvh] w-full bg-[url('/question-mark-bg.svg')] bg-repeat">
        {children}
      </div>
    </div>
  );
}
