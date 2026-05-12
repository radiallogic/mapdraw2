import { ReactNode } from "react";

type BubbleProps = {
  children: ReactNode;
  className?: string;
};

export function Bubble({ children, className }: BubbleProps) {
  return (
    <div
      className={`
        m-4
        bg-white/70
        backdrop-blur-md
        rounded-xl
        shadow-lg
        p-4
        pointer-events-auto
        ${className ?? ""}
      `}
    >
      {children}
    </div>
  );
}
