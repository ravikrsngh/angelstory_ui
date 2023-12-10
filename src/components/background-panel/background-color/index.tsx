import { Disclosure } from "@headlessui/react";
import { IconPalette } from "@tabler/icons-react";
import { Sketch } from "@uiw/react-color";
import { useContext } from "react";
import { cn } from "../../../utils";
import { CanvasContext } from "../../../context/canvasContext";
import { CanvasContextType } from "../../../types";



const BackgroundColorButton = ({ setBackgroundColor, color }:{ setBackgroundColor: (value:string) => void, color:string }) => {
  return (
    <button
      className={cn(
        "outline-none w-10 h-10 flex justify-center items-center border border-slate-200"
      )}
      style={{ backgroundColor: color }}
      onClick={() => setBackgroundColor(color)}
    ></button>
  );
};

export default function BackgroundColorSection() {
  const { fabricRef, recordChange } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );

  const setBackgroundColor = (value: string) => {
    fabricRef?.current?.setBackgroundColor(
      value,
      fabricRef?.current?.renderAll.bind(fabricRef?.current)
    );
    recordChange();
  };

  return (
    <div className="choose-background-color">
      <h4 className="text-xs text-primary-700 font-medium">Background Color</h4>
      <div className="mt-4">
        <Disclosure as={"div"}>
          {({ open }) => (
            <>
              <div className="flex gap-2">
                <Disclosure.Button
                  className={cn(
                    "outline-none w-10 h-10 flex justify-center items-center",
                    open
                      ? " bg-primary-400 text-white"
                      : " bg-white text-primary-400 border border-primary-400"
                  )}
                >
                  <IconPalette size={24} />
                </Disclosure.Button>
                <BackgroundColorButton
                  color="#ffffff"
                  setBackgroundColor={setBackgroundColor}
                />
                <BackgroundColorButton
                  color="#50d71e"
                  setBackgroundColor={setBackgroundColor}
                />
              </div>
              <Disclosure.Panel>
                <Sketch
                  style={{
                    width: "100%",
                    marginTop: "16px",
                    boxShadow: "none",
                    border: "1px solid rgba(0,0,0,0.15)",
                  }}
                  color={String(fabricRef?.current?.backgroundColor)}
                  onChange={(color) => setBackgroundColor(color.hex)}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
