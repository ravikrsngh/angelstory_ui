import { IconBaselineDensityMedium } from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { CanvasContext } from "../../../context/canvasContext";
import ColorPallete from "./color-pallete";
import EditHeading from "./edit-heading";
import EditInputBox from "./edit-inputbox";

export default function EditShadow() {
  let { fabricRef } = useContext(CanvasContext);
  let [shadowColor, setShadowColor] = useState(
    fabricRef.current._activeObject?.shadow?.color
      ? fabricRef.current._activeObject?.shadow?.color
      : "#fff"
  );
  let [shadowX, setShadowX] = useState(
    fabricRef.current._activeObject?.shadow?.offsetX
      ? fabricRef.current._activeObject?.shadow?.offsetX
      : 0
  );
  let [shadowY, setShadowY] = useState(
    fabricRef.current._activeObject?.shadow?.offsetY
      ? fabricRef.current._activeObject?.shadow?.offsetY
      : 0
  );
  let [shadowBlur, setShadowBlur] = useState(
    fabricRef.current._activeObject?.shadow?.blur
      ? fabricRef.current._activeObject?.shadow?.blur
      : 0
  );

  let [displayColorPallete, setDisplayColorPallete] = useState(false);

  const applyShadow = (color) => {
    setShadowColor(color);
    fabricRef.current._activeObject.shadow = {
      color: shadowColor,
      offsetX: shadowX,
      offsetY: shadowY,
      blur: shadowBlur,
    };
    fabricRef.current.renderAll();
  };
  return (
    <div>
      <EditHeading name="Shadow" />
      <div className="flex gap-2 flex-wrap">
        <div
          className="outline-none w-6 h-6 flex justify-center items-center border border-slate-200"
          style={{ backgroundColor: shadowColor }}
          onClick={() => setDisplayColorPallete(true)}
        ></div>
        <EditInputBox
          containerClassName=""
          icon={
            <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
              X
            </span>
          }
          inputClassName=""
          type="number"
          id="shadowX"
          defaultValue={shadowX}
          onChange={(e) => {
            setShadowX(e.target.value);
            applyShadow(shadowColor);
          }}
        />
        <EditInputBox
          containerClassName=""
          icon={
            <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
              Y
            </span>
          }
          inputClassName=""
          type="number"
          id="shadowY"
          defaultValue={shadowY}
          onChange={(e) => {
            setShadowY(e.target.value);
            applyShadow(shadowColor);
          }}
        />
        <EditInputBox
          containerClassName="w-24"
          icon={
            <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
              Blur
            </span>
          }
          inputClassName=""
          type="number"
          id="shadowBlur"
          defaultValue={shadowBlur}
          onChange={(e) => {
            setShadowBlur(e.target.value);
            applyShadow(shadowColor);
          }}
        />
      </div>

      {displayColorPallete && (
        <ColorPallete
          color={shadowColor}
          onChange={applyShadow}
          displayColorPallete={setDisplayColorPallete}
        />
      )}
    </div>
  );
}
