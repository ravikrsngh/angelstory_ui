import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  IconCategory2,
  IconCloudUpload,
  IconLayersSubtract,
  IconLetterT,
  IconSlideshow,
  IconTemplate,
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
import EditorHeader from "../../components/editor/editor-header";
import SlideshowPanel from "./slideshow-panel";
import { SlideType } from "../../types";
import { TemplatePanel } from "./templates-panel";
import { ToolBarButton } from "../../components/editor/toolbar-btn";
import { MobileToolbar } from "../../components/editor/mobile/mobile-toolbar";



export default function Design() {
  const timeoutRef = useRef<unknown>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const historyRef = useRef<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideshowMode, setSlideShowMode] = useState<boolean>(false);
  const [slides, setSlides] = useState<SlideType[]>([
    { content: "", duration: 2, previewImg: "", history:[] },
  ]);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  

  const recordChange = () => {
    fabricRef.current?.renderAll();
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      console.log("modified");
      historyRef.current.push(JSON.stringify(fabricRef.current));
      setSlides((prevSlides) => {
        const tempSlides = [...prevSlides];
        console.log(activeSlide, tempSlides);
        tempSlides[activeSlide].content = JSON.stringify(fabricRef.current);
        tempSlides[activeSlide].previewImg = fabricRef?.current?.toDataURL({
          format: "png",
        });
        tempSlides[activeSlide].history = historyRef.current;
        return tempSlides;
      });

    }, 500);
  };

  const updateTabIndexes = (index: number) => {
    fabricRef.current?.discardActiveObject().renderAll();
    setCurrentIndex(index);
  };

  const deleteObject = () => {
    if (fabricRef.current) {
      fabricRef.current.remove(fabricRef.current._activeObject);
      recordChange();
    }
  };

  const goBackInHistory = () => {
    if (fabricRef.current) {
      console.log("ctrl + Z");
      console.log(historyRef.current);
      const last_snapshot = historyRef.current.pop();
      if(last_snapshot == '' || last_snapshot == null) {
        fabricRef.current.clear();
        fabricRef.current.set({
          backgroundColor:"#fff"
        })
      }
      fabricRef.current.loadFromJSON(last_snapshot, () => {});
      fabricRef.current.renderAll();
    }
  };

  const onKeyPress = (e: KeyboardEvent) => {
    if(fabricRef.current) {
      if (e.key == "Delete") {
        deleteObject()
      } else if (e.ctrlKey && (e.key === "z" || e.code == "KeyZ")) {
        goBackInHistory()
      }
    }
  };

  const onKeyDown = (e:KeyboardEvent) => {
    if(fabricRef.current?._activeObject) {
      const activeObject = fabricRef.current._activeObject;
      switch (e.key) {
        case 'ArrowUp':
          activeObject.set({ top: activeObject.top - 1 });
          break;
        case 'ArrowDown':
          activeObject.set({ top: activeObject.top + 1 });
          break;
        case 'ArrowLeft':
          activeObject.set({ left: activeObject.left - 1 });
          break;
        case 'ArrowRight':
          activeObject.set({ left: activeObject.left + 1 });
          break;
        default:
          break;
      }
      recordChange()
    }
  }

  const onMouseDownCanvas = () => {
    console.log("hey");
    if (fabricRef.current?._activeObject) {
      setCurrentIndex((prev) => prev-1);
    } else {
      setCurrentIndex(0);
    }
  };

  console.log(currentIndex)

  const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      // Trigger your event or function when the size changes
      setCanvasSizeAndZoom(entry.contentRect.width, entry.contentRect.height);
    }
  });

  //   Functions to set the width and height of the canvas and add scaling.

  const setCanvasSizeAndZoom = (container_width, container_height) => {
    const ratio = 1;
    const originalWidth = 1080;
    console.log(container_width, container_height);
    const temp_height = container_width * ratio;
    if (temp_height < container_height) {
      console.log("here")
      document.querySelector(".canvas-wrapper").style.width = "100%";
      document.querySelector(".canvas-wrapper").style.height = temp_height*100/container_height + "%";

      fabricRef?.current?.setDimensions({
        width: container_width,
        height: temp_height,
      });
    } else {
      document.querySelector(".canvas-wrapper").style.height = "100%";
      document.querySelector(".canvas-wrapper").style.width =
      (container_height * 100)/(ratio*container_width) + "%";

      fabricRef?.current?.setDimensions({
        width: container_height / ratio,
        height: container_height,
      });
    }

    const scale = fabricRef?.current?.getWidth() / originalWidth;
    fabricRef?.current?.setZoom(scale);
  };

  useEffect(() => {
    if (fabricRef.current) return;
    const canvas = new fabric.Canvas("canvas", { backgroundColor: "#fff" });
    canvas.on("mouse:down", onMouseDownCanvas);
    canvas.on("object:modified", recordChange);
    fabricRef.current = canvas;

    resizeObserver.observe(document.querySelector(".observe"))

    window.addEventListener('keypress', onKeyPress)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      // window.removeEventListener("keypress", onKeyPress);
      // window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    fabricRef.current.off("object:modified");
    fabricRef.current.on("object:modified", recordChange);
    historyRef.current = slides[activeSlide].history
  },[activeSlide])

  return (
    <>
      <CanvasContext.Provider value={{ fabricRef, recordChange, slides, setSlides, activeSlide, setActiveSlide }}>
        <EditorHeader deleteObject={deleteObject} goBackInHistory={goBackInHistory} />
        <div className="w-full h-[calc(100vh-80px)] overflow-hidden lg:grid lg:grid-cols-[368px,auto,140px] bg-slate-50">
          <Tab.Group
            className="sidebars shadow-md hidden lg:flex"
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
              <Tab className="outline-none">
                <ToolBarButton
                  key="templates"
                  icon={<IconTemplate color="rgb(30 83 134)" size={26} />}
                  label="Templates"
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
                <UploadToolPanel/>
              </Tab.Panel>
              <Tab.Panel className="w-full h-full overflow-auto">
                <BackgroundPanel />
              </Tab.Panel>
              <Tab.Panel className="w-full h-full overflow-auto">
                <ShapesPanel />
              </Tab.Panel>
              <Tab.Panel className="w-full h-full overflow-auto">
                <TextPanel />
              </Tab.Panel>
              <Tab.Panel className="w-full h-full overflow-auto">
                <LayersPanel />
              </Tab.Panel>
              <Tab.Panel className="w-full h-full overflow-auto">
                <TemplatePanel />
              </Tab.Panel>
              <Tab.Panel className="w-full h-full overflow-auto">
                <EditPanel object={fabricRef.current?._activeObject} />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <MobileToolbar />

          <div className="relative h-full grow flex flex-col justify-between items-center">
            <div className="observe p-5 max-h-[500px] lg:max-h-max md:p-7 lg:p-10 w-full flex justify-center grow">
              <div className="canvas-wrapper relative w-full">
                <canvas
                    className="w-full border border-slate-400"
                    id="canvas"
                  ></canvas>
              </div>
            </div>
            {slideshowMode && (
              <SlideshowPanel/>
            )}
          </div>
          <div className="bg-slate-300 w-[140px] hidden lg:block"></div>
          <div className="w-full overflow-auto flex h-20 bg-white lg:hidden"></div>
        </div>
      </CanvasContext.Provider>
    </>
  );
}
