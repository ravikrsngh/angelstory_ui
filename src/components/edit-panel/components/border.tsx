import React, { useContext, useState } from "react";
import EditHeading from "./edit-heading";
import { CanvasContext } from "../../../context/canvasContext";
import ColorPallete from "./color-pallete";
import { IconBaselineDensityMedium } from "@tabler/icons-react";
import EditInputBox from "./edit-inputbox";
import { CanvasContextType } from "../../../types";

export default function EditBorder() {
  const { fabricRef, recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  let [borderColor, setBorderColor] = useState(
    fabricRef.current._activeObject.stroke
      ? fabricRef.current._activeObject.stroke
      : ""
  );
  let [borderWidth, setBorderWidth] = useState(
    fabricRef.current._activeObject.strokeWidth
  );
  let [displayColorPallete, setDisplayColorPallete] = useState(false);

  const applyBorderColor = (color) => {
    setBorderColor(color);
    fabricRef.current._activeObject.set({ stroke: color });
    recordChange();
  };

  const onChangeStrokeWidth = (e) => {
    console.log(e.target.value);
    setBorderWidth(borderWidth);
    fabricRef.current._activeObject.set({
      strokeWidth: parseInt(e.target.value ? e.target.value : 0),
    });
    recordChange();
  };
  return (
    <div>
      <EditHeading name="Border" />
      <div className="flex gap-2">
        <div
          className="outline-none basis-6 shrink-0 grow-0 h-6 flex justify-center items-center border border-slate-200"
          style={{ backgroundColor: borderColor }}
          onClick={() => setDisplayColorPallete(true)}
        ></div>
        <EditInputBox
          containerClassName=""
          icon={
            <IconBaselineDensityMedium className="block basis-4 shrink-0 grow-0" />
          }
          inputClassName=""
          type="number"
          id="strokeWidth"
          defaultValue={borderWidth}
          onChange={onChangeStrokeWidth}
        />
      </div>

      {displayColorPallete && (
        <ColorPallete
          color={borderColor}
          onChange={applyBorderColor}
          displayColorPallete={setDisplayColorPallete}
        />
      )}
    </div>
  );
}
