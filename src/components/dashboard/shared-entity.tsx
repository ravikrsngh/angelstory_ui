import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  SharedEntityResType,
  useGetSharedEntity,
} from "../../hooks/access-rights/use-get-shared-entity";
import { EntityType } from "../../types";
import { NewCard } from "../ui/cards";
import { FilesViewer } from "../ui/files-viewer";

export const SharedEntity = () => {
  const { isLoading, isFetching, isError, data } = useGetSharedEntity();
  const navigate = useNavigate();

  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);

  const onClickHandler = (cc: SharedEntityResType) => {
    if (cc.accessType == EntityType.COLLECTION) {
      navigate(`/collection/${cc.entityId}`);
    } else if (cc.accessType == EntityType.JOURNEY) {
      navigate(`/journey/${cc.entityId}`);
    } else {
      setActiveId(cc.id);
      setViewFilesViewer(true);
    }
  };

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
              type={cc.type}
              name={cc.name}
              dropdownOptions={[]}
              onClickHandler={() => onClickHandler(cc)}
              entityId={cc.entityId}
              entityType={cc.accessType}
              bgImage={cc.bgImage}
              accessRight={cc.accessRight}
            />
          ))}
        </div>
      </div>
      {viewFilesViewer ? (
        <FilesViewer
          items={data.map((asset: SharedEntityResType) => {
            return {
              type: asset.type,
              entityType: asset.accessType,
              id: asset.id,
              name: asset.name,
              src: asset.bgImage,
              collectionId: asset.collectionId,
              journeyId: asset.journeyId,
              accessRight: asset.accessRight,
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
