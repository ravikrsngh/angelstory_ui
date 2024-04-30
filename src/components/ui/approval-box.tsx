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

  console.log("here");

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
      className="p-3 flex justify-center items-center gap-4 bg-white mt-3"
      onClick={(e) => e.stopPropagation()}
    >
      <button onClick={approve}>
        <IconCheck />
      </button>
      <button onClick={crossClicked}>
        <IconX />
      </button>
    </div>
  );
};
