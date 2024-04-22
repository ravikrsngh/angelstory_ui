import { Tab } from "@headlessui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { NewCard } from "../../components/ui/cards";
import {
  FilesViewer,
  FilesViewerItemType,
} from "../../components/ui/files-viewer";
import { useGetPublicEntity } from "../../hooks/access-rights/use-get-public-entity";
import { useGetCollectionDetails } from "../../hooks/collection/use-fetch-all-collection-details";
import { useGetJourneyDetails } from "../../hooks/journey/use-journey-details";
import { AssetResType, AssetTypes, EntityType, JourneyType } from "../../types";
import { cn } from "../../utils";

const CollectionPublicPage = ({ id }: { id: number }) => {
  const { data, isLoading, isFetching, isError } = useGetCollectionDetails(
    String(id)
  );
  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);

  const openFileViewer = (obj: FilesViewerItemType) => {
    console.log(obj);
    setViewFilesViewer(true);
    setActiveId(obj.id);
  };

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
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "px-3 md:px-10 py-3 font-medium",
                        selected
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : ""
                      )}
                    >
                      All
                    </button>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "px-3 md:px-10 py-3 font-medium",
                        selected
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : ""
                      )}
                    >
                      Images
                    </button>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "px-3 md:px-10 py-3 font-medium",
                        selected
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : ""
                      )}
                    >
                      Audio
                    </button>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "px-3 md:px-10 py-3 font-medium",
                        selected
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : ""
                      )}
                    >
                      Video
                    </button>
                  )}
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex gap-4 overflow-auto">
                  {data.assetList?.map((asset: AssetResType) => (
                    <NewCard
                      key={asset.id}
                      type={asset.assetType}
                      name={asset.name}
                      dropdownOptions={[]}
                      dataObject={asset}
                      onClickHandler={openFileViewer}
                    />
                  ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex gap-4 overflow-auto">
                  {data.assetList
                    ?.filter(
                      (asset: AssetResType) =>
                        asset.assetType == AssetTypes.IMAGE
                    )
                    .map((asset: AssetResType) => (
                      <NewCard
                        key={asset.id}
                        type={asset.assetType}
                        name={asset.name}
                        dropdownOptions={[]}
                        dataObject={asset}
                      />
                    ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex gap-4 overflow-auto">
                  {data.assetList
                    ?.filter(
                      (asset: AssetResType) =>
                        asset.assetType == AssetTypes.AUDIO
                    )
                    .map((asset: AssetResType) => (
                      <NewCard
                        key={asset.id}
                        type={asset.assetType}
                        name={asset.name}
                        dropdownOptions={[]}
                        dataObject={asset}
                      />
                    ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex gap-4 overflow-auto">
                  {data.assetList
                    ?.filter(
                      (asset: AssetResType) =>
                        asset.assetType == AssetTypes.VIDEO
                    )
                    .map((asset: AssetResType) => (
                      <NewCard
                        key={asset.id}
                        type={asset.assetType}
                        name={asset.name}
                        dropdownOptions={[]}
                        dataObject={asset}
                      />
                    ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const JourneyPublicPage = ({ id }: { id: number }) => {
  const { data, isLoading, isFetching, isError } = useGetJourneyDetails(
    String(id)
  );
  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);

  const openFileViewer = (obj: FilesViewerItemType) => {
    console.log(obj);
    setViewFilesViewer(true);
    setActiveId(obj.id);
  };

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
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "px-3 md:px-10 py-3 font-medium",
                        selected
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : ""
                      )}
                    >
                      All
                    </button>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "px-3 md:px-10 py-3 font-medium",
                        selected
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : ""
                      )}
                    >
                      Images
                    </button>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "px-3 md:px-10 py-3 font-medium",
                        selected
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : ""
                      )}
                    >
                      Audio
                    </button>
                  )}
                </Tab>
                <Tab>
                  {({ selected }) => (
                    <button
                      className={cn(
                        "px-3 md:px-10 py-3 font-medium",
                        selected
                          ? "text-primary-400 border-b-2 border-primary-400"
                          : ""
                      )}
                    >
                      Video
                    </button>
                  )}
                </Tab>
              </div>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <div className="flex gap-4 overflow-auto">
                  {data.assetList?.map((asset: AssetResType) => (
                    <NewCard
                      key={asset.id}
                      type={asset.assetType}
                      name={asset.name}
                      dropdownOptions={[]}
                      dataObject={asset}
                      onClickHandler={openFileViewer}
                    />
                  ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex gap-4 overflow-auto">
                  {data.assetList
                    ?.filter(
                      (asset: AssetResType) =>
                        asset.assetType == AssetTypes.IMAGE
                    )
                    .map((asset: AssetResType) => (
                      <NewCard
                        key={asset.id}
                        type={asset.assetType}
                        name={asset.name}
                        dropdownOptions={[]}
                        dataObject={asset}
                      />
                    ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex gap-4 overflow-auto">
                  {data.assetList
                    ?.filter(
                      (asset: AssetResType) =>
                        asset.assetType == AssetTypes.AUDIO
                    )
                    .map((asset: AssetResType) => (
                      <NewCard
                        key={asset.id}
                        type={asset.assetType}
                        name={asset.name}
                        dropdownOptions={[]}
                        dataObject={asset}
                      />
                    ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="flex gap-4 overflow-auto">
                  {data.assetList
                    ?.filter(
                      (asset: AssetResType) =>
                        asset.assetType == AssetTypes.VIDEO
                    )
                    .map((asset: AssetResType) => (
                      <NewCard
                        key={asset.id}
                        type={asset.assetType}
                        name={asset.name}
                        dropdownOptions={[]}
                        dataObject={asset}
                      />
                    ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
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
              };
            })}
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
