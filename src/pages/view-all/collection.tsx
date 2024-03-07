import {
  IconArrowBarToRight,
  IconCircleCheckFilled,
  IconCopy,
  IconTrash,
} from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { ViewAllCard } from "../../components/ui/cards";
import { AssetDropdownList } from "../../components/ui/dropdown-action-buttons";
import { TooltipIcon } from "../../components/ui/tooltip-icon";
import { useGetCollectionAssets } from "../../hooks/collection/use-fetch-collection-assets";
import { AssetResType, AssetTypes } from "../../types";

export const ViewAllCollection = () => {
  const params = useParams();
  const { data, isLoading, isFetching, isError } = useGetCollectionAssets(
    params.collectionId ? params.collectionId : "-1"
  );

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }
  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="">
        <span>Assets</span>
        <h3 className="text-3xl">{data.name}</h3>
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
        {data.assetList
          ?.filter((asset: AssetResType) => asset.assetType == AssetTypes.IMAGE)
          .map((asset: AssetResType) => (
            <ViewAllCard
              key={asset.id}
              type={asset.assetType}
              name={""}
              dropdownOptions={AssetDropdownList}
              dataObject={asset}
            />
          ))}
      </div>
    </div>
  );
};
