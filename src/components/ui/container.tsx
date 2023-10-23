import { ReactNode } from "react";
import { cn } from "../../utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: ContainerProps) => (
  <div
    className={cn("mx-auto max-w-7xl px-4 md:px-10 lg:px-16 pt-32", className)}
  >
    {children}
  </div>
);
