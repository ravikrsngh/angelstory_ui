import { Menu, Tab, Transition } from "@headlessui/react";
import { IconDots } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CollectionProjects } from "../components/collection/collection-projects";
import { CollectionRecentActivity } from "../components/collection/recent-activity";
import { ApprovalBox } from "../components/ui/approval-box";
import { NewCard } from "../components/ui/cards";
import {
  AssetDropdownList,
  CollectionAddOnlyDropdown,
  CollectionDetailsBannerDropdown,
  DropdownActionModals,
  DropdownButton,
} from "../components/ui/dropdown-action-buttons";
import {
  FilesViewer,
  FilesViewerItemType,
} from "../components/ui/files-viewer";
import { useGetCollectionDetails } from "../hooks/collection/use-fetch-all-collection-details";
import { useGetCollectionAssets } from "../hooks/collection/use-fetch-collection-assets";
import {
  AccessTypeGroups,
  AssetResType,
  AssetTypes,
  EntityType,
} from "../types";
import { DynamicArrayFilterType, cn, dynamicFilter } from "../utils";

const CollectionAssets = ({
  collectionId,
}: {
  collectionId: number | undefined;
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
  const { data, isLoading, isFetching, isError } = useGetCollectionAssets(
    String(collectionId)
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
      <h4 className="font-medium mb-6 md:text-lg flex justify-between items-center">
        Assets
        <Link
          className="lg:hidden block ml-auto text-xs md:text-sm lg:text-base"
          to={`/view-all/collection/${collectionId}/assets`}
        >
          View all assets
        </Link>
      </h4>
      <div>
        <Tab.Group>
          <Tab.List>
            <div className="text-sm lg:text-base flex gap-4 border-b border-slate-300 items-center mb-8 overflow-auto whitespace-nowrap">
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
                className="hidden lg:block ml-auto text-xs md:text-sm lg:text-base"
                to={`/view-all/collection/${collectionId}/assets`}
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
                  accessRight={asset.accessRight}
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
            };
          })}
          setView={setViewFilesViewer}
          activeId={activeId}
          collectionId={data?.id}
          journeyId={null}
        />
      ) : null}
    </div>
  );
};

export default function Collection() {
  const params = useParams();
  const { data, isLoading, isFetching, isError } = useGetCollectionDetails(
    params.collectionId ? params.collectionId : "-1"
  );
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [action, setAction] = useState<number>(0);
  const isDropdownAccess = [
    ...AccessTypeGroups.OWNER,
    ...AccessTypeGroups.EDIT,
  ].includes(data?.accessRight || "");

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
        className="relative rounded-md overflow-hidden p-4 pt-20 pb-5 md:p-10 md:pt-[140px] lg:pt-[200px] text-primary-950 bg-center bg-cover"
        style={{
          backgroundColor: data?.bgColor ? data.bgColor : "#CEB8AF",
          backgroundImage: data?.bgImage ? `url(${data.bgImage})` : "",
        }}
      >
        <span className="text-xs md:text-sm">Collection</span>
        <h4 className="text-2xl md:text-4xl lg:text-5xl font-medium">
          {data?.name}
        </h4>
        {isDropdownAccess && (
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
                    {CollectionDetailsBannerDropdown.map((opt) => (
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
        )}
        {AccessTypeGroups.ADD_ONLY.includes(data?.accessRight || "") ? (
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
                    {CollectionAddOnlyDropdown.map((opt) => (
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
      </div>
      <CollectionRecentActivity />
      <CollectionAssets collectionId={data?.id} />
      {AccessTypeGroups.ADD_ONLY.includes(data?.accessRight || "") ? null : (
        <CollectionProjects
          setAction={setAction}
          setActionModal={setActionModal}
        />
      )}
      <DropdownActionModals
        action={action}
        setActionModal={setActionModal}
        actionModal={actionModal}
        entityId={data.id}
        entityType={EntityType.COLLECTION}
        name={data.name}
        bgImage={data.bgImage}
        accessRight={data.accessRight}
      />
    </div>
  );
}
