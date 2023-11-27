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
import { CanvasContextType } from "../../types";

export default function LayersPanel() {
  const { fabricRef } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [currentOrder, setCurrentOrder] = useState(
    fabricRef.current ? [...fabricRef.current.getObjects()].reverse() : []
  );
  const [selectedItem, setSelectedItem] = useState<number | -1>(-1);

  const getLayerLabel = (type: string | undefined) => {
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

  const onClickLayer = (item: fabric.Object, index: number) => {
    if (fabricRef.current) {
      fabricRef.current.setActiveObject(item);
      fabricRef.current.renderAll()
      setSelectedItem(index);
    }
  };

  const handleDragStart = (index: number) => {
    console.log(index);
    setSelectedItem(index);
  };

  const handleDrop: React.DragEventHandler<HTMLLIElement> = (e) => {
    if (fabricRef.current) {
      console.log("Dropped");
      console.log(e);
      fabricRef.current.moveTo(
        currentOrder[selectedItem],
        currentOrder.length - 1 - parseInt(e.currentTarget.id)
      );
      fabricRef.current.renderAll();
      const all_objs = [...fabricRef.current.getObjects()].reverse();
      setCurrentOrder(all_objs);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault();
    console.log(selectedItem);
    console.log(index);
    if (selectedItem === null || index === selectedItem) {
      return;
    }
  };

  return (
    <div className="p-5">
      <h4 className="text-base text-primary-700 font-medium mb-1">Layers</h4>
      <span className="text-xs leading-5 block mb-4">
        Drag and drop the layers to the order of your choice
      </span>
      <ul>
        {currentOrder.map((item, index) => (
          <li
            id={String(index)}
            className={cn(
              "bg-primary-100 p-3 cursor-pointer mb-4 ",
              index == selectedItem && "border-2 border-primary-400"
            )}
            draggable="true"
            onDragStart={() => handleDragStart(index)}
            onDrop={handleDrop}
            onDragOver={(e) => handleDragOver(e, index)}
            onClick={() => onClickLayer(item, index)}
          >
            <span className="flex gap-2 items-center">
              {index + 1} - {getLayerLabel(item.type)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
