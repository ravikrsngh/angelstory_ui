import React, { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../context/canvasContext";
import EditBorder from "./components/border";
import EditFill from "./components/fill";
import EditShadow from "./components/shadow";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconUnderline,
} from "@tabler/icons-react";

export default function EditText() {
  let { fabricRef, recordChange } = useContext(CanvasContext);
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
  let [fontWeight, setFontWeight] = useState(
    fabricRef.current._activeObject.fontWeight
  );
  let [fontStyle, setFontStyle] = useState(
    fabricRef.current._activeObject.fontStyle
  );
  let [textAlign, setTextAlign] = useState(
    fabricRef.current._activeObject.textAlign
  );
  let [underline, setUnderline] = useState(
    fabricRef.current._activeObject.underline
  );

  const updateTextElement = () => {
    console.log(fabricRef.current._activeObject);

    fabricRef.current._activeObject.set({
      fontFamily: fontFamily,
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: textAlign,
      underline: underline,
    });
    recordChange();
  };

  useEffect(() => {
    updateTextElement();
  }, [fontFamily, fontSize, fontWeight, fontStyle, textAlign, underline]);

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
            <option value="Arial">Arial</option>
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
        <div className="flex gap-2">
          <button
            className={`${textAlign == "left" ? "text-primary-400" : ""}`}
            onClick={() => setTextAlign("left")}
          >
            <IconAlignLeft />
          </button>
          <button
            className={`${textAlign == "center" ? "text-primary-400" : ""}`}
            onClick={() => setTextAlign("center")}
          >
            <IconAlignCenter />
          </button>
          <button
            className={`${textAlign == "right" ? "text-primary-400" : ""}`}
            onClick={() => setTextAlign("right")}
          >
            <IconAlignRight />
          </button>
          <button
            className={`${fontWeight == "bold" ? "text-primary-400" : ""}`}
            onClick={() =>
              setFontWeight((prev) => {
                if (prev == "bold") {
                  return "normal";
                } else {
                  return "bold";
                }
              })
            }
          >
            <IconBold />
          </button>
          <button
            className={`${fontStyle == "italic" ? "text-primary-400" : ""}`}
            onClick={() =>
              setFontStyle((prev) => {
                if (prev == "italic") {
                  return "normal";
                } else {
                  return "italic";
                }
              })
            }
          >
            <IconItalic />
          </button>
          <button
            className={`${underline ? "text-primary-400" : ""}`}
            onClick={() => setUnderline((prev) => !prev)}
          >
            <IconUnderline />
          </button>
        </div>
        <EditFill />
        <EditBorder />
        <EditShadow />
      </div>
    </div>
  );
}
