/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Tab } from "@headlessui/react";
import {
  IconCategory2,
  IconCloudUpload,
  IconLayersSubtract,
  IconLetterT,
  IconSlideshow,
  IconTemplate,
  IconTexture,
} from "@tabler/icons-react";
import { fabric } from "fabric";
import { useEffect, useRef, useState } from "react";
import EditPanel from "../../components/edit-panel";
import EditorHeader from "../../components/editor/editor-header";
import { MobileToolbar } from "../../components/editor/mobile/mobile-toolbar";
import { ToolBarButton } from "../../components/editor/toolbar-btn";
import { CanvasContext } from "../../context/canvasContext";
import { useCreateTextPhrase } from "../../hooks/textphrases/use-create-textphrase";
import { DesignLoaderPropType, MusicElementType, SlideType } from "../../types";
import BackgroundPanel from "./background-panel";
import LayersPanel from "./layers";
import ShapesPanel from "./shapes-panel";
import SlideshowPanel from "./slideshow-panel";
import { TemplatePanel } from "./templates-panel";
import TextPanel from "./text";
import UploadToolPanel from "./upload-tool";

export default function Design({
  ratio,
  originalWidth,
  initialSlides,
  name,
  projectType,
  saveProject,
  initialMusic,
}: DesignLoaderPropType) {
  const timeoutRef = useRef<number>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const historyRef = useRef<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideshowMode, setSlideShowMode] = useState<boolean>(false);
  const [slides, setSlides] = useState<SlideType[]>(initialSlides);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [musicArr, setMusicArr] = useState<MusicElementType[] | null>(
    initialMusic
  );

  const createTextPhraseHook = useCreateTextPhrase();

  const recordChange = () => {
    fabricRef.current?.renderAll();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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

  // const extractFontFamilies = (objects) => {
  //   const fontFamilies = new Set();
  //   objects.forEach((obj) => {
  //     if (obj.type === 'i-text' && obj.fontFamily) {
  //       fontFamilies.add(obj.fontFamily);
  //     }
  //   });
  //   return Array.from(fontFamilies);
  // };

  const updateTabIndexes = (index: number) => {
    fabricRef.current?.discardActiveObject().renderAll();
    setCurrentIndex(index);
  };

  const deleteObject = () => {
    if (fabricRef.current) {
      const activeObject = fabricRef.current.getActiveObject();
      if (activeObject) {
        fabricRef.current.remove(activeObject);
      }
      recordChange();
    }
  };

  const goBackInHistory = () => {
    if (fabricRef.current) {
      console.log("ctrl + Z");
      console.log(historyRef.current);
      const last_snapshot = historyRef.current.pop();
      if (last_snapshot == "" || last_snapshot == null) {
        fabricRef.current.clear();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fabricRef.current.set({
          backgroundColor: "#fff",
        });
      }
      fabricRef.current.loadFromJSON(last_snapshot, () => {});
      fabricRef.current.renderAll();
    }
  };

  const convertToTextPhrase = () => {
    if (fabricRef.current) {
      const allObjects = fabricRef.current.getObjects();
      console.log(allObjects);
      if (allObjects.length >= 1) {
        const group = new fabric.Group(allObjects, {
          originX: "center",
          originY: "center",
        });
        console.log("Text Phrase");
        createTextPhraseHook.mutate({
          formattedData: JSON.stringify(JSON.stringify(group.toObject())),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          previewImg: group.toDataURL("png"),
        });
      }
    }
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (fabricRef.current) {
      if (e.key == "Delete") {
        deleteObject();
      } else if (e.ctrlKey && (e.key === "z" || e.code == "KeyZ")) {
        goBackInHistory();
      } else if (e.ctrlKey && (e.key === "q" || e.code == "KeyQ")) {
        convertToTextPhrase();
      }
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (fabricRef.current?._activeObject) {
      const activeObject = fabricRef.current._activeObject;
      switch (e.key) {
        case "ArrowUp":
          activeObject.set({ top: (activeObject.top || 0) - 1 });
          break;
        case "ArrowDown":
          activeObject.set({ top: (activeObject.top || 0) + 1 });
          break;
        case "ArrowLeft":
          activeObject.set({ left: (activeObject.left || 0) - 1 });
          break;
        case "ArrowRight":
          activeObject.set({ left: (activeObject.left || 0) + 1 });
          break;
        default:
          break;
      }
      recordChange();
    }
  };

  const onMouseDownCanvas = () => {
    console.log("hey");
    if (fabricRef.current?._activeObject) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      // Trigger your event or function when the size changes
      setCanvasSizeAndZoom(entry.contentRect.width, entry.contentRect.height);
    }
  });

  //   Functions to set the width and height of the canvas and add scaling.

  // @ts-ignore
  const setCanvasSizeAndZoom = (container_width, container_height) => {
    console.log(container_width, container_height);
    const temp_height = container_width * ratio;
    if (temp_height < container_height) {
      console.log("here");
      // @ts-ignore
      document.querySelector(".canvas-wrapper").style.width = "100%";
      // @ts-ignore
      document.querySelector(".canvas-wrapper").style.height =
        (temp_height * 100) / container_height + "%";

      fabricRef?.current?.setDimensions({
        width: container_width,
        height: temp_height,
      });
    } else {
      // @ts-ignore
      document.querySelector(".canvas-wrapper").style.height = "100%";
      // @ts-ignore
      document.querySelector(".canvas-wrapper").style.width =
        (container_height * 100) / (ratio * container_width) + "%";

      fabricRef?.current?.setDimensions({
        width: container_height / ratio,
        height: container_height,
      });
    }
    // @ts-ignore
    const scale = fabricRef?.current?.getWidth() / originalWidth;
    fabricRef?.current?.setZoom(scale);
  };

  useEffect(() => {
    if (fabricRef.current) return;
    const canvas = new fabric.Canvas("canvas", { backgroundColor: "#fff" });
    canvas.on("mouse:down", onMouseDownCanvas);
    canvas.on("object:modified", recordChange);
    fabricRef.current = canvas;
    if (slides[0].content) {
      fabricRef.current.loadFromJSON(slides[0].content, () => {});
      fabricRef.current.renderAll();
    }

    // @ts-ignore
    resizeObserver.observe(document.querySelector(".observe"));

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      // window.removeEventListener("keypress", onKeyPress);
      // window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    saveProject(
      { formattedData: JSON.stringify({ slides: slides, music: musicArr }) },
      300000
    );
  }, [slides]);

  useEffect(() => {
    saveProject(
      { formattedData: JSON.stringify({ slides: slides, music: musicArr }) },
      0
    );
  }, [musicArr]);

  useEffect(() => {
    // @ts-ignore
    fabricRef.current.off("object:modified");
    // @ts-ignore
    fabricRef.current.on("object:modified", recordChange);
    historyRef.current = slides[activeSlide].history;
  }, [activeSlide]);

  return (
    <>
      <CanvasContext.Provider
        value={{
          fabricRef,
          recordChange,
          slides,
          setSlides,
          activeSlide,
          setActiveSlide,
          deleteObject,
          musicArr,
        }}
      >
        <EditorHeader
          deleteObject={deleteObject}
          goBackInHistory={goBackInHistory}
          name={name}
          saveProject={saveProject}
        />
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
                  icon={<IconCloudUpload color="#AD7A5B" size={26} />}
                  label="Upload"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="background"
                  icon={<IconTexture color="#AD7A5B" size={26} />}
                  label="Background"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="shapes"
                  icon={<IconCategory2 color="#AD7A5B" size={26} />}
                  label="Shapes"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="text"
                  icon={<IconLetterT color="#AD7A5B" size={26} />}
                  label="Text"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="layers"
                  icon={<IconLayersSubtract color="#AD7A5B" size={26} />}
                  label="Layers"
                />
              </Tab>
              <Tab className="outline-none">
                <ToolBarButton
                  key="templates"
                  icon={<IconTemplate color="#AD7A5B" size={26} />}
                  label="Templates"
                />
              </Tab>
              {projectType == "SLIDE_SHOW" ? (
                <div onClick={() => setSlideShowMode(true)}>
                  <ToolBarButton
                    key="slideshow"
                    icon={<IconSlideshow color="#AD7A5B" size={26} />}
                    label="Slideshow"
                  />
                </div>
              ) : null}

              <Tab className="outline-none"></Tab>
            </Tab.List>
            <Tab.Panels className="w-72 border-l border-slate-200 bg-white">
              <Tab.Panel className="w-full h-full overflow-auto">
                <UploadToolPanel />
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
            {slideshowMode && projectType == "SLIDE_SHOW" && (
              <SlideshowPanel
                saveProject={saveProject}
                musicArr={musicArr}
                setMusicArr={setMusicArr}
              />
            )}
          </div>
          <div className="bg-slate-300 w-[140px] hidden lg:block"></div>
          <div className="w-full overflow-auto flex h-20 bg-white lg:hidden"></div>
        </div>
      </CanvasContext.Provider>
    </>
  );
}
