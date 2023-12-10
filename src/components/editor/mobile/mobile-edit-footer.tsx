import { IconBold, IconBorderCorners, IconLetterSpacing, IconPalette, IconShadow, IconTextSize, IconTypography } from "@tabler/icons-react";
import { ToolBarButton } from "../toolbar-btn";
import { MobileEditPanel } from "./mobile-edit-panel";
import { useContext, useState } from "react";
import { CanvasContext } from "../../../context/canvasContext";
import { CanvasContextType } from "../../../types";

// Tab1 - Border
// Tab2 - Fill
// Tab3 - Shadow
// Tab4 - TextFormat
// Tab5 - TextFamily
// Tab6 - TextSize

export const MobileEditFooter = () => {
  const { fabricRef } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [tabClicked, setTabClicked] = useState<number | null>(null)
  const [displayMobileEditPanel, setDisplayMobileEditPanel] = useState(false)

  const editTabClicked = (tab:number) => {
    setTabClicked(tab)
    setDisplayMobileEditPanel(true)
  }

  return (
    <>
      <div className="fixed z-50 bottom-0 left-0 px-4 w-full h-16 bg-white shadow-[0_0_8px_rgba(0,0,0,0.1)] flex gap-4 items-center overflow-auto lg:hidden">
      {["i-text"].includes(fabricRef.current?._activeObject.type || '') ? (
          <>
            <div onClick={() => editTabClicked(5)}>
              <ToolBarButton
                key="font-family"
                icon={<IconTypography color="rgb(30 83 134)" size={26} />}
                label="Font"
              />
            </div>
            <div onClick={() => editTabClicked(4)}>
              <ToolBarButton
                key="font-formatting"
                icon={<IconBold color="rgb(30 83 134)" size={26} />}
                label="Format"
              />
            </div>
            <div onClick={() => editTabClicked(4)}>
              <ToolBarButton
                key="size"
                icon={<IconTextSize color="rgb(30 83 134)" size={26} />}
                label="Size"
              />
            </div>
            <div onClick={() => editTabClicked(4)}>
              <ToolBarButton
                key="spacing"
                icon={<IconLetterSpacing color="rgb(30 83 134)" size={26} />}
                label="Spacing"
              />
            </div>
          </>
        ) : null}
        <div onClick={() => editTabClicked(1)}>
          <ToolBarButton
            key="border"
            icon={<IconBorderCorners color="rgb(30 83 134)" size={26} />}
            label="Border"
          />
        </div>
        {!["line"].includes(fabricRef.current?._activeObject.type || '') ? (
          <div onClick={() => editTabClicked(2)}>
            <ToolBarButton
              key="fill"
              icon={<IconPalette color="rgb(30 83 134)" size={26} />}
              label="Fill"
            />
          </div>
        ) : null}
        <div onClick={() => editTabClicked(3)}>
          <ToolBarButton
            key="shadow"
            icon={<IconShadow color="rgb(30 83 134)" size={26} />}
            label="Shadow"
          />
        </div>
        
      </div>
      <MobileEditPanel object={fabricRef.current?._activeObject} tabClicked={tabClicked} displayMobileEditPanel={displayMobileEditPanel} setDisplayMobileEditPanel={setDisplayMobileEditPanel} />
    </>
  );
};
