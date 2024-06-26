/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IconTrash } from "@tabler/icons-react";
import { fabric } from "fabric";
import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { CanvasContext } from "../../../context/canvasContext";
import { useGetStockImages } from "../../../hooks/others/use-stock-photos";
import { CanvasContextType } from "../../../types";
import { BackgroundImageOptions } from "./backgroud-image-options";
import BackgroundImagePosition from "./background-image-position";
import BackgroundImageSize from "./background-image-size";

export default function BackgroundImageSection() {
  const { fabricRef, recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [position, setPosition] = useState(0);
  const [size, setSize] = useState(0);
  const [searchQuery, setSearchQuery] = useState("random");
  const { data, isLoading, isFetching, isError } =
    useGetStockImages(searchQuery);

  //@ts-ignore
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.search.value);
  };

  const onSelectFileFromDevice: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        console.log(event);
        setBackgroundImage((event.target as FileReader).result as string);
      };
    }
  };

  const setBackgroundImage = (url: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // or 'use-credentials'
    img.src = url;
    img.onload = () => {
      const fabricImage = new fabric.Image(img);
      fabricRef?.current?.setBackgroundImage(
        fabricImage,
        fabricRef?.current?.renderAll.bind(fabricRef?.current)
      );
      setBackgroundImageProperties(position, size);
    };
  };

  const setBackgroundImageProperties = (position: number, size: number) => {
    if (fabricRef.current) {
      const canvasZoom = fabricRef.current.getZoom();

      let top = 0;
      let left = 0;
      let width = 0;
      let height = 0;
      const bgImageObject = fabricRef?.current?.backgroundImage as fabric.Image;
      if (bgImageObject) {
        const cw = fabricRef.current.getWidth();
        const ch = fabricRef.current.getHeight();
        const iw = bgImageObject.width || 0;
        const ih = bgImageObject.height || 0;
        const canvasAspect = cw / ch;
        const imageAspect = iw / ih;

        // Setting the size

        if (size == 0) {
          if (canvasAspect > imageAspect) {
            bgImageObject.scaleToWidth(cw);
            width = cw;
            height = width / imageAspect;
          } else {
            bgImageObject.scaleToHeight(ch);
            height = ch;
            width = height * imageAspect;
          }
          // Set the position
          // Because we have the zoom defined for the canvas, we need to consider it while deciding the position and scale it accordingly.
          //For example the width is 400 px on the 1080 canvas. But if the canvas width is 600, we scale down the object width accordingly.
          // We are dividing by canvas zoom or we can multiple by 1/canvasZoom as canvasZoom = canvasWidth/ OriginalWidth
          if (position == 1) {
            top = 0;
            left = 0;
          } else if (position == 2) {
            console.log(width);
            top = 0;
            left = (cw - width) / canvasZoom;
          } else if (position == 3) {
            top = (ch - height) / canvasZoom;
            left = 0;
          } else if (position == 4) {
            top = (ch - height) / canvasZoom;
            left = (cw - width) / canvasZoom;
          } else if (position == 0) {
            top = (ch - height) / canvasZoom / 2;
            left = (cw - width) / canvasZoom / 2;
          }
          bgImageObject.set({ top: top, left: left });
        } else if (size == 1) {
          bgImageObject.set({
            scaleX: cw / iw / canvasZoom,
            scaleY: ch / ih / canvasZoom,
            top: 0,
            left: 0,
            width: iw,
            height: ih,
          });
        }

        recordChange();
      }
    }
  };

  const removeBackgroundImage = () => {
    if (fabricRef.current) {
      // @ts-ignore
      fabricRef.current.setBackgroundImage(null, () => {});
      recordChange();
    }
  };

  useEffect(() => {
    setBackgroundImageProperties(position, size);
  }, [position, size]);

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
      <div className="bg-image-edit-options mt-4">
        <h4 className="text-xs text-primary-700 font-medium mb-4 flex justify-between items-center">
          Background Image
          <BackgroundImageOptions
            icon={<IconTrash size={18} />}
            label="Remove Background Image"
            isActive={true}
            value={-1}
            action={removeBackgroundImage}
          />
        </h4>
        <BackgroundImagePosition
          position={position}
          setPosition={setPosition}
        />
        <BackgroundImageSize size={size} setSize={setSize} />
      </div>
      <form className="flex mt-4">
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
          Upload background
        </label>
      </form>
      <form className="my-4" onSubmit={handleSearchSubmit}>
        <input
          className="w-full py-2 px-4 border border-slate-200 text-md"
          type="text"
          name="search"
          placeholder="Search backgrounds"
          required
        />
      </form>
      <div className="w-full grid grid-cols-2 gap-4">
        {
          //@ts-ignore
          data.results.map((ins) => (
            <div
              key={ins.id}
              className="bg-slate-100 flex items-center justify-center"
              onClick={() => setBackgroundImage(ins.urls.regular)}
            >
              <img src={ins.urls.small} alt="" className="w-full" />
            </div>
          ))
        }
      </div>
    </>
  );
}
