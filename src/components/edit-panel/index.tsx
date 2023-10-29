import React, { useContext } from "react";
import { CanvasContext } from "../../context/canvasContext";
import EditImage from "./edit-image";
import EditGraphic from "./edit-graphic";
import EditText from "./edit-text";

export default function EditPanel() {
  let { fabricRef } = useContext(CanvasContext);
  console.log(fabricRef.current?._activeObject?.type);
  if (fabricRef?.current?._activeObject?.type == "image") {
    return (
      <div>
        <EditImage />
      </div>
    );
  } else if (
    ["rect", "circle", "triangle", "line"].includes(
      fabricRef?.current?._activeObject?.type
    )
  ) {
    return (
      <div>
        <EditGraphic />
      </div>
    );
  } else if (fabricRef?.current?._activeObject?.type == "i-text") {
    return (
      <div>
        <EditText />
      </div>
    );
  }
  return <></>;
}
