import React, { useContext, useState } from "react";
import { CanvasContext } from "../../context/canvasContext";
import {
  IconBackslash,
  IconCircle,
  IconLetterT,
  IconPictureInPicture,
  IconRectangle,
  IconTriangle,
} from "@tabler/icons-react";
import { cn } from "../../utils";

export default function LayersPanel() {
  let { fabricRef } = useContext(CanvasContext);
  let [currentOrder, setCurrentOrder] = useState(
    [...fabricRef.current.getObjects()].reverse()
  );
  const [selectedItem, setSelectedItem] = useState(null);

  const getLayerLabel = (type) => {
    if (type == "i-text") {
      return (
        <>
          <IconLetterT size={16} /> Text
        </>
      );
    } else if (type == "rect") {
      return (
        <>
          <IconRectangle size={16} /> Rectangle
        </>
      );
    } else if (type == "triangle") {
      return (
        <>
          <IconTriangle size={16} /> Triangle
        </>
      );
    } else if (type == "circle") {
      return (
        <>
          <IconCircle size={16} /> Circle
        </>
      );
    } else if (type == "line") {
      return (
        <>
          <IconBackslash size={16} /> Line
        </>
      );
    } else if (type == "image") {
      return (
        <>
          <IconPictureInPicture size={16} /> Image
        </>
      );
    }
  };

  const onClickLayer = (item, index) => {
    fabricRef.current.setActiveObject(item);
    fabricRef.current.renderAll();
    setSelectedItem(index);
  };

  const handleDragStart = (e, index) => {
    console.log(index);
    setSelectedItem(index);
  };

  const handleDrop = (e) => {
    console.log("Dropped");
    console.log(e);
    fabricRef.current.moveTo(
      currentOrder[selectedItem],
      currentOrder.length - 1 - parseInt(e.target.id)
    );
    fabricRef.current.renderAll();
    let all_objs = [...fabricRef.current.getObjects()].reverse();
    setCurrentOrder(all_objs);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    console.log(selectedItem);
    console.log(index);
    if (selectedItem === null || index === selectedItem) {
      return;
    }
  };

  return (
    <div className="p-5">
      <h4 className="text-base text-primary-700 font-medium mb-4">Layers</h4>
      <ul>
        {currentOrder.map((item, index) => (
          <li
            id={index}
            className={cn(
              "bg-primary-100 p-3 cursor-pointer mb-4 ",
              index == selectedItem && "border-2 border-primary-400"
            )}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, index)}
            onDrop={handleDrop}
            onDragOver={(e) => handleDragOver(e, index)}
            onClick={() => onClickLayer(item, index)}
          >
            <span id={index} className="flex gap-2 items-center">
              {getLayerLabel(item.type)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
