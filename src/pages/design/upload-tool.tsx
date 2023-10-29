import { Tab } from "@headlessui/react";
import { cn } from "../../utils";
import { useState } from "react";

export default function UploadToolPanel({ addImage }) {
  let [photoResults, setPhotoResults] = useState([]);
  const searchUnsplashImages = async (e) => {
    e.preventDefault();
    console.log(e.target.search.value);
    const accessKey = "dqSeyQ2g_HMdOVHAPGVKtCnS2YcgKejOAAlrJ2JXkJM";
    const url = `https://api.unsplash.com/search/photos?query=${e.target.search.value}&client_id=${accessKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results);
      setPhotoResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };
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
      <form className="my-4" onSubmit={searchUnsplashImages}>
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
            {photoResults.map((ins) => (
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
