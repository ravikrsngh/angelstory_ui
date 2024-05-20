import { Menu, Tab, Transition } from "@headlessui/react";
import { IconDots, IconPlus } from "@tabler/icons-react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SortByFilter } from "../components/filters/sort-by";
import { ApprovalBox } from "../components/ui/approval-box";
import { NewCard } from "../components/ui/cards";
import {
  AssetDropdownList,
  DropdownActionModals,
  DropdownActions,
  DropdownButton,
  JourneyBannerDropdownList,
  MemoryCardDropdownList,
} from "../components/ui/dropdown-action-buttons";
import {
  FilesViewer,
  FilesViewerItemType,
} from "../components/ui/files-viewer";
import { useGetActivityJourney } from "../hooks/activity/use-get-activity-for-journey";
import { useGetJourneyAssets } from "../hooks/journey/use-fetch-journey-assets";
import { useGetJourneysMemories } from "../hooks/journey/use-fetch-journeys-memory";
import { useGetJourneyDetails } from "../hooks/journey/use-journey-details";
import {
  AccessTypeGroups,
  ActivityResType,
  AssetResType,
  AssetTypes,
  EntityType,
  MemoryType,
  MemoryTypes,
} from "../types";
import { DynamicArrayFilterType, cn, dynamicFilter } from "../utils";

const JourneyAssets = ({ journeyId }: { journeyId: string | undefined }) => {
  const tabs = [
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
  const { data, isLoading, isFetching, isError } = useGetJourneyAssets(
    String(journeyId)
  );
  const [dataCopy, setDataCopy] = useState<AssetResType[] | undefined>([]);
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
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }

  return (
    <div className="">
      <h4 className="font-medium mb-6 text-base md:text-lg flex justify-between items-center">
        Assets
      </h4>
      <div>
        <Tab.Group>
          <Tab.List>
            <div className="text-sm lg:text-base  whitespace-nowrap overflow-x-auto flex gap-4 border-b border-slate-300 items-center mb-8">
              {tabs.map((tab) => (
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
                      onClick={() =>
                        filterDataCopy([
                          {
                            key: "isApproved",
                            operator: "==",
                            value: null,
                          },
                        ])
                      }
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
          <div className="flex gap-4 overflow-auto">
            {dataCopy?.map((asset: AssetResType) => (
              <div key={asset.id}>
                <NewCard
                  type={asset.assetType}
                  name={asset.name}
                  dropdownOptions={AssetDropdownList}
                  dataObject={asset}
                  onClickHandler={() =>
                    openFileViewer({
                      collectionId: asset.collectionId,
                      type: asset.assetType,
                      src: asset.assetUrl,
                      name: asset.name,
                      entityType: EntityType.ASSET,
                      id: asset.id,
                      journeyId: asset.journeyId,
                    })
                  }
                  entityId={asset.id}
                  entityType={EntityType.ASSET}
                  bgImage={asset.assetUrl}
                  accessRight={data.accessRight}
                />
                {!asset.isApproved && isNeedAprovalAccess ? (
                  <ApprovalBox
                    entityId={asset.id}
                    entityType={EntityType.ASSET}
                  />
                ) : null}
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
              accessRight: data.accessRight,
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

const JourneyMemories = ({
  setAction,
  setActionModal,
}: {
  setAction: Dispatch<SetStateAction<number>>;
  setActionModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const tabs = [
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
  const params = useParams();
  const [sortBy, setSortBy] = useState<string>("-last_created");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const { data, isLoading, isFetching, refetch } = useGetJourneysMemories(
    params.journeyId ? params.journeyId : "-1",
    {
      sortBy: sortBy,
      startDate: startDate,
      endDate: endDate,
    }
  );
  const [dataCopy, setDataCopy] = useState<MemoryType[] | undefined>([]);
  const [viewFilesViewer, setViewFilesViewer] = useState(false);
  const [activeId, setActiveId] = useState<number>(0);

  const openFileViewer = (obj: FilesViewerItemType) => {
    console.log(obj);
    setViewFilesViewer(true);
    setActiveId(obj.id);
  };

  const sortByChanged = (value: string) => {
    setSortBy(value);
  };

  const resetFilter = () => {
    setSortBy("-last_created");
    setStartDate("");
    setEndDate("");
  };

  const filterDataCopy = (filters: DynamicArrayFilterType[]) => {
    if (dataCopy) {
      const arr = dynamicFilter(data?.projectList, filters);
      setDataCopy(arr);
    }
    return [];
  };

  useEffect(() => {
    setDataCopy(data?.projectList);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [sortBy, startDate, endDate]);

  console.log(data);
  return (
    <div className="">
      <h4 className="font-medium mb-6 text-base md:text-lg flex justify-between items-center">
        Memories
        {![...AccessTypeGroups.VIEW_ONLY].includes(data?.accessRight || "") ? (
          <button
            onClick={() => {
              setActionModal(true);
              setAction(DropdownActions.ADD_MEMORY.id);
            }}
            className="text-sm"
          >
            + Add Memory
          </button>
        ) : null}
      </h4>
      <div className="journey-filters bg-primary-50 p-4 rounded-md">
        <h4 className="text-sm lg:text-base mb-0 text-primary-700 flex justify-between items-center">
          Filters{" "}
          <button className="hover:underline" onClick={resetFilter}>
            Clear
          </button>
        </h4>
        <div className="my-4 w-full flex flex-wrap items-center">
          <div className="flex gap-8">
            <div className="flex gap-2 flex-col">
              <label htmlFor="startDate" className="text-sm">
                From Date
              </label>
              <input
                type="date"
                id="startDate"
                className="outline-none bg-transparent"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-col">
              <label htmlFor="endDate" className="text-sm">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                className="outline-none bg-transparent"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
          <div className="ml-auto mt-8 lg:mt-0 text-sm lg:text-base">
            <SortByFilter
              defaultValue={sortBy}
              onChange={sortByChanged}
              options={[
                { name: "Name", value: "name" },
                { name: "Last Created", value: "last_created" },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        {isLoading || isFetching ? (
          <span>Loading..</span>
        ) : (
          <Tab.Group>
            <Tab.List>
              <div className="text-sm lg:text-base whitespace-nowrap overflow-x-auto flex gap-4 border-b border-slate-300 items-center mb-8">
                {tabs.map((tab) => (
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
            <div className="grid grid-cols-2 gap-2 md:flex md:gap-4 flex-wrap">
              {dataCopy?.map((memory: MemoryType) => (
                <NewCard
                  className="w-full"
                  key={memory.id}
                  type={memory.projectType}
                  name={memory.name}
                  dropdownOptions={
                    [
                      ...AccessTypeGroups.OWNER,
                      ...AccessTypeGroups.EDIT,
                    ].includes(data?.accessRight || "")
                      ? MemoryCardDropdownList
                      : []
                  }
                  dataObject={memory}
                  onClickHandler={() =>
                    openFileViewer({
                      type: memory.projectType,
                      src: memory.previewImage,
                      name: memory.name,
                      entityType: EntityType.MEMORY,
                      id: memory.id,
                      collectionId: memory.collectionId,
                      journeyId: memory.journeyId,
                      accessRight: memory.accessRight,
                      title: memory.title,
                      description: memory.caption,
                    })
                  }
                  entityId={memory.id}
                  entityType={EntityType.MEMORY}
                  bgImage={memory.previewImage}
                  accessRight={memory.accessRight}
                  title={memory.title}
                  caption={memory.caption}
                  collectionId={memory.collectionId}
                  journeyId={memory.journeyId}
                />
              ))}
            </div>
          </Tab.Group>
        )}
      </div>
      {viewFilesViewer ? (
        <FilesViewer
          items={
            data?.projectList?.map((memory: MemoryType) => {
              return {
                type: memory.projectType,
                entityType: EntityType.MEMORY,
                id: memory.id,
                name: memory.name,
                src: memory.previewImage,
                description: memory.caption,
                title: memory.title,
                collectionId: memory.collectionId,
                journeyId: memory.journeyId,
                accessRight: memory.accessRight,
              };
            }) || []
          }
          setView={setViewFilesViewer}
          activeId={activeId}
          collectionId={data?.collectionId || null}
          journeyId={data?.id || null}
        />
      ) : null}
    </div>
  );
};

const JourneyRecentActivity = () => {
  const params = useParams();
  const { data, isLoading, isFetching, isError } = useGetActivityJourney(
    params.journeyId ? params.journeyId : "-1"
  );
  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }
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
          {data.map((cc: ActivityResType) => (
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
    <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-8">
      <div
        className="relative rounded-md p-4 pt-20 pb-5 md:p-10 md:pt-[140px] lg:pt-[200px] text-primary-950 bg-cover bg-center"
        style={{
          backgroundColor: data?.bgColor ? data.bgColor : "#CEB8AF",
          backgroundImage: data?.bgImage ? `url(${data.bgImage})` : "",
        }}
      >
        <span className="text-xs md:text-sm">Journey</span>
        <h4 className="text-3xl md:text-4xl lg:text-5xl font-medium">
          {data?.name}
        </h4>
        {[...AccessTypeGroups.EDIT, ...AccessTypeGroups.OWNER].includes(
          data?.accessRight || ""
        ) ? (
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
        ) : null}
        {[...AccessTypeGroups.ADD_VIEW, ...AccessTypeGroups.ADD_ONLY].includes(
          data?.accessRight || ""
        ) ? (
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
                    <Menu.Item>
                      <DropdownButton
                        icon={<IconPlus />}
                        name={"Upload"}
                        onClickHandler={() =>
                          onClickDropdownOptions(DropdownActions.ADD_MEMORY.id)
                        }
                      />
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        ) : null}
      </div>
      {[...AccessTypeGroups.OWNER].includes(data.accessRight) ? (
        <JourneyRecentActivity />
      ) : null}
      <JourneyAssets journeyId={params.journeyId ? params.journeyId : "-1"} />
      <JourneyMemories setAction={setAction} setActionModal={setActionModal} />
      <DropdownActionModals
        action={action}
        setActionModal={setActionModal}
        actionModal={actionModal}
        entityId={data.id}
        entityType={EntityType.JOURNEY}
        name={data.name}
        bgImage={data.bgImage}
        accessRight={data.accessRight}
        collectionId={data.collectionId}
        journeyId={data.id}
      />
    </div>
  );
}
