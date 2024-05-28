import { useState } from "react";
import { useGetActivity } from "../../hooks/activity/use-get-activity";
import { ActivityResType } from "../../types";
import { NewCard } from "../ui/cards";
import { FilesViewer } from "../ui/files-viewer";
import { CardDefaultLoader } from "../ui/loaders";

export const DashboardRecentActivity = () => {
  const { data, isLoading, isFetching, isError } = useGetActivity();

  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);

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
                onClickHandler={() => {
                  setViewFilesViewer(true);
                  setActiveId(cc.id);
                }}
                entityId={cc.entityId}
                entityType={cc.accessType}
                bgImage={cc.bgImage}
                accessRight={cc.accessRight}
              />
            ))
          )}
        </div>
      </div>
      {viewFilesViewer ? (
        <FilesViewer
          items={(data || []).map((asset: ActivityResType) => {
            return {
              type: asset.type,
              entityType: asset.accessType,
              id: asset.id,
              name: asset.name,
              src: asset.bgImage,
              collectionId: null,
              journeyId: null,
            };
          })}
          setView={setViewFilesViewer}
          activeId={activeId}
          collectionId={null}
          journeyId={null}
        />
      ) : null}
    </div>
  );
};
