import {
  IconCloudUpload,
  IconTexture,
  IconCategory2,
  IconLetterT,
  IconTemplate,
} from "@tabler/icons-react";
import { ToolBarButton } from "../toolbar-btn";
import { FullScreenDialog } from "./fullscreen-dialog";
import { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../../context/canvasContext";
import { CanvasContextType } from "../../../types";

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
      <div className="fixed z-10 bottom-0 left-0 px-4 w-full h-16 bg-white shadow-[0_0_8px_rgba(0,0,0,0.1)] flex gap-4 justify-between items-center overflow-auto lg:hidden">
        <div onClick={() => openMobileTab(1)}>
          <ToolBarButton
            key="upload"
            icon={<IconCloudUpload color="rgb(30 83 134)" size={26} />}
            label="Upload"
          />
        </div>
        <div onClick={() => openMobileTab(2)}>
          <ToolBarButton
            key="background"
            icon={<IconTexture color="rgb(30 83 134)" size={26} />}
            label="Background"
          />
        </div>

        <div onClick={() => openMobileTab(3)}>
          <ToolBarButton
            key="shapes"
            icon={<IconCategory2 color="rgb(30 83 134)" size={26} />}
            label="Shapes"
          />
        </div>

        <div onClick={() => openMobileTab(4)}>
          <ToolBarButton
            key="text"
            icon={<IconLetterT color="rgb(30 83 134)" size={26} />}
            label="Text"
          />
        </div>

        <div onClick={() => openMobileTab(5)}>
          <ToolBarButton
            key="templates"
            icon={<IconTemplate color="rgb(30 83 134)" size={26} />}
            label="Templates"
          />
        </div>
      </div>
      <FullScreenDialog
        mobileFullDisplay={mobileFullDisplay}
        setMobileFullDisplay={setMobileFullDisplay}
        tab={tabClicked}
      />
    </>
  );
};
