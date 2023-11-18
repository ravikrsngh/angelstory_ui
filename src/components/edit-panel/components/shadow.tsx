import React, { useContext, useState } from "react";
import { CanvasContext } from "../../../context/canvasContext";
import ColorPallete from "./color-pallete";
import EditHeading from "./edit-heading";
import EditInputBox from "./edit-inputbox";
import { CanvasContextType, EditObjectType } from "../../../types";

export default function EditShadow({object} : EditObjectType) {
  const { recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [shadowColor, setShadowColor] = useState(
    object?.shadow?.color
      ? object?.shadow?.color
      : "#fff"
  );
  const [shadowX, setShadowX] = useState(
    object?.shadow?.offsetX
      ? object?.shadow?.offsetX
      : 0
  );
  const [shadowY, setShadowY] = useState(
    object?.shadow?.offsetY
      ? object?.shadow?.offsetY
      : 0
  );
  const [shadowBlur, setShadowBlur] = useState(
    object?.shadow?.blur
      ? object?.shadow?.blur
      : 0
  );

  const [displayColorPallete, setDisplayColorPallete] = useState(false);

  const applyShadow = (color) => {
    setShadowColor(color);
    object.shadow = {
      color: shadowColor,
      offsetX: shadowX,
      offsetY: shadowY,
      blur: shadowBlur,
    };
    recordChange();
  };
  return (
    <div>
      <EditHeading name="Shadow" />
      <div className="flex gap-2 flex-wrap">
        <div
          className="outline-none w-6 h-6 flex justify-center items-center border border-slate-200"
          style={{ backgroundColor: shadowColor }}
          onClick={() => setDisplayColorPallete(true)}
        ></div>
        <EditInputBox
          containerClassName=""
          icon={
            <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
              X
            </span>
          }
          inputClassName=""
          type="number"
          id="shadowX"
          defaultValue={shadowX}
          onChange={(e) => {
            setShadowX(e.target.value);
            applyShadow(shadowColor);
          }}
        />
        <EditInputBox
          containerClassName=""
          icon={
            <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
              Y
            </span>
          }
          inputClassName=""
          type="number"
          id="shadowY"
          defaultValue={shadowY}
          onChange={(e) => {
            setShadowY(e.target.value);
            applyShadow(shadowColor);
          }}
        />
        <EditInputBox
          containerClassName="w-24"
          icon={
            <span className="block basis-4 shrink-0 grow-0 text-xs opacity-80">
              Blur
            </span>
          }
          inputClassName=""
          type="number"
          id="shadowBlur"
          defaultValue={shadowBlur}
          onChange={(e) => {
            setShadowBlur(e.target.value);
            applyShadow(shadowColor);
          }}
        />
      </div>

      {displayColorPallete && (
        <ColorPallete
          color={shadowColor}
          onChange={applyShadow}
          displayColorPallete={setDisplayColorPallete}
        />
      )}
    </div>
  );
}
