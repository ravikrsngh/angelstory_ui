import { IconCheck, IconX } from "@tabler/icons-react";
import { useDeleteAssets } from "../../hooks/assets/use-delete-assets";
import { EntityType } from "../../types";

type ApprovalBoxPropType = {
  entityType: string;
  entityId: number;
};

export const ApprovalBox = ({ entityId, entityType }: ApprovalBoxPropType) => {
  const deleteAssetHook = useDeleteAssets();

  const crossClicked = () => {
    if (entityType == EntityType.ASSET) {
      deleteAssetHook.mutate([entityId]);
    }
  };
  return (
    <div
      className="p-3 flex justify-center items-center gap-4 bg-white mt-3"
      onClick={(e) => e.stopPropagation()}
    >
      <button>
        <IconCheck />
      </button>
      <button onClick={crossClicked}>
        <IconX />
      </button>
    </div>
  );
};
