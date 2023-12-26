import React, { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../context/canvasContext";
import { CanvasContextType } from "../../types";
import EditHeading from "./components/edit-heading";

export default function EditFontSize({object} : {object: fabric.Text}) {
  const { recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const fontSizes = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 36, 40,
    44, 48, 56, 60, 80, 100,
  ];
  const [fontSize, setFontSize] = useState(
    object.fontSize
  );

  const updateTextElement = () => {
    console.log(object);

    object.set({
      fontSize: fontSize,
    });
  
    recordChange();
  };

  useEffect(() => {
    updateTextElement();
  }, [fontSize]);

  return (
    <div className="p-5">
      <EditHeading name="Size" />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <select
            className="w-full border border-slate-200 px-2 py-1"
            name="fontSize"
            id="fontSize"
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          >
            <option value={fontSize}>{fontSize}</option>
            {fontSizes.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
