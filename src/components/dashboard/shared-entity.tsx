import {
  SharedEntityResType,
  useGetSharedEntity,
} from "../../hooks/access-rights/use-get-shared-entity";
import { NewCard } from "../ui/cards";

export const SharedEntity = () => {
  const { isLoading, isFetching, isError, data } = useGetSharedEntity();
  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Something went wrong !!</span>;
  }
  return (
    <div>
      <h4 className="text-base font-medium mb-6 md:text-lg flex justify-between items-center">
        Shared
      </h4>
      <div>
        <div className="flex gap-4">
          {data.map((cc: SharedEntityResType) => (
            <NewCard
              key={cc.entityId}
              type={cc.accessType}
              name={cc.name}
              dropdownOptions={[]}
              onClickHandler={() => {}}
              entityId={cc.entityId}
              entityType={cc.accessType}
              bgImage={cc.bgImage}
              accessRight={cc.accessRight}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
