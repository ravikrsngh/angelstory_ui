import * as Tooltip from "@radix-ui/react-tooltip";
import { ToolTipIconPropType } from "../../types";

export const TooltipIcon = ({
  icon,
  label,
  onClickHandler,
}: ToolTipIconPropType) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button onClick={onClickHandler}>{icon}</button>
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
};
