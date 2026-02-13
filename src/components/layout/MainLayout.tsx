import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BACKGROUND_GRADIENT } from "@/constants/colors";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return (
    <div
      className={cn("min-h-screen w-full", "flex")}
      style={{ background: BACKGROUND_GRADIENT }}
    >
      {children}
    </div>
  );
}
