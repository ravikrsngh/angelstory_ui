import React, { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../context/canvasContext";
import EditBorder from "./components/border";
import EditFill from "./components/fill";
import EditShadow from "./components/shadow";

export default function EditText() {
  let { fabricRef } = useContext(CanvasContext);
  let fontSizes = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 36, 40,
    44, 48, 56, 60, 80, 100,
  ];
  let [fontFamily, setFontFamily] = useState(
    fabricRef.current._activeObject.fontFamily
  );
  let [fontSize, setFontSize] = useState(
    fabricRef.current._activeObject.fontSize
  );

  const updateTextElement = () => {
    console.log(fabricRef.current._activeObject);

    fabricRef.current._activeObject.set({
      fontFamily: fontFamily,
      fontSize: fontSize,
    });
    fabricRef.current.renderAll();
  };

  useEffect(() => {
    updateTextElement();
  }, [fontFamily, fontSize]);

  return (
    <div className="p-5">
      <h3 className="font-medium text-lg text-primary-700 mb-4">Edit Text</h3>
      <div className="flex flex-col gap-4">
        <div>
          <select
            className="border border-slate-200 px-2 py-1"
            name="fontFamily"
            id="fontFamily"
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value={fontFamily} disabled selected>
              {fontFamily}
            </option>
            <option value="Comic Sans">Comic Sans</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
          <select
            className="border border-slate-200 px-2 py-1 ml-2"
            name="fontFamily"
            id="fontFamily"
            onChange={(e) => setFontSize(e.target.value)}
          >
            <option value={fontSize}>{fontSize}</option>
            {fontSizes.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
        </div>
        <EditFill />
        <EditBorder />
        <EditShadow />
      </div>
    </div>
  );
}
