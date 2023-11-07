import React, { useContext, useState } from "react";
import ColorPallete from "./color-pallete";
import EditHeading from "./edit-heading";
import { CanvasContext } from "../../../context/canvasContext";
import { CanvasContextType } from "../../../types";

export default function EditFill() {
  const { fabricRef, recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  let [fillColor, setFillColor] = useState(
    fabricRef.current._activeObject.fill
      ? fabricRef.current._activeObject.fill
      : "#CECECE"
  );
  let [displayColorPallete, setDisplayColorPallete] = useState(false);

  const applyFillColor = (color) => {
    setFillColor(color);
    fabricRef.current._activeObject.set({ fill: color });
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
