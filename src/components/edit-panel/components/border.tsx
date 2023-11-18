import React, { useContext, useState } from "react";
import EditHeading from "./edit-heading";
import { CanvasContext } from "../../../context/canvasContext";
import ColorPallete from "./color-pallete";
import { IconBaselineDensityMedium } from "@tabler/icons-react";
import EditInputBox from "./edit-inputbox";
import { CanvasContextType, EditObjectType } from "../../../types";

export default function EditBorder({object} : EditObjectType) {
  const { recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [borderColor, setBorderColor] = useState(
    object.stroke
      ? object.stroke
      : ""
  );
  const [borderWidth, setBorderWidth] = useState(
    object.strokeWidth
  );
  const [displayColorPallete, setDisplayColorPallete] = useState(false);

  const applyBorderColor = (color) => {
    setBorderColor(color);
    object.set({ stroke: color });
    recordChange();
  };

  const onChangeStrokeWidth = (e) => {
    console.log(e.target.value);
    setBorderWidth(borderWidth);
    object.set({
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
