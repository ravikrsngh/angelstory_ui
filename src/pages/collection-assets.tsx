import { Tab } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { IconX } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useDeleteAssets } from "../hooks/assets/use-delete-assets";
import { useGetCollectionDetails } from "../hooks/collection/use-fetch-all-collection-details";
import { AssetResType } from "../types";
import { cn } from "../utils";

export default function CollectionAssets() {
  const queryClient = useQueryClient();
  const params = useParams();
  const { data, isLoading, isFetching } = useGetCollectionDetails(
    params.collectionId ? params.collectionId : "-1"
  );

  const deleteAssetHook = useDeleteAssets();

  const [itemsSelected, setItemsSelected] = useState<number[]>([]);
  const itemChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setItemsSelected((prev) => {
        const newarr = [...prev];
        newarr.push(parseInt(e.target.value));
        return newarr;
      });
    } else {
      setItemsSelected((prev) => {
        const newarr = prev.filter(
          (itemId) => itemId !== parseInt(e.target.value)
        );
        return newarr;
      });
    }
  };
  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  const deleteAssets = () => {
    deleteAssetHook.mutate(itemsSelected, {
      onSuccess: () => {
        toast.success("Asset(s) deleted.");
        queryClient.invalidateQueries({
          queryKey: ["collection-details"],
        });
        setItemsSelected([]);
      },
    });
  };

  return (
    <div className="px-4 md:px-10 lg:px-16 py-16">
      <h2 className="font-medium text-xl md:text-2xl lg:text-3xl">
        {data?.name || "Collection"}/ Assets
      </h2>
      <div className="mt-10">
        <Tab.Group>
          <Tab.List>
            <div className="flex justify-center md:justify-start gap-4 border-b border-slate-300 items-center mb-8">
              <Tab>
                {({ selected }) => (
                  <button
                    className={cn(
                      "px-10 py-3 font-medium outline-none",
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
                      "px-10 py-3 font-medium outline-none",
                      selected
                        ? "text-primary-400 border-b-2 border-primary-400"
                        : ""
                    )}
                  >
                    Audio
                  </button>
                )}
              </Tab>
            </div>
            {itemsSelected.length > 0 && (
              <div className="bg-primary-200 px-6 py-2 flex gap-3 mb-6 rounded-md">
                <span>{itemsSelected.length} selected</span>
                <button onClick={deleteAssets}>
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  className=" ml-auto"
                  onClick={() => setItemsSelected([])}
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>
            )}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <form className="grid grid-cols-2 md:flex flex-wrap gap-4">
                {data?.assetList.map((asset: AssetResType) => (
                  <div key={asset.id}>
                    <div className="overflow-hidden w-full h-[180px] md:w-52 md:h-52 relative cursor-pointer border-primary-200 bg-primary-50 rounded-md flex flex-col justify-center items-center gap-2">
                      <img src={asset.assetUrl} className="w-full" />
                      <input
                        type="checkbox"
                        className="absolute top-3 right-3"
                        onChange={itemChecked}
                        value={asset.id}
                        checked={itemsSelected.includes(asset.id)}
                      />
                    </div>
                  </div>
                ))}
              </form>
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
}
