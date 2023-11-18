import {
  IconBackslash,
  IconCircle,
  IconRectangle,
  IconTriangle,
} from "@tabler/icons-react";
import { fabric } from "fabric";
import React, { useContext } from "react";
import { CanvasContext } from "../../context/canvasContext";
import { CanvasContextType } from "../../types";

import blockArrow1 from './../../assets/block arrows 1.svg';

export default function ShapesPanel() {
  const { fabricRef, recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );

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
    const triangle = new fabric.Triangle({
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
    const circle = new fabric.Circle({
      radius: 50,
      fill: "#CECECE",
      left: 150,
      top: 80,
    });
    fabricRef?.current?.add(circle);
    recordChange();
  };

  const addLine = () => {
    const line = new fabric.Line([50, 50, 350, 350], {
      stroke: "#CECECE",
      strokeWidth: 2,
    });

    fabricRef?.current?.add(line);
    recordChange();
  };

  const addSVG = (url : string) => {
    // Load SVG from URL and add it to the canvas
    fabric.loadSVGFromURL(url, (objects, options) => {
      console.log(objects)
      console.log(options)
      const svgObject = fabric.util.groupSVGElements(objects, options);
      // Modify properties as needed
      svgObject.set({
        left: 50,
        top: 50,
        shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.3)', offsetX: 5, offsetY: 5, blur: 10 }), // Add shadow
      });

      fabricRef?.current?.add(svgObject);
      recordChange();
    })
  }

  const onSelectFileFromDevice = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        addSVG(e.target.result);
      };
    }
  };

  return (
    <div className="p-5">
      <form className="flex mb-4">
        <input
          type="file"
          name="file"
          id="upload-file"
          className="w-0 h-0 overflow-hidden"
          onChange={onSelectFileFromDevice}
        />
        <label
          htmlFor="upload-file"
          className="block text-center bg-primary-400 text-white w-full py-3"
        >
          Upload Shape (SVG Format)
        </label>
      </form>
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
        <button
          onClick={addSVG}
          className="text-slate-600 hover:text-primary-600"
        >
          <img src={blockArrow1} className="w-auto h-10"/>
        </button>
      </div>
    </div>
  );
}
