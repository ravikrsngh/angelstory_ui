import {
  IconArrowBarToRight,
  IconCircleCheckFilled,
  IconCopy,
  IconTrash,
} from "@tabler/icons-react";
import { TooltipIcon } from "../ui/tooltip-icon";

type ViewAllToolBarPropType = {
  total: number;
  moveHandler?: () => void;
  copyHandler?: () => void;
  deleteHandler?: () => void;
  approveHandler?: () => void;
};

export const ViewAllToolBar = ({
  total,
  moveHandler,
  copyHandler,
  deleteHandler,
  approveHandler,
}: ViewAllToolBarPropType) => {
  return (
    <div className="flex justify-between bg-primary-200 px-4 py-3">
      <span>{total} items selected</span>
      <div className="flex gap-3">
        {moveHandler && (
          <TooltipIcon
            icon={<IconArrowBarToRight />}
            label={"Move"}
            onClickHandler={moveHandler}
          />
        )}
        {copyHandler && (
          <TooltipIcon
            icon={<IconCopy />}
            label={"Copy"}
            onClickHandler={copyHandler}
          />
        )}
        {approveHandler && (
          <TooltipIcon
            icon={<IconCircleCheckFilled />}
            label={"Need Approval"}
            onClickHandler={approveHandler}
          />
        )}
        {deleteHandler && (
          <TooltipIcon
            icon={<IconTrash />}
            label={"Delete"}
            onClickHandler={deleteHandler}
          />
        )}
      </div>
    </div>
  );
};
