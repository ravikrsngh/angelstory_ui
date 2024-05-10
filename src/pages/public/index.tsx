import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NewCard } from "../../components/ui/cards";
import {
  FilesViewer,
  FilesViewerItemType,
} from "../../components/ui/files-viewer";
import { useGetPublicEntity } from "../../hooks/access-rights/use-get-public-entity";
import { useGetCollectionDetails } from "../../hooks/collection/use-fetch-all-collection-details";
import { AssetResType, AssetTypes, EntityType, JourneyType } from "../../types";
import { DynamicArrayFilterType, cn, dynamicFilter } from "../../utils";
import { JourneyPublicPage } from "./journey";

const CollectionPublicPage = ({ id }: { id: number }) => {
  const assetTabs = [
    {
      name: "All",
      filter: [],
    },
    {
      name: "Images",
      filter: [
        {
          key: "assetType",
          operator: "==",
          value: AssetTypes.IMAGE,
        },
      ],
    },
    {
      name: "Audio",
      filter: [
        {
          key: "assetType",
          operator: "==",
          value: AssetTypes.AUDIO,
        },
      ],
    },
    {
      name: "Videos",
      filter: [
        {
          key: "assetType",
          operator: "==",
          value: AssetTypes.VIDEO,
        },
      ],
    },
  ];
  const { data, isLoading, isFetching, isError } = useGetCollectionDetails(
    String(id)
  );
  const [dataCopy, setDataCopy] = useState<AssetResType[] | undefined>([]);
  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);

  const openFileViewer = (obj: FilesViewerItemType) => {
    console.log(obj);
    setViewFilesViewer(true);
    setActiveId(obj.id);
  };

  const filterDataCopy = (filters: DynamicArrayFilterType[]) => {
    if (dataCopy) {
      const arr = dynamicFilter(data?.assetList, filters);
      setDataCopy(arr);
    }
    return [];
  };

  useEffect(() => {
    setDataCopy(data?.assetList);
  }, [data]);

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Something went wrong!!</span>;
  }
  return (
    <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-10">
      <div
        className="relative rounded-md overflow-hidden p-4 pt-10 pb-5 md:p-10 md:pt-[140px] lg:pt-[200px] text-primary-950 bg-center bg-cover"
        style={{
          backgroundColor: data?.bgColor ? data.bgColor : "#CEB8AF",
          backgroundImage: data?.bgImage ? `url(${data.bgImage})` : "",
        }}
      >
        <span className="text-xs md:text-sm">Collection</span>
        <h4 className="text-3xl md:text-4xl lg:text-5xl font-medium">
          {data?.name}
        </h4>
      </div>

      <div className="lg:mt-10">
        <h4 className="font-medium mb-5 md:mb-10 text-xl flex justify-between items-center">
          Assets
        </h4>
        <div>
          <Tab.Group>
            <Tab.List>
              <div className="flex gap-4 border-b border-slate-300 items-center mb-8">
                {assetTabs.map((tab) => (
                  <Tab key={tab.name}>
                    {({ selected }) => (
                      <button
                        className={cn(
                          "px-3 md:px-10 py-3 font-medium",
                          selected
                            ? "text-primary-400 border-b-2 border-primary-400"
                            : ""
                        )}
                        onClick={() => filterDataCopy(tab.filter)}
                      >
                        {tab.name}
                      </button>
                    )}
                  </Tab>
                ))}
              </div>
            </Tab.List>
            <div className="flex gap-4 overflow-auto">
              {dataCopy?.map((asset: AssetResType) => (
                <div key={asset.id}>
                  <NewCard
                    type={asset.assetType}
                    name={asset.name}
                    dropdownOptions={[]}
                    dataObject={asset}
                    onClickHandler={openFileViewer}
                    entityId={asset.id}
                    entityType={EntityType.ASSET}
                    bgImage={asset.assetUrl}
                    accessRight={asset.accessRight}
                  />
                </div>
              ))}
            </div>
          </Tab.Group>
        </div>
        {viewFilesViewer ? (
          <FilesViewer
            items={data.assetList?.map((asset: AssetResType) => {
              return {
                type: asset.assetType,
                entityType: EntityType.ASSET,
                id: asset.id,
                name: asset.name,
                src: asset.assetUrl,
                collectionId: asset.collectionId,
                journeyId: asset.journeyId,
              };
            })}
            setView={setViewFilesViewer}
            activeId={activeId}
            collectionId={data?.id}
            journeyId={null}
            publicView={true}
          />
        ) : null}
      </div>
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
              dropdownOptions={[]}
              dataObject={journey}
              onClickHandler={() => {}}
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
    </div>
  );
};

export default function PublicPage() {
  const params = useParams();
  const { isLoading, isError, data, isFetching } = useGetPublicEntity(
    params.publicId || ""
  );

  console.log(isLoading);

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Something went wrong!!</span>;
  }
  return (
    <div>
      {data.accessType == EntityType.COLLECTION && (
        <CollectionPublicPage id={data.entityId} />
      )}
      {data.accessType == EntityType.JOURNEY && (
        <JourneyPublicPage id={data.entityId} />
      )}
    </div>
  );
}
