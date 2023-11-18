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
  IconLetterSpacing,
  IconLineHeight,
  IconUnderline,
} from "@tabler/icons-react";
import { CanvasContextType, GoogleFontResponseType } from "../../types";
import WebFont from 'webfontloader';
import EditInputBox from "./components/edit-inputbox";

export default function EditText({object} : {object: fabric.Text}) {
  const { recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const fontSizes = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 36, 40,
    44, 48, 56, 60, 80, 100,
  ];
  const [fontList, setFontList] = useState<GoogleFontResponseType[]>([]);
  const [fontFamily, setFontFamily] = useState(
    object.fontFamily
  );
  const [fontSize, setFontSize] = useState(
    object.fontSize
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

  const [charSpacing, setCharSpacing] = useState(
    object.charSpacing
  );

  const [lineHeight, setLineHeight] = useState(
    object.lineHeight
  );

  const updateTextElement = () => {
    console.log(object);

    object.set({
      fontSize: fontSize,
      fontWeight: fontWeight,
      fontStyle: fontStyle,
      textAlign: textAlign,
      underline: underline,
      charSpacing: charSpacing,
      lineHeight: lineHeight
    });
  
    recordChange();
  };

  const updateFontFamily = () => {
    console.log(object);

    WebFont.load({
      google: {
        families: [fontFamily || ''],
      },
      active: () => {
        object?.set({
          fontFamily: fontFamily
        });
        recordChange();
      }
    })
  
    
  };

  useEffect(() => {
    updateTextElement();
  }, [fontSize, fontWeight, fontStyle, textAlign, underline, charSpacing, lineHeight]);

  useEffect(() => {
    updateFontFamily();
  }, [fontFamily]);

  useEffect(() => {
    // Fetch the list of Google Fonts using the Google Fonts API
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBkKgCbOnB4ttZA3K2AyZSzR3_N29YO71g')
      .then(response => response.json())
      .then(data => {
        console.log(data.items)
        setFontList(data.items);
      })
      .catch(error => console.error('Error fetching fonts:', error));
  }, []);

  return (
    <div className="p-5">
      <h3 className="font-medium text-lg text-primary-700 mb-4">Edit Text</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
          <select
            className="w- border border-slate-200 px-2 py-1 max-w-full w-full"
            name="fontFamily"
            id="fontFamily"
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value={fontFamily} disabled selected>
              {fontFamily}
            </option>
            {fontList.map((font) => (
              <option value={font.family}>{font.family}</option>
            ))}

            <option value="Times New Roman">Times New Roman</option>
          </select>
          <select
            className="border border-slate-200 px-2 py-1"
            name="fontFamily"
            id="fontFamily"
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          >
            <option value={fontSize}>{fontSize}</option>
            {fontSizes.map((size) => (
              <option value={size}>{size}</option>
            ))}
          </select>
          <EditInputBox
            containerClassName="w-24"
            icon={
              <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
                <IconLetterSpacing />
              </span>
            }
            inputClassName=""
            type="number"
            id="charSpacing"
            defaultValue={charSpacing}
            onChange={(e) => {
              setCharSpacing(parseInt(e.target.value));
            }}
          />
          <EditInputBox
            containerClassName="w-28"
            icon={
              <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
                <IconLineHeight />
              </span>
            }
            inputClassName=""
            type="number"
            id="lineHeight"
            defaultValue={lineHeight}
            onChange={(e) => {
              setLineHeight(parseInt(e.target.value));
            }}
            step={0.01}
          />
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
        <EditFill object={object} />
        <EditBorder object={object} />
        <EditShadow object={object} />
      </div>
    </div>
  );
}
