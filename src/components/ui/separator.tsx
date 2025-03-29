import * as React from "react";
import { clsx } from "clsx";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Separator = ({
  className,
  orientation = "horizontal",
}: SeparatorProps) => {
  return (
    <div
      className={clsx(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
    />
  );
};