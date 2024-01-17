import { Link, useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { cn } from "../utils";
import * as HoverCard from "@radix-ui/react-hover-card";
import { CollectionProjects } from "../components/collection/collection-projects";
import { useGetCollectionDetails } from "../hooks/collection/use-fetch-all-collection-details";
import { AssetResType } from "../types";

const CollectionAssets = ({
  assetList,
  collectionId,
}: {
  assetList: AssetResType[] | undefined;
  collectionId: number | undefined;
}) => {
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
              <Link
                className="ml-auto text-xs md:text-sm lg:text-base"
                to={`/collection/${collectionId}/assets`}
              >
                View all assets
              </Link>
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="flex gap-4 overflow-auto">
                {assetList?.map((asset: AssetResType) => (
                  <div key={asset.id}>
                    <div className="w-[180px] h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2 overflow-hidden">
                      <img src={asset.assetUrl} className="w-full" />
                      <HoverCard.Root>
                        <HoverCard.Trigger className="flex gap-1 absolute top-3 right-3">
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                          <div className="bg-primary-600 h-2 w-2 rounded-full"></div>
                        </HoverCard.Trigger>
                        <HoverCard.Portal>
                          <HoverCard.Content
                            sideOffset={10}
                            className="w-20 -mr-3"
                          >
                            <div className="w-full">
                              <button className="w-full bg-white text-sm py-1 relative right-3">
                                Delete
                              </button>
                            </div>
                          </HoverCard.Content>
                        </HoverCard.Portal>
                      </HoverCard.Root>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <p>Fetch all audio in similar fashion</p>
            </Tab.Panel>
            <Tab.Panel>
              <p>Shared with you </p>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default function Collection() {
  const params = useParams();
  const { data, isLoading, isFetching } = useGetCollectionDetails(
    params.collectionId ? params.collectionId : "-1"
  );
  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  return (
    <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-10">
      <div className="relative rounded-md overflow-hidden p-4 pt-10 pb-5 md:p-10 md:pt-[140px] lg:pt-[200px] bg-primary-200 text-primary-950">
        <span className="text-xs md:text-sm">Collection</span>
        <h4 className="text-3xl md:text-4xl lg:text-5xl font-medium">
          {data?.name}
        </h4>
      </div>
      <CollectionAssets assetList={data?.assetList} collectionId={data?.id} />
      <CollectionProjects />
    </div>
  );
}
