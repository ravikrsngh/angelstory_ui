//@ts-nocheck
import { Tab } from "@headlessui/react";
import { cn } from "../../utils";
import { useContext, useState } from "react";
import { useGetStockImages } from "../../hooks/others/use-stock-photos";
import { fabric } from "fabric";
import { CanvasContext } from "../../context/canvasContext";
import { AssetResType, CanvasContextType } from "../../types";
import { uploadFileToS3 } from "../../service/aws";
import { useCreateAssets } from "../../hooks/assets/use-create-assets";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useGetAssetsFromCollection } from "../../hooks/assets/use-get-collection-assets";




const StockImagesComp = ({addImage}:{addImage:(url:string) => void}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isFetching, isError } = useGetStockImages(searchQuery);
    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSearchQuery(e.target.search.value);
    };
  
    if (isLoading || isFetching) {
      return (
        <>
          <div className="p-5">
            <span>Loading ...</span>
          </div>
        </>
      );
    }
  
    if (isError) {
      return (
        <>
          <div className="p-5">
            <span>Something went wrong ...</span>
          </div>
        </>
      );
    }

  return (
    <>
      <form className="my-4" onSubmit={handleSearchSubmit}>
        <input
          className="w-full py-2 px-4 border border-slate-200 text-md"
          type="text"
          name="search"
          placeholder="Search images, audio"
          required
        />
      </form>
      <div className="w-full grid grid-cols-2 gap-4">
            {data.results.map((ins) => (
              <div
                key={ins.id}
                className="bg-slate-100 flex items-center justify-center"
                onClick={() => addImage(ins.urls.small)}
              >
                <img src={ins.urls.small} alt="" className="w-full" />
              </div>
            ))}
          </div>

    </>
  )
}


const CollectionAssetComp = ({addImage}:{addImage:(url:string) => void}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams();
  const {data, isLoading, isFetching, isError} = useGetAssetsFromCollection(parseInt(params.collectionId))

  if (isLoading || isFetching) {
    return (
      <>
        <div className="p-5">
          <span>Loading ...</span>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <div className="p-5">
          <span>Something went wrong ...</span>
        </div>
      </>
    );
  }


  return (
    <>
      <Tab.Group as={"div"}>
        <Tab.List className="toolbar flex gap-10 mb-8 mt-4">
          <Tab className="outline-none grow text-center">
            {({ selected }) => (
              <button
                className={cn(
                  "py-1 px-4",
                  selected
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : ""
                )}
              >
                Photo
              </button>
            )}
          </Tab>
          <Tab className="outline-none grow text-center">
            {({ selected }) => (
              <button
                className={cn(
                  "py-1 px-4",
                  selected
                    ? "text-primary-400 border-b-2 border-primary-400"
                    : ""
                )}
              >
                Audio
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="w-full grid grid-cols-2 gap-4">
            {data.map((ins:AssetResType) => (
              <div
                key={ins.id}
                className="bg-slate-100 flex items-center justify-center"
                onClick={() => addImage(ins.assetUrl)}
              >
                <img src={ins.assetUrl} alt="" className="w-full" />
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel className="w-full">Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  )

}

export default function UploadToolPanel() {
  const { fabricRef, recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [showStockImages, setShowStockImages] = useState<boolean>(false)
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createAssetHook = useCreateAssets();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const params = useParams();

  const addImage = (url: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // or 'use-credentials'
    img.src = url;
    img.onload = () => {
      const fabricImage = new fabric.Image(img);
      fabricRef?.current?.add(fabricImage);
      recordChange();
    };
  };

  const onSelectFileFromDevice = async (e) => {
    const file = e.target.files[0];
    if (file) {
      await uploadFileToS3(
        file,
        `${import.meta.env.VITE_AWS_STORAGE_BUCKET_NAME}`,
        `users/${Cookies.get("user")}/project/${file.name.replace(" ","%2B")}`
      );
      const assetUrl = `https://${import.meta.env.VITE_AWS_STORAGE_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/users/${Cookies.get("user")}/project/${file.name.replace(" ","%2B")}`
      await createAssetHook.mutate({
        assetType: "IMAGE",
        assetUrl: assetUrl,
        projectId: parseInt(params.projectId),
        collectionId: parseInt(params.collectionId),
      });
      addImage(assetUrl);
  };
}

  

  return (
    <div className="p-5">
      <form className="flex">
        <input
          type="file"
          name="file"
          id="upload-file"
          className="w-0 h-0 overflow-hidden"
          onChange={onSelectFileFromDevice}
        />
        <label
          htmlFor="upload-file"
          className="block text-center bg-primary-400 text-white w-full py-3"
        >
          Upload file
        </label>
      </form>
      <div className="flex items-center gap-4 my-4">
        <div className="flex items-center text-xs gap-1" onClick={() => setShowStockImages(false)}>
          <input type="radio" name="asset_type" id="your_assets" defaultChecked={!showStockImages} />
          <label htmlFor="your_assets">Your Assets</label>
        </div>
        <div className="flex items-center text-xs gap-1" onClick={() => setShowStockImages(true)}>
          <input type="radio" name="asset_type" id="stock_assets" defaultChecked={showStockImages} />
          <label htmlFor="stock_assets">Stock Collection</label>
        </div>
      </div>
      {showStockImages? <StockImagesComp addImage={addImage} /> : <CollectionAssetComp addImage={addImage} /> }
    </div>
  );
}
