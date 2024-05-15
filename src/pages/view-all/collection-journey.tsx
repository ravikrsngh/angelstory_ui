import { useState } from "react";
import { useParams } from "react-router-dom";
import { ViewAllCard } from "../../components/ui/cards";
import {
  DropdownActionModals,
  DropdownActions,
} from "../../components/ui/dropdown-action-buttons";
import { ViewAllHeader } from "../../components/view-all/header";
import { ViewAllToolBar } from "../../components/view-all/toolbar";
import { useGetCollectionJourneys } from "../../hooks/collection/use-fetch-collection-journeys";
import { AssetTypes, EntityType, JourneyType } from "../../types";

export const ViewAllCollectionJournies = () => {
  const params = useParams();
  const [selectedObjs, setSelectedObjs] = useState<number[]>([]);
  const { data, isLoading, isFetching, isError } = useGetCollectionJourneys(
    params.collectionId ? params.collectionId : "-1"
  );
  const [action, setAction] = useState<number>(-1);
  const [actionModal, setActionModal] = useState<boolean>(false);

  const moveHandler = () => {
    setAction(DropdownActions.MOVE_JOURNEY.id);
    setActionModal(true);
  };

  const copyHandler = () => {
    setAction(DropdownActions.COPY_JOURNEY.id);
    setActionModal(true);
  };

  const deleteHandler = () => {
    setAction(DropdownActions.DELETE_JOURNEY.id);
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
    <div className="p-4 lg:p-10 flex flex-col gap-10">
      <ViewAllHeader smallHeading="All Journey" bigHeading={data.name} />

      {selectedObjs.length > 0 && (
        <ViewAllToolBar
          total={selectedObjs.length}
          moveHandler={moveHandler}
          copyHandler={copyHandler}
          deleteHandler={deleteHandler}
        />
      )}

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
        {data.journeyList.map((asset: JourneyType) => (
          <ViewAllCard
            key={asset.id}
            type={AssetTypes.FOLDER}
            name={asset.name}
            defaultChecked={selectedObjs.includes(asset.id)}
            onChangeHandler={() => updateSelectedObj(asset.id)}
            entityId={asset.id}
            entityType={EntityType.JOURNEY}
            bgImage={asset.bgImage}
            accessRight={asset.accessRight}
          />
        ))}
      </div>
      <DropdownActionModals
        action={action ? action : null}
        actionModal={actionModal}
        setActionModal={setActionModal}
        afterAction={() => setSelectedObjs([])}
        bulkIds={selectedObjs}
        entityId={0}
        entityType={""}
        name={""}
        bgImage={""}
        accessRight={""}
      />
    </div>
  );
};
