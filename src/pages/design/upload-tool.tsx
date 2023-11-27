import { Tab } from "@headlessui/react";
import { cn } from "../../utils";
import { useContext, useState } from "react";
import { useGetStockImages } from "../../hooks/others/use-stock-photos";
import { fabric } from "fabric";
import { CanvasContext } from "../../context/canvasContext";
import { CanvasContextType } from "../../types";

export default function UploadToolPanel() {
  const { fabricRef, recordChange} = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [searchQuery, setSearchQuery] = useState('');
  const {data, isLoading, isFetching, isError} = useGetStockImages(searchQuery);

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value)
  }

  const onSelectFileFromDevice = (e) => {
    let file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        addImage(e.target.result);
      };
    }
  };

  if (isLoading || isFetching) {
    return (
      <>
      <div className="p-5">
        <span>Loading ...</span>
        </div></>
    )
  }

  if (isError) {
    return (
      <>
      <div className="p-5">
        <span>Something went wrong ...</span>
        </div></>
    )
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
      <form className="my-4" onSubmit={handleSearchSubmit}>
        <input
          className="w-full py-2 px-4 border border-slate-200 text-md"
          type="text"
          name="search"
          placeholder="Search images, audio"
          required
        />
      </form>

      <Tab.Group as={"div"}>
        <Tab.List className="toolbar flex gap-10 mb-4">
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
            {data.results.map((ins) => (
              <div
                className="bg-slate-100 flex items-center justify-center"
                onClick={() => addImage(ins.urls.small)}
              >
                <img src={ins.urls.small} alt="" className="w-full" />
              </div>
            ))}
          </Tab.Panel>
          <Tab.Panel className="w-full">Content 3</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
