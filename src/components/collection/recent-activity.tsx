import { useParams } from "react-router-dom";
import { useGetActivityCollection } from "../../hooks/activity/use-get-activity-for-collection";
import { ActivityResType } from "../../types";
import { NewCard } from "../ui/cards";
import { CardDefaultLoader } from "../ui/loaders";

export const CollectionRecentActivity = () => {
  const params = useParams();
  const { data, isLoading, isFetching, isError } = useGetActivityCollection(
    params.collectionId ? params.collectionId : "-1"
  );
  if (isError) {
    return <span>Something went wrong !!</span>;
  }
  return (
    <div>
      <h4 className="text-base font-medium mb-6 md:text-lg flex justify-between items-center">
        Recent Activity
      </h4>
      <div className="overflow-scroll">
        <div className="flex gap-4">
          {isLoading || isFetching ? (
            <CardDefaultLoader wrap={false} number={8} />
          ) : (
            data.map((cc: ActivityResType) => (
              <NewCard
                key={cc.entityId}
                type={cc.type}
                name={cc.name}
                dropdownOptions={[]}
                onClickHandler={() => {}}
                entityId={cc.entityId}
                entityType={cc.accessType}
                bgImage={cc.bgImage}
                accessRight={cc.accessRight}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
