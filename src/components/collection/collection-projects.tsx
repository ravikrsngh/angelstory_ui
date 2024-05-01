/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCollectionJourneys } from "../../hooks/collection/use-fetch-collection-journeys";
import {
  AccessTypeGroups,
  AssetTypes,
  EntityType,
  JourneyType,
} from "../../types";
import { NewCard } from "../ui/cards";
import {
  DropdownActions,
  JourneyCardDropdownList,
} from "../ui/dropdown-action-buttons";

export const CollectionProjects = ({
  setAction,
  setActionModal,
}: {
  setAction: Dispatch<SetStateAction<number>>;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError } = useGetCollectionJourneys(
    params.collectionId ? params.collectionId : "-1"
  );
  const isEntityOwner = [
    ...AccessTypeGroups.OWNER,
    ...AccessTypeGroups.EDIT,
  ].includes(data?.accessRight || "");

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }
  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }
  console.log(data);
  return (
    <div className="mt-10">
      <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
        Journies
        <button
          onClick={() => {
            setActionModal(true);
            setAction(DropdownActions.ADD_JOURNEY.id);
          }}
          className="text-sm"
        >
          + Add Journey
        </button>
      </h4>
      <div className="flex gap-4 overflow-auto">
        {data.journeyList?.map((journey: JourneyType) => (
          <NewCard
            key={journey.id}
            type={AssetTypes.FOLDER}
            name={journey.name}
            dropdownOptions={JourneyCardDropdownList}
            dataObject={journey}
            onClickHandler={() => {
              if (!isEntityOwner) {
                return;
              }
              navigate(`/journey/${journey.id}`);
            }}
            entityId={journey.id}
            entityType={EntityType.JOURNEY}
            bgImage={journey.bgImage}
            accessRight={journey.accessRight}
            collectionId={journey.collectionId}
            journeyId={journey.id}
          />
        ))}
      </div>
    </div>
  );
};
