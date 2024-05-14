import { IconCheck, IconX } from "@tabler/icons-react";
import { useApproveAssets } from "../../hooks/assets/use-approve-assets";
import { useDeleteAssets } from "../../hooks/assets/use-delete-assets";
import { EntityType } from "../../types";

type ApprovalBoxPropType = {
  entityType: string;
  entityId: number;
};

export const ApprovalBox = ({ entityId, entityType }: ApprovalBoxPropType) => {
  const deleteAssetHook = useDeleteAssets();
  const approveAssetHook = useApproveAssets();

  const crossClicked = () => {
    if (entityType == EntityType.ASSET) {
      deleteAssetHook.mutate([entityId]);
    }
  };

  const approve = () => {
    if (entityType == EntityType.ASSET) {
      approveAssetHook.mutate({
        approvalDecision: "APPROVED",
        assetId: entityId,
      });
    }
  };

  return (
    <div
      className="p-3 flex justify-center items-center gap-2 md:gap-4 bg-white mt-3 text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-[#57B055] flex items-center justify-center "
        onClick={approve}
      >
        <IconCheck />
      </button>
      <button
        className="rounded-full w-8 h-8 md:w-10 md:h-10 bg-[#B53535] flex items-center justify-center "
        onClick={crossClicked}
      >
        <IconX />
      </button>
    </div>
  );
};
