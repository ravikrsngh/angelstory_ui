import { useState } from "react";
import { useParams } from "react-router-dom";
import { ViewAllCard } from "../../components/ui/cards";
import {
  DropdownActionModals,
  DropdownActions,
} from "../../components/ui/dropdown-action-buttons";
import { ViewAllHeader } from "../../components/view-all/header";
import { ViewAllToolBar } from "../../components/view-all/toolbar";
import { useGetCollectionAssets } from "../../hooks/collection/use-fetch-collection-assets";
import { AssetResType } from "../../types";

export const ViewAllCollectionAssets = () => {
  const params = useParams();
  const [selectedObjs, setSelectedObjs] = useState<number[]>([]);
  const { data, isLoading, isFetching, isError } = useGetCollectionAssets(
    params.collectionId ? params.collectionId : "-1"
  );
  const [action, setAction] = useState<number>(-1);
  const [actionModal, setActionModal] = useState<boolean>(false);

  const moveHandler = () => {
    setAction(DropdownActions.MOVE_ASSET.id);
    setActionModal(true);
  };

  const copyHandler = () => {
    setAction(DropdownActions.COPY_ASSET.id);
    setActionModal(true);
  };

  const deleteHandler = () => {
    setAction(DropdownActions.DELETE_ASSET.id);
    setActionModal(true);
  };

  const updateSelectedObj = (id: number) => {
    const objCopy = [...selectedObjs];
    if (objCopy.includes(id)) {
      objCopy.splice(objCopy.indexOf(id), 1);
      console.log(objCopy);
    } else {
      objCopy.push(id);
    }
    setSelectedObjs(objCopy);
  };

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }

  return (
    <div className="p-10 flex flex-col gap-10">
      <ViewAllHeader smallHeading="Assets" bigHeading={data.name} />

      {selectedObjs.length > 0 && (
        <ViewAllToolBar
          total={selectedObjs.length}
          moveHandler={moveHandler}
          copyHandler={copyHandler}
          deleteHandler={deleteHandler}
        />
      )}

      <div className="flex gap-4 flex-wrap">
        {data.assetList.map((asset: AssetResType) => (
          <ViewAllCard
            key={asset.id}
            type={asset.assetType}
            name={""}
            dataObject={asset}
            defaultChecked={selectedObjs.includes(asset.id)}
            onChangeHandler={() => updateSelectedObj(asset.id)}
          />
        ))}
      </div>
      <DropdownActionModals
        action={action ? action : null}
        actionModal={actionModal}
        setActionModal={setActionModal}
        bulkIds={selectedObjs}
        afterAction={() => setSelectedObjs([])}
      />
    </div>
  );
};
