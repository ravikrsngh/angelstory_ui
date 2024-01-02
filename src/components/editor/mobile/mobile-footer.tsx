import {
  IconCloudUpload,
  IconTexture,
  IconCategory2,
  IconLetterT,
  IconTemplate,
  IconSlideshow,
} from "@tabler/icons-react";
import { ToolBarButton } from "../toolbar-btn";
import { FullScreenDialog } from "./fullscreen-dialog";
import { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../../context/canvasContext";
import { CanvasContextType } from "../../../types";
import { MobileSlideShowPanel } from "./mobile-slideshow";

export const MobileFooter = () => {
  const { fabricRef } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );

  const [mobileFullDisplay, setMobileFullDisplay] = useState(false);
  const [tabClicked, setTabClicked] = useState(1);

  const openMobileTab = (tab: number) => {
    setTabClicked(tab);
    setMobileFullDisplay(true);
  };

  useEffect(() => {
    if (fabricRef.current) {
      fabricRef.current.on("object:added", () => setMobileFullDisplay(false));
    }
  });

  return (
    <>
      <div className="fixed z-10 bottom-0 left-0 px-4 w-full h-16 bg-white shadow-[0_0_8px_rgba(0,0,0,0.1)] flex gap-6 justify-between items-center overflow-auto lg:hidden">
        <div onClick={() => openMobileTab(1)}>
          <ToolBarButton
            key="upload"
            icon={<IconCloudUpload color="#AD7A5B" size={26} />}
            label="Upload"
          />
        </div>
        <div onClick={() => openMobileTab(2)}>
          <ToolBarButton
            key="background"
            icon={<IconTexture color="#AD7A5B" size={26} />}
            label="Background"
          />
        </div>

        <div onClick={() => openMobileTab(3)}>
          <ToolBarButton
            key="shapes"
            icon={<IconCategory2 color="#AD7A5B" size={26} />}
            label="Shapes"
          />
        </div>

        <div onClick={() => openMobileTab(4)}>
          <ToolBarButton
            key="text"
            icon={<IconLetterT color="#AD7A5B" size={26} />}
            label="Text"
          />
        </div>

        <div onClick={() => openMobileTab(5)}>
          <ToolBarButton
            key="templates"
            icon={<IconTemplate color="#AD7A5B" size={26} />}
            label="Templates"
          />
        </div>
        <div onClick={() => openMobileTab(6)}>
          <ToolBarButton
            key="slideshow"
            icon={<IconSlideshow color="#AD7A5B" size={26} />}
            label="Slideshow"
          />
        </div>
      </div>
      <FullScreenDialog
        mobileFullDisplay={mobileFullDisplay}
        setMobileFullDisplay={setMobileFullDisplay}
        tab={tabClicked}
      />
      {tabClicked == 6 ? <MobileSlideShowPanel /> : null}
    </>
  );
};
