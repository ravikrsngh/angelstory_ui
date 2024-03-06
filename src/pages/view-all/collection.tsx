import {
  IconArrowBarToRight,
  IconCircleCheckFilled,
  IconCopy,
  IconTrash,
} from "@tabler/icons-react";
import { TooltipIcon } from "../../components/ui/tooltip-icon";

export const ViewAllCollection = () => {
  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="">
        <span>Name</span>
        <h3 className="text-3xl">Collection Name</h3>
      </div>

      <div className="flex justify-between bg-primary-200 px-4 py-3">
        <span>2 items selected</span>
        <div className="flex gap-3">
          <TooltipIcon icon={<IconArrowBarToRight />} label={"Move"} />
          <TooltipIcon icon={<IconCopy />} label={"Copy"} />
          <TooltipIcon icon={<IconTrash />} label={"Need Approval"} />
          <TooltipIcon icon={<IconCircleCheckFilled />} label={"Delete"} />
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="w-32 h-32 bg-primary-50"></div>
      </div>
    </div>
  );
};
