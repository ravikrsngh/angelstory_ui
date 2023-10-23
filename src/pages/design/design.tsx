import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

export default function Design() {
  const fabricRef = useRef<fabric.Canvas | null>();

  const addRect = (top, left) => {
    const rect = new fabric.Rect({
      top: top,
      left: left,
      width: 60,
      height: 70,
      fill: "red",
    });
    fabricRef.current?.add(rect);
    var comicSansText = new fabric.Text("I'm in Comic Sans", {
      fontFamily: "Comic Sans",
    });
    fabricRef.current?.add(comicSansText);
  };

  const addCircle = (top, left) => {
    fabricRef.current?.add(
      new fabric.Circle({
        radius: 20,
        fill: "black",
        top: top,
        left: left,
        selectable: true,
        hoverCursor: "pointer",
      })
    );
  };

  //   Functions to set the width and height of the canvas and add scaling.

  const setCanvasSizeAndZoom = () => {
    const ratio = 1;
    const originalWidth = 1080;
    document.querySelector(".canvas-container").style.height =
      document.querySelector(".canvas-container").offsetWidth * ratio + "px";
    fabricRef?.current?.setDimensions({
      width: document.querySelector(".canvas-container").offsetWidth,
      height: document.querySelector(".canvas-container").offsetWidth * ratio,
    });
    const scale = fabricRef?.current?.getWidth() / originalWidth;
    fabricRef?.current?.setZoom(scale);
  };

  useEffect(() => {
    if (fabricRef.current) return;
    const canvas = new fabric.Canvas("canvas", { backgroundColor: "white" });
    fabricRef.current = canvas;
    setCanvasSizeAndZoom();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setCanvasSizeAndZoom);

    return () => {
      window.removeEventListener("resize", setCanvasSizeAndZoom);
    };
  }, []);

  return (
    <>
      <div className="py-10 w-full h-[calc(100vh-80px)] overflow-hidden flex bg-slate-50">
        <div className="sidebars">
          <div className="toolbar h-full bg-slate-300 p-4 w-20">
            <button className="text-center w-full">
              <span>Text</span>
            </button>
          </div>
        </div>

        <div className="grow flex justify-center ">
          <canvas
            className="w-full border border-slate-400"
            id="canvas"
          ></canvas>
        </div>
        <div className="bg-slate-300 w-[140px]"></div>
      </div>
    </>
  );
}
