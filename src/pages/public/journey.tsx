import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { NewCard } from "../../components/ui/cards";
import {
  FilesViewer,
  FilesViewerItemType,
} from "../../components/ui/files-viewer";
import { useGetJourneyDetails } from "../../hooks/journey/use-journey-details";
import {
  AssetResType,
  AssetTypes,
  EntityType,
  MemoryType,
  MemoryTypes,
} from "../../types";
import { DynamicArrayFilterType, cn, dynamicFilter } from "../../utils";

export const JourneyPublicPage = ({ id }: { id: number }) => {
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
  const memoryTabs = [
    {
      name: "All",
      filter: [],
    },
    {
      name: "Images",
      filter: [
        {
          key: "projectType",
          operator: "==",
          value: MemoryTypes.IMAGE,
        },
      ],
    },
    {
      name: "Audio",
      filter: [
        {
          key: "projectType",
          operator: "==",
          value: MemoryTypes.AUDIO,
        },
      ],
    },
    {
      name: "Videos",
      filter: [
        {
          key: "projectType",
          operator: "==",
          value: MemoryTypes.VIDEO,
        },
      ],
    },
    {
      name: "Card",
      filter: [
        {
          key: "projectType",
          operator: "==",
          value: MemoryTypes.CARD,
        },
      ],
    },
    {
      name: "Slideshow",
      filter: [
        {
          key: "projectType",
          operator: "==",
          value: MemoryTypes.SLIDESHOW,
        },
      ],
    },
  ];
  const { data, isLoading, isFetching, isError } = useGetJourneyDetails(
    String(id)
  );
  const [assetDataCopy, setAssetDataCopy] = useState<
    AssetResType[] | undefined
  >([]);
  const [memoryDataCopy, setMemoryDataCopy] = useState<
    MemoryType[] | undefined
  >([]);
  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);
  const [viewerData, setViewerData] = useState<FilesViewerItemType[]>([]);

  const openFileViewer = (obj: FilesViewerItemType) => {
    console.log(obj);

    setViewFilesViewer(true);
    setActiveId(obj.id);
  };

  const filterAssetDataCopy = (filters: DynamicArrayFilterType[]) => {
    if (assetDataCopy) {
      const arr = dynamicFilter(data?.assetList, filters);
      setAssetDataCopy(arr);
    }
    return [];
  };

  const filterMemoryDataCopy = (filters: DynamicArrayFilterType[]) => {
    if (memoryDataCopy) {
      const arr = dynamicFilter(data?.assetList, filters);
      setMemoryDataCopy(arr);
    }
    return [];
  };

  useEffect(() => {
    setAssetDataCopy(data?.assetList);
    setMemoryDataCopy(data?.projectList);
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
        <span className="text-xs md:text-sm">Journey</span>
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
                        onClick={() => filterAssetDataCopy(tab.filter)}
                      >
                        {tab.name}
                      </button>
                    )}
                  </Tab>
                ))}
              </div>
            </Tab.List>
            <div className="flex gap-4 overflow-auto">
              {assetDataCopy?.map((asset: AssetResType) => (
                <NewCard
                  key={asset.id}
                  type={asset.assetType}
                  name={asset.name}
                  dropdownOptions={[]}
                  dataObject={asset}
                  onClickHandler={() => {
                    setViewerData(
                      assetDataCopy?.map((asset: AssetResType) => {
                        return {
                          type: asset.assetType,
                          entityType: EntityType.ASSET,
                          id: asset.id,
                          name: asset.name,
                          src: asset.assetUrl,
                          collectionId: asset.collectionId,
                          journeyId: asset.journeyId,
                        };
                      })
                    );
                    openFileViewer({
                      type: asset.assetType,
                      src: asset.assetUrl,
                      name: asset.name,
                      entityType: EntityType.ASSET,
                      id: asset.id,
                      collectionId: asset.collectionId,
                      journeyId: asset.journeyId,
                    });
                  }}
                  entityId={asset.id}
                  entityType={EntityType.ASSET}
                  bgImage={asset.assetUrl}
                  accessRight={asset.accessRight}
                />
              ))}
            </div>
          </Tab.Group>
        </div>
        <div className="mt-10">
          <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
            Memories
          </h4>

          <div>
            <Tab.Group>
              <Tab.List>
                <div className="flex gap-4 border-b border-slate-300 items-center mb-8">
                  {memoryTabs.map((tab) => (
                    <Tab key={tab.name}>
                      {({ selected }) => (
                        <button
                          className={cn(
                            "px-3 md:px-10 py-3 font-medium",
                            selected
                              ? "text-primary-400 border-b-2 border-primary-400"
                              : ""
                          )}
                          onClick={() => filterMemoryDataCopy(tab.filter)}
                        >
                          {tab.name}
                        </button>
                      )}
                    </Tab>
                  ))}
                </div>
              </Tab.List>
              <div className="flex gap-4 flex-wrap">
                {memoryDataCopy?.map((memory: MemoryType) => (
                  <NewCard
                    key={memory.id}
                    type={memory.projectType}
                    name={memory.name}
                    dropdownOptions={[]}
                    dataObject={memory}
                    onClickHandler={() => {
                      setViewerData(
                        memoryDataCopy?.map((mm: MemoryType) => {
                          return {
                            type: mm.projectType,
                            entityType: EntityType.MEMORY,
                            id: mm.id,
                            name: mm.name,
                            src: mm.previewImage,
                            collectionId: mm.collectionId,
                            journeyId: mm.journeyId,
                          };
                        })
                      );
                      openFileViewer({
                        type: memory.projectType,
                        entityType: EntityType.MEMORY,
                        id: memory.id,
                        name: memory.name,
                        src: memory.previewImage,
                        collectionId: memory.collectionId,
                        journeyId: memory.journeyId,
                      });
                    }}
                    entityId={memory.id}
                    entityType={EntityType.MEMORY}
                    bgImage={memory.previewImage}
                    accessRight={memory.accessRight}
                  />
                ))}
              </div>
            </Tab.Group>
          </div>
        </div>
        {viewFilesViewer ? (
          <FilesViewer
            items={viewerData}
            setView={setViewFilesViewer}
            activeId={activeId}
            collectionId={data?.collectionId}
            journeyId={data?.id}
            publicView={true}
          />
        ) : null}
      </div>
    </div>
  );
};
