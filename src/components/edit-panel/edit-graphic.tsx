import React, { useContext } from "react";
import EditBorder from "./components/border";
import EditShadow from "./components/shadow";
import EditFill from "./components/fill";
import { CanvasContext } from "../../context/canvasContext";

export default function EditGraphic() {
  let { fabricRef } = useContext(CanvasContext);
  return (
    <div className="p-5">
      <h3 className="font-medium text-lg text-primary-700 mb-4">Edit</h3>
      <div className="flex flex-col gap-4">
        {!["line"].includes(fabricRef?.current?._activeObject?.type) && (
          <EditFill />
        )}
        <EditBorder />
        <EditShadow />
      </div>
    </div>
  );
}
