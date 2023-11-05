import {
  IconBackslash,
  IconCircle,
  IconRectangle,
  IconTriangle,
} from "@tabler/icons-react";
import { fabric } from "fabric";
import React, { useContext } from "react";
import { CanvasContext } from "../../context/canvasContext";

export default function ShapesPanel() {
  const { fabricRef, recordChange } = useContext(CanvasContext);

  const addRectangle = () => {
    const rect = new fabric.Rect({
      top: 80,
      left: 80,
      width: 400,
      height: 300,
      fill: "#CECECE",
    });
    fabricRef?.current?.add(rect);
    recordChange();
  };

  const addTriangle = () => {
    let triangle = new fabric.Triangle({
      width: 400,
      height: 300,
      fill: "#CECECE",
      left: 80,
      top: 80,
    });
    fabricRef?.current?.add(triangle);
    recordChange();
  };

  const addCircle = () => {
    let circle = new fabric.Circle({
      radius: 50,
      fill: "#CECECE",
      left: 150,
      top: 80,
    });
    fabricRef?.current?.add(circle);
    recordChange();
  };

  const addLine = () => {
    let line = new fabric.Line([50, 50, 350, 350], {
      stroke: "#CECECE",
      strokeWidth: 2,
    });

    fabricRef?.current?.add(line);
    recordChange();
  };

  return (
    <div className="p-5">
      <h4 className="text-base text-primary-700 font-medium">Shapes</h4>
      <div className="flex gap-4 mt-4">
        <button
          onClick={addRectangle}
          className="text-slate-600 hover:text-primary-600"
        >
          <IconRectangle size={40} />
        </button>
        <button
          onClick={addTriangle}
          className="text-slate-600 hover:text-primary-600"
        >
          <IconTriangle size={40} />
        </button>
        <button
          onClick={addCircle}
          className="text-slate-600 hover:text-primary-600"
        >
          <IconCircle size={40} />
        </button>
        <button
          onClick={addLine}
          className="text-slate-600 hover:text-primary-600"
        >
          <IconBackslash size={40} />
        </button>
      </div>
    </div>
  );
}
