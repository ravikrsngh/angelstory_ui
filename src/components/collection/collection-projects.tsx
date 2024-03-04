/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import { useGetCollectionJourneys } from "../../hooks/collection/use-fetch-collection-journeys";
import { AssetTypes, JourneyType } from "../../types";
import { NewCard } from "../ui/cards";
import { JourneyCardDropdownList } from "../ui/dropdown-action-buttons";

export const CollectionProjects = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError } = useGetCollectionJourneys(
    params.collectionId ? params.collectionId : "-1"
  );
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
      </h4>
      <div className="flex gap-4 overflow-auto">
        {data.journeyList?.map((journey: JourneyType) => (
          <NewCard
            key={journey.id}
            type={AssetTypes.FOLDER}
            name={journey.name}
            dropdownOptions={JourneyCardDropdownList}
            dataObject={journey}
            onClickHandler={() => navigate(`/journey/${journey.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
