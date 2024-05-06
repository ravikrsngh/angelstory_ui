import { useState } from "react";
import { useParams } from "react-router-dom";
import { ViewAllCard } from "../../components/ui/cards";
import {
  DropdownActionModals,
  DropdownActions,
} from "../../components/ui/dropdown-action-buttons";
import { ViewAllHeader } from "../../components/view-all/header";
import { ViewAllToolBar } from "../../components/view-all/toolbar";
import { useGetJourneysMemories } from "../../hooks/journey/use-fetch-journeys-memory";
import { EntityType, MemoryType } from "../../types";

export const ViewAllJourneyMemories = () => {
  const params = useParams();
  const [selectedObjs, setSelectedObjs] = useState<number[]>([]);
  const { data, isLoading, isFetching, isError } = useGetJourneysMemories(
    params.journeyId ? params.journeyId : "-1"
  );
  const [action, setAction] = useState<number>(-1);
  const [actionModal, setActionModal] = useState<boolean>(false);

  const moveHandler = () => {
    setAction(DropdownActions.MOVE_MEMORY.id);
    setActionModal(true);
  };

  const copyHandler = () => {
    setAction(DropdownActions.MOVE_MEMORY.id);
    setActionModal(true);
  };

  const deleteHandler = () => {
    setAction(DropdownActions.DELETE_MEMORY.id);
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
    console.log(objCopy);
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
      <ViewAllHeader smallHeading="All Memories" bigHeading={data.name} />

      {selectedObjs.length > 0 && (
        <ViewAllToolBar
          total={selectedObjs.length}
          moveHandler={moveHandler}
          copyHandler={copyHandler}
          deleteHandler={deleteHandler}
        />
      )}

      <div className="flex gap-4 flex-wrap">
        {data.projectList.map((asset: MemoryType) => (
          <ViewAllCard
            key={asset.id}
            type={asset.projectType}
            name={asset.name}
            defaultChecked={selectedObjs.includes(asset.id)}
            onChangeHandler={() => updateSelectedObj(asset.id)}
            entityId={asset.id}
            entityType={EntityType.MEMORY}
            bgImage={asset.previewImage}
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
