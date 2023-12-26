import React, { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../context/canvasContext";
import {
  IconLetterSpacing,
  IconLineHeight,
} from "@tabler/icons-react";
import { CanvasContextType } from "../../types";
import EditInputBox from "./components/edit-inputbox";

export default function EditFontSpacing({object} : {object: fabric.Text}) {
  const { recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
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
      charSpacing: charSpacing,
      lineHeight: lineHeight
    });
  
    recordChange();
  };


  useEffect(() => {
    updateTextElement();
  }, [charSpacing, lineHeight]);

  return (
    <div className="">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap">
            <EditInputBox
            containerClassName="w-full border-none"
            icon={
              <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
                <IconLetterSpacing />
              </span>
            }
            inputClassName=""
            type="range"
            id="charSpacing"
            defaultValue={charSpacing}
            min={4}
            max={360}
            onChange={(e) => {
              setCharSpacing(parseInt(e.target.value));
            }}
          />
          <EditInputBox
            containerClassName="w-full border-none"
            icon={
              <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
                <IconLineHeight />
              </span>
            }
            inputClassName=""
            type="range"
            id="lineHeight"
            min={0}
            max={500}
            defaultValue={lineHeight}
            onChange={(e) => {
              setLineHeight(parseInt(e.target.value));
            }}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
}
