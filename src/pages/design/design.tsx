/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { DesignLoaderPropType, SlideType } from "../../types";
import { TemplatePanel } from "./templates-panel";
import { ToolBarButton } from "../../components/editor/toolbar-btn";
import { MobileToolbar } from "../../components/editor/mobile/mobile-toolbar";
import { useCreateTextPhrase } from "../../hooks/textphrases/use-create-textphrase";
import WebFont from "webfontloader";

export default function Design({ratio, originalWidth, initialSlides, name, projectType, saveProject}: DesignLoaderPropType) {
  const timeoutRef = useRef<number>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const historyRef = useRef<(string | null)[]>([null]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slideshowMode, setSlideShowMode] = useState<boolean>(false);
  const [slides, setSlides] = useState<SlideType[]>(initialSlides);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const createTextPhraseHook = useCreateTextPhrase()
  

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        fabricRef.current.set({
          backgroundColor:"#fff"
        })
      }
      fabricRef.current.loadFromJSON(last_snapshot, () => {});
      fabricRef.current.renderAll();
    }
  };

  const convertToTextPhrase = () => {
    if (fabricRef.current) {
      const allObjects = fabricRef.current.getObjects();
      console.log(allObjects);
      if (allObjects.length > 1) {
        const group = new fabric.Group(allObjects, {
          originX: "center",
          originY: "center",
        });
        console.log();
        fabricRef.current.discardActiveObject().renderAll();
        fabricRef.current.add(group);
        createTextPhraseHook.mutate({
          formattedData: JSON.stringify(JSON.stringify(group.toObject())),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          previewImg: group.toDataURL('png'),
        });
      }
    }
  };

  const importTextFromJSON = () => {
    const jsonData = '{"type":"group","version":"5.3.0","originX":"center","originY":"center","left":400.69,"top":285.36,"width":560.21,"height":361.56,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"objects":[{"type":"i-text","version":"5.3.0","originX":"left","originY":"top","left":-254.93,"top":-180.78,"width":534.04,"height":266.05,"fill":"#1167bd","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Akatab","fontWeight":"bold","fontSize":109,"text":"Enter your \ntext here","underline":false,"overline":false,"linethrough":false,"textAlign":"center","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"},{"type":"i-text","version":"5.3.0","originX":"left","originY":"top","left":-280.1,"top":102.94,"width":541.88,"height":76.84,"fill":"black","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"fontFamily":"Times New Roman","fontWeight":"normal","fontSize":68,"text":"Enter your text here","underline":false,"overline":false,"linethrough":false,"textAlign":"left","fontStyle":"normal","lineHeight":1.16,"textBackgroundColor":"","charSpacing":0,"styles":[],"direction":"ltr","path":null,"pathStartOffset":0,"pathSide":"left","pathAlign":"baseline"}]}'
    const json = JSON.parse(jsonData.replace('\n', 'n-n-n'));
    const fontFamilies = []
    for (let i = 0; i < json.objects.length; i++) {
      fontFamilies.push(json.objects[i]['fontFamily'])
      const txt = json.objects[i].text.replace('n-n-n','\n')
      delete json.objects[i]['text']
      fabricRef.current?.add(new fabric.IText(txt, {...json.objects[i], "left": (json['left'] +  json.objects[i]['left']), "top": (json['top'] + json.objects[i]['top']) }));
    }
    console.log(fontFamilies)
    WebFont.load({
      google: {
        families: fontFamilies,
      },
      active: () => {
        recordChange();
      }
    })
  };

  const onKeyPress = (e: KeyboardEvent) => {
    console.log(e)
    if(fabricRef.current) {
      if (e.key == "Delete") {
        deleteObject()
      } else if (e.ctrlKey && (e.key === "z" || e.code == "KeyZ")) {
        goBackInHistory()
      } else if (e.ctrlKey && (e.key === "q" || e.code == "KeyQ")) {
        convertToTextPhrase()
      }
    }
  };

  const onKeyDown = (e:KeyboardEvent) => {
    if(fabricRef.current?._activeObject) {
      const activeObject = fabricRef.current._activeObject;
      switch (e.key) {
        case 'ArrowUp':
          activeObject.set({ top: (activeObject.top || 0) - 1 });
          break;
        case 'ArrowDown':
          activeObject.set({ top: (activeObject.top || 0) + 1 });
          break;
        case 'ArrowLeft':
          activeObject.set({ left: (activeObject.left || 0) - 1 });
          break;
        case 'ArrowRight':
          activeObject.set({ left: (activeObject.left || 0) + 1 });
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

  // @ts-ignore
  const setCanvasSizeAndZoom = (container_width, container_height) => {
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
    if(slides[0].content) {
      fabricRef.current.loadFromJSON(slides[0].content, () => {});
      fabricRef.current.renderAll();
    }

    resizeObserver.observe(document.querySelector(".observe"))
    
    window.addEventListener('keypress', onKeyPress)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      // window.removeEventListener("keypress", onKeyPress);
      // window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    saveProject({formattedData:JSON.stringify(slides)})
  },[slides])

  useEffect(() => {
    fabricRef.current.off("object:modified");
    fabricRef.current.on("object:modified", recordChange);
    historyRef.current = slides[activeSlide].history
  },[activeSlide])

  return (
    <>
      <CanvasContext.Provider value={{ fabricRef, recordChange, slides, setSlides, activeSlide, setActiveSlide }}>
        <EditorHeader deleteObject={deleteObject} goBackInHistory={goBackInHistory} name={name} saveProject={saveProject} />
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
              {projectType == "SLIDE_SHOW"? <div onClick={() => setSlideShowMode(true)}>
                <ToolBarButton
                  key="slideshow"
                  icon={<IconSlideshow color="rgb(30 83 134)" size={26} />}
                  label="Slideshow"
                />
                
              </div> : null }
              <button onClick={importTextFromJSON}>
                  Import
                </button>
              
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
            {(slideshowMode && projectType == "SLIDE_SHOW") &&  (
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
