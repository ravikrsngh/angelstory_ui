import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

export function BackgroundImageOptions({
  icon,
  label,
  value,
  isActive,
  action,
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            onClick={() => action(value)}
            className={isActive ? "text-primary-400" : "text-slate-500"}
          >
            {icon}
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="TooltipContent bg-white text-primary-700 rounded-sm shadow-md px-3 py-2 text-xs"
            sideOffset={5}
          >
            {label}
            <Tooltip.Arrow className="TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
