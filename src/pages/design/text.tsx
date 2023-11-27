import { IconRectangle } from "@tabler/icons-react";
import { fabric } from "fabric";
import { useContext } from "react";
import { CanvasContext } from "../../context/canvasContext";

export default function TextPanel() {
  let { fabricRef, recordChange } = useContext(CanvasContext);

  const addHeading = (size) => {
    let text = new fabric.IText("Enter your text here", {
      left: 100,
      top: 100,
      fontSize: parseInt(size / fabricRef.current.getZoom()),
      fill: "black",
    });
    fabricRef.current.add(text);
    fabricRef.current.setActiveObject(text);
    recordChange();
  };

  return (
    <div className="p-5">
      <h4 className="hidden lg:block text-base text-primary-700 font-medium">Text</h4>
      <div className="flex gap-4 mt-4 flex-col">
        <button
          onClick={() => addHeading(48)}
          className="text-slate-800 hover:text-white hover:bg-primary-400 bg-slate-200 w-full py-3 text-2xl"
        >
          Add Heading 1
        </button>
        <button
          onClick={() => addHeading(30)}
          className="text-slate-800 hover:text-white hover:bg-primary-400 bg-slate-200 w-full py-3 text-xl"
        >
          Add Sub Heading
        </button>
        <button
          onClick={() => addHeading(18)}
          className="text-slate-800 hover:text-white hover:bg-primary-400 bg-slate-200 w-full py-3 text-sm"
        >
          Add Paragraph
        </button>
      </div>
    </div>
  );
}
