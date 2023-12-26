import React, { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../context/canvasContext";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconItalic,
  IconUnderline,
} from "@tabler/icons-react";
import { CanvasContextType } from "../../types";

export default function EditFontFormat({object} : {object: fabric.Text}) {
  const { recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [fontWeight, setFontWeight] = useState(
    object.fontWeight
  );
  const [fontStyle, setFontStyle] = useState(
    object.fontStyle
  );
  const [textAlign, setTextAlign] = useState(
    object.textAlign
  );
  const [underline, setUnderline] = useState(
    object.underline
  );

  const updateTextElement = () => {
    console.log(object);

    object.set({
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: textAlign,
      underline: underline
    });
  
    recordChange();
  };


  useEffect(() => {
    updateTextElement();
  }, [fontWeight, fontStyle, textAlign, underline]);

  return (
    <div className="">
      <h3 className="font-medium text-lg text-primary-700 mb-4 flex justify-between">Font Formatting</h3>
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
}
