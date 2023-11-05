import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  IconCategory2,
  IconCloudUpload,
  IconLayersSubtract,
  IconLetterT,
  IconSlideshow,
  IconTexture,
} from "@tabler/icons-react";
import { Tab } from "@headlessui/react";
import UploadToolPanel from "./upload-tool";
import BackgroundPanel from "./background-panel";
import { CanvasContext } from "../../context/canvasContext";
import EditPanel from "../../components/edit-panel";
import ShapesPanel from "./shapes-panel";
import TextPanel from "./text";
import LayersPanel from "./layers";
import EditorHeader from "../../components/editor-header";
import SlideshowPanel from "./slideshow-panel";
import { SlideType } from "../../types";

const ToolBarButton = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <button className="text-center w-full flex flex-col justify-center items-center opacity-70 hover:opacity-90">
      {icon}
      <span className="text-xs block mt-1 text-primary-700 font-medium">
        {label}
      </span>
    </button>
  );
};

export default function Design() {
  const fabricRef = useRef<fabric.Canvas | null>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [history, setHistory] = useState<string[]>([]);
  const [slideshowMode, setSlideShowMode] = useState<boolean>(false);
  const [slides, setSlides] = useState<SlideType[]>([
    { content: "", duration: 2, previewImg: "" },
  ]);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const recordChange = () => {
    console.log("modified");
    setHistory((prev) => [...prev, JSON.stringify(fabricRef.current)]);
    fabricRef.current?.renderAll();
  };

  const updateTabIndexes = (index: number) => {
    fabricRef.current?.discardActiveObject().renderAll();
    setCurrentIndex(index);
  };

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

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key == "Delete") {
      fabricRef.current?.remove(fabricRef.current?._activeObject);
    } else if (e.ctrlKey && e.key === "z") {
      console.log("ctrl + Z");
      let h = [...history];
      const last_snapshot = h.pop();
      setHistory(h);
      fabricRef.current?.loadFromJSON(last_snapshot, () => {});
      fabricRef.current?.renderAll();
    }
  };

  const onMouseDownCanvas = () => {
    console.log("hey");
    if (fabricRef.current?._activeObject) {
      setCurrentIndex(-1);
    } else {
      setCurrentIndex(0);
    }
  };

  //   Functions to set the width and height of the canvas and add scaling.

  const setCanvasSizeAndZoom = () => {
    const ratio = 1;
    const originalWidth = 1080;
    document.querySelector(".canvas-container").style.height =
      document.querySelector(".canvas-container").offsetWidth * ratio + "px";
    fabricRef?.current?.setDimensions({
      width: document.querySelector(".canvas-container").offsetWidth,
      height: document.querySelector(".canvas-container").offsetWidth * ratio,
    });
    const scale = fabricRef?.current?.getWidth() / originalWidth;
    fabricRef?.current?.setZoom(scale);
  };

  useEffect(() => {
    if (fabricRef.current) return;
    const canvas = new fabric.Canvas("canvas", { backgroundColor: "#fff" });
    fabricRef.current = canvas;
    canvas.on("mouse:down", onMouseDownCanvas);
    canvas.on("object:modified", recordChange);
    setCanvasSizeAndZoom();

    window.addEventListener("resize", setCanvasSizeAndZoom);
    return () => {
      window.removeEventListener("resize", setCanvasSizeAndZoom);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyPress);

    let temp_slides = [...slides];
    temp_slides[activeSlide].content = JSON.stringify(fabricRef.current);
    temp_slides[activeSlide].previewImg = fabricRef?.current?.toDataURL({
      format: "png",
    });
    setSlides(temp_slides);

    return () => {
      window.addEventListener("keydown", onKeyPress);
    };
  }, [history]);

  return (
    <>
      <CanvasContext.Provider value={{ fabricRef, recordChange }}>
        <EditorHeader />
        <div className="w-full h-[calc(100vh-80px)] overflow-hidden flex bg-slate-50">
          <Tab.Group
            className="sidebars shadow-md flex"
            as={"div"}
            selectedIndex={currentIndex}
            onChange={updateTabIndexes}
          >
            <Tab.List className="toolbar flex flex-col gap-10 h-full bg-white p-4 w-20 py-10">
              <Tab className="outline-none">
                <ToolBarButton
                  key="upload"
                  icon={<IconCloudUpload color="rgb(30 83 134)" size={26} />}
                  label="Upload"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="background"
                  icon={<IconTexture color="rgb(30 83 134)" size={26} />}
                  label="Background"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="shapes"
                  icon={<IconCategory2 color="rgb(30 83 134)" size={26} />}
                  label="Shapes"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="text"
                  icon={<IconLetterT color="rgb(30 83 134)" size={26} />}
                  label="Text"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="layers"
                  icon={<IconLayersSubtract color="rgb(30 83 134)" size={26} />}
                  label="Layers"
                />
              </Tab>
              <div onClick={() => setSlideShowMode(true)}>
                <ToolBarButton
                  key="slideshow"
                  icon={<IconSlideshow color="rgb(30 83 134)" size={26} />}
                  label="Slideshow"
                />
              </div>
              <Tab className="outline-none"></Tab>
            </Tab.List>
            <Tab.Panels className="w-72 border-l border-slate-200 bg-white">
              <Tab.Panel className="w-full h-full overflow-auto">
                <UploadToolPanel addImage={addImage} />
              </Tab.Panel>
              <Tab.Panel className="w-full h-full overflow-auto">
                <BackgroundPanel />
              </Tab.Panel>
              <Tab.Panel className="w-full">
                <ShapesPanel />
              </Tab.Panel>
              <Tab.Panel className="w-full">
                <TextPanel />
              </Tab.Panel>
              <Tab.Panel className="w-full">
                <LayersPanel />
              </Tab.Panel>
              <Tab.Panel className="w-full">
                <EditPanel />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className="relative grow flex flex-col justify-between items-center">
            <div className="p-10 w-full flex justify-center">
              <canvas
                className="w-full border border-slate-400"
                id="canvas"
              ></canvas>
            </div>
            {slideshowMode && (
              <SlideshowPanel
                slides={slides}
                setSlides={setSlides}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
              />
            )}
          </div>
          <div className="bg-slate-300 w-[140px]"></div>
        </div>
      </CanvasContext.Provider>
    </>
  );
}
