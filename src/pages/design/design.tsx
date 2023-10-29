import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  IconCategory2,
  IconCloudUpload,
  IconLetterT,
  IconTexture,
} from "@tabler/icons-react";
import { Tab } from "@headlessui/react";
import UploadToolPanel from "./upload-tool";
import BackgroundPanel from "./background-panel";
import { CanvasContext } from "../../context/canvasContext";
import EditPanel from "../../components/edit-panel";
import ShapesPanel from "./shapes-panel";
import TextPanel from "./text";

const ToolBarButton = ({ icon, label }) => {
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
  //const fabricRef = useRef<fabric.Canvas | null>();
  const [fabricRef, setFabricRef] = useState({ current: null });
  const [prevIndex, setPrevIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  let [activeObj, setActiveObj] = useState(0);

  const updateTabIndexes = (index) => {
    fabricRef.current?.discardActiveObject().renderAll();
    setPrevIndex(selectedIndex);
    setSelectedIndex(index);
  };

  const addImage = (url) => {
    fabric.Image.fromURL(url, function (oImg) {
      oImg.scale(1);
      fabricRef?.current?.add(oImg);
    });
  };

  const onKeyPress = (e) => {
    if (e.key == "Delete") {
      fabricRef.current?.remove(fabricRef.current?._activeObject);
    }
  };

  const addRect = (top, left) => {
    const rect = new fabric.Rect({
      top: top,
      left: left,
      width: 60,
      height: 70,
      fill: "red",
    });
    fabricRef.current?.add(rect);
    fabricRef.current?.add(comicSansText);
  };

  const addCircle = (top, left) => {
    fabricRef.current?.add(
      new fabric.Circle({
        radius: 20,
        fill: "black",
        top: top,
        left: left,
        selectable: true,
        hoverCursor: "pointer",
      })
    );
  };

  const onMouseDownCanvas = (options) => {
    if (fabricRef.current?._activeObject) {
      setSelectedIndex(-1);
      setActiveObj((prev) => prev + 1);
    } else {
      setSelectedIndex(prevIndex);
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
    setCanvasSizeAndZoom();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setCanvasSizeAndZoom);
    window.addEventListener("keydown", onKeyPress);

    return () => {
      window.removeEventListener("resize", setCanvasSizeAndZoom);
      window.addEventListener("keydown", onKeyPress);
    };
  }, []);

  return (
    <>
      <CanvasContext.Provider value={{ fabricRef, setFabricRef }}>
        <div className="w-full h-[calc(100vh-80px)] overflow-hidden flex bg-slate-50">
          <Tab.Group
            className="sidebars shadow-md flex"
            as={"div"}
            selectedIndex={selectedIndex}
            onChange={updateTabIndexes}
          >
            <Tab.List className="toolbar flex flex-col gap-10 h-full bg-white p-4 w-20 py-10">
              <Tab className="outline-none">
                <ToolBarButton
                  icon={<IconCloudUpload color="rgb(30 83 134)" size={26} />}
                  label="Upload"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  icon={<IconTexture color="rgb(30 83 134)" size={26} />}
                  label="Background"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  icon={<IconCategory2 color="rgb(30 83 134)" size={26} />}
                  label="Shapes"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  icon={<IconLetterT color="rgb(30 83 134)" size={26} />}
                  label="Text"
                />
              </Tab>
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
                <EditPanel />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className="relative grow flex justify-center p-10">
            <canvas
              className="w-full border border-slate-400"
              id="canvas"
            ></canvas>
            <textarea
              id="text-input"
              placeholder="Type your text here"
              className="hidden absolute overflow-hidden z-10 resize-none"
            ></textarea>
          </div>
          <div className="bg-slate-300 w-[140px]"></div>
        </div>
      </CanvasContext.Provider>
    </>
  );
}
