import { Menu, Tab, Transition } from "@headlessui/react";
import { IconDots } from "@tabler/icons-react";
import { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NewCard } from "../components/ui/cards";
import {
  AssetDropdownList,
  DropdownActionModals,
  DropdownButton,
  JourneyBannerDropdownList,
  MemoryCardDropdownList,
} from "../components/ui/dropdown-action-buttons";
import {
  FilesViewer,
  FilesViewerItemType,
} from "../components/ui/files-viewer";
import { useGetJourneyAssets } from "../hooks/journey/use-fetch-journey-assets";
import { useGetJourneysMemories } from "../hooks/journey/use-fetch-journeys-memory";
import { useGetJourneyDetails } from "../hooks/journey/use-journey-details";
import {
  AccessTypeGroups,
  AssetResType,
  AssetTypes,
  EntityType,
  MemoryType,
  MemoryTypes,
} from "../types";
import { cn } from "../utils";

const JourneyAssets = ({ journeyId }: { journeyId: string | undefined }) => {
  const { data, isLoading, isFetching, isError } = useGetJourneyAssets(
    String(journeyId)
  );

  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);

  const openFileViewer = (obj: FilesViewerItemType) => {
    console.log(obj);
    setViewFilesViewer(true);
    setActiveId(obj.id);
  };

  const isNeedAprovalAccess = [...AccessTypeGroups.OWNER].includes(
    data?.accessRight || ""
  );

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }

  return (
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
              {isNeedAprovalAccess && (
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
                      Needs Approval
                    </button>
                  )}
                </Tab>
              )}
              <Link
                className="ml-auto text-xs md:text-sm lg:text-base"
                to={`/view-all/journey/${journeyId}/assets`}
              >
                View all assets
              </Link>
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
                    dropdownOptions={AssetDropdownList}
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
                    (asset: AssetResType) => asset.assetType == AssetTypes.IMAGE
                  )
                  .map((asset: AssetResType) => (
                    <NewCard
                      key={asset.id}
                      type={asset.assetType}
                      name={asset.name}
                      dropdownOptions={AssetDropdownList}
                      dataObject={asset}
                    />
                  ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex gap-4 overflow-auto">
                {data.assetList
                  ?.filter(
                    (asset: AssetResType) => asset.assetType == AssetTypes.AUDIO
                  )
                  .map((asset: AssetResType) => (
                    <NewCard
                      key={asset.id}
                      type={asset.assetType}
                      name={asset.name}
                      dropdownOptions={AssetDropdownList}
                      dataObject={asset}
                    />
                  ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex gap-4 overflow-auto">
                {data.assetList
                  ?.filter(
                    (asset: AssetResType) => asset.assetType == AssetTypes.VIDEO
                  )
                  .map((asset: AssetResType) => (
                    <NewCard
                      key={asset.id}
                      type={asset.assetType}
                      name={asset.name}
                      dropdownOptions={AssetDropdownList}
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
        />
      ) : null}
    </div>
  );
};

const JourneyMemories = () => {
  const params = useParams();
  const { data, isLoading, isFetching, isError } = useGetJourneysMemories(
    params.journeyId ? params.journeyId : "-1"
  );
  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);

  const openFileViewer = (obj: FilesViewerItemType) => {
    console.log(obj);
    setViewFilesViewer(true);
    setActiveId(obj.id);
  };

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
        Memories
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
                    Cards
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
                    Slideshow
                  </button>
                )}
              </Tab>
            </div>
          </Tab.List>
          <Tab.Panels>
            <div>
              <Tab.Panel className="flex gap-4 flex-wrap">
                {data?.projectList?.map((memory: MemoryType) => (
                  <NewCard
                    key={memory.id}
                    type={memory.projectType}
                    name={memory.name}
                    dropdownOptions={MemoryCardDropdownList}
                    dataObject={memory}
                    onClickHandler={openFileViewer}
                  />
                ))}
              </Tab.Panel>
              <Tab.Panel className="flex gap-4 flex-wrap">
                {data?.projectList
                  ?.filter(
                    (memory: MemoryType) =>
                      memory.projectType == MemoryTypes.IMAGE
                  )
                  .map((memory: MemoryType) => (
                    <NewCard
                      key={memory.id}
                      type={memory.projectType}
                      name={memory.name}
                      dropdownOptions={MemoryCardDropdownList}
                      dataObject={memory}
                    />
                  ))}
              </Tab.Panel>
              <Tab.Panel className="flex gap-4 flex-wrap">
                {data?.projectList
                  ?.filter(
                    (memory: MemoryType) =>
                      memory.projectType == MemoryTypes.AUDIO
                  )
                  .map((memory: MemoryType) => (
                    <NewCard
                      key={memory.id}
                      type={memory.projectType}
                      name={memory.name}
                      dropdownOptions={MemoryCardDropdownList}
                      dataObject={memory}
                    />
                  ))}
              </Tab.Panel>
              <Tab.Panel className="flex gap-4 flex-wrap">
                {data?.projectList
                  ?.filter(
                    (memory: MemoryType) =>
                      memory.projectType == MemoryTypes.VIDEO
                  )
                  .map((memory: MemoryType) => (
                    <NewCard
                      key={memory.id}
                      type={memory.projectType}
                      name={memory.name}
                      dropdownOptions={MemoryCardDropdownList}
                      dataObject={memory}
                    />
                  ))}
              </Tab.Panel>
              <Tab.Panel className="flex gap-4 flex-wrap">
                {data?.projectList
                  ?.filter(
                    (memory: MemoryType) =>
                      memory.projectType == MemoryTypes.VIDEO
                  )
                  .map((memory: MemoryType) => (
                    <NewCard
                      key={memory.id}
                      type={memory.projectType}
                      name={memory.name}
                      dropdownOptions={MemoryCardDropdownList}
                      dataObject={memory}
                    />
                  ))}
              </Tab.Panel>
              <Tab.Panel className="flex gap-4 flex-wrap">
                {data?.projectList
                  ?.filter(
                    (memory: MemoryType) =>
                      memory.projectType == MemoryTypes.CARD
                  )
                  .map((memory: MemoryType) => (
                    <NewCard
                      key={memory.id}
                      type={memory.projectType}
                      name={memory.name}
                      dropdownOptions={MemoryCardDropdownList}
                      dataObject={memory}
                    />
                  ))}
              </Tab.Panel>
              <Tab.Panel className="flex gap-4 flex-wrap">
                {data?.projectList
                  ?.filter(
                    (memory: MemoryType) =>
                      memory.projectType == MemoryTypes.SLIDESHOW
                  )
                  .map((memory: MemoryType) => (
                    <NewCard
                      key={memory.id}
                      type={memory.projectType}
                      name={memory.name}
                      dropdownOptions={MemoryCardDropdownList}
                      dataObject={memory}
                    />
                  ))}
              </Tab.Panel>
            </div>
          </Tab.Panels>
        </Tab.Group>
      </div>
      {viewFilesViewer ? (
        <FilesViewer
          items={data?.projectList?.map((memory: MemoryType) => {
            return {
              type: memory.projectType,
              entityType: EntityType.MEMORY,
              id: memory.id,
              name: memory.name,
              src: memory.previewImage,
              description: memory.caption,
              title: memory.title,
            };
          })}
          setView={setViewFilesViewer}
          activeId={activeId}
          collectionId={data?.collectionId}
          journeyId={data?.id}
        />
      ) : null}
    </div>
  );
};

export default function Journey() {
  const params = useParams();
  const { data, isLoading, isFetching, isError } = useGetJourneyDetails(
    params.journeyId ? params.journeyId : "-1"
  );

  console.log(data);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [action, setAction] = useState<number>(0);

  const onClickDropdownOptions = (action: number) => {
    if (action != 1) {
      setAction(action);
      setActionModal(true);
    }
  };

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }

  return (
    <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-10">
      <div
        className="relative rounded-md p-4 pt-10 pb-5 md:p-10 md:pt-[140px] lg:pt-[200px] text-primary-950 bg-cover bg-center"
        style={{
          backgroundColor: data?.bgColor ? data.bgColor : "#CEB8AF",
          backgroundImage: data?.bgImage ? `url(${data.bgImage})` : "",
        }}
      >
        <span className="text-xs md:text-sm">Journey</span>
        <h4 className="text-3xl md:text-4xl lg:text-5xl font-medium">
          {data?.name}
        </h4>
        <div className="absolute top-4 right-4">
          <Menu as="div" className="relative inline-block text-left ml-auto">
            <div onClick={(e) => e.stopPropagation()}>
              <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-primary-700">
                <IconDots
                  className="-mr-1 ml-2 h-5 w-5 text-primary-700"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                  {JourneyBannerDropdownList.map((opt) => (
                    <Menu.Item key={opt.id}>
                      <DropdownButton
                        icon={opt.icon}
                        name={opt.name}
                        onClickHandler={() => onClickDropdownOptions(opt.id)}
                      />
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <JourneyAssets journeyId={params.journeyId ? params.journeyId : "-1"} />
      <JourneyMemories />
      <DropdownActionModals
        dataObject={data}
        action={action}
        setActionModal={setActionModal}
        actionModal={actionModal}
      />
    </div>
  );
}
