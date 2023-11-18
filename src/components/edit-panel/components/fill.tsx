import React, { useContext, useState } from "react";
import ColorPallete from "./color-pallete";
import EditHeading from "./edit-heading";
import { CanvasContext } from "../../../context/canvasContext";
import { CanvasContextType, EditObjectType } from "../../../types";

export default function EditFill({object} : EditObjectType) {
  const { recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  let [fillColor, setFillColor] = useState(
    object.fill
      ? object.fill
      : "#CECECE"
  );
  let [displayColorPallete, setDisplayColorPallete] = useState(false);

  const applyFillColor = (color) => {
    setFillColor(color);
    object.set({ fill: color });
    recordChange();
  };

  return (
    <div>
      <EditHeading name="Fill" />
      <div className="flex gap-2">
        <div
          className="outline-none basis-6 shrink-0 grow-0 h-6 flex justify-center items-center border border-slate-200"
          style={{ backgroundColor: fillColor }}
          onClick={() => setDisplayColorPallete(true)}
        ></div>
      </div>

      {displayColorPallete && (
        <ColorPallete
          color={fillColor}
          onChange={applyFillColor}
          displayColorPallete={setDisplayColorPallete}
        />
      )}
    </div>
  );
}
