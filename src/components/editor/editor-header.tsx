/* eslint-disable @typescript-eslint/ban-ts-comment */
import { IconArrowBackUp, IconTrash } from "@tabler/icons-react";
import { fabric } from "fabric";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CanvasContext } from "../../context/canvasContext";
import { CanvasContextType, EditorHeaderPropType } from "../../types";
import logoimg from "./../../assets/logo-angel-journey.svg";
import { DownloadButton } from "./download-btn";

export default function EditorHeader({
  deleteObject,
  goBackInHistory,
  name,
  saveProject,
}: EditorHeaderPropType) {
  const { fabricRef, slides, musicArr } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );

  // const createTemplateHook = useCreateTemplate();

  // const generateTemplateData = () => {
  //   const virtualCanvas = new fabric.Canvas("");
  //   virtualCanvas.setDimensions({
  //     //@ts-ignore
  //     width: fabricRef.current.getWidth() / fabricRef.current.getZoom(),
  //     //@ts-ignore
  //     height: fabricRef.current.getHeight() / fabricRef.current.getZoom(),
  //   });
  //   virtualCanvas.loadFromJSON(slides[0].content, () => {
  //     createTemplateHook.mutate({
  //       collectionId: 0,
  //       formattedData: JSON.stringify(slides),
  //       name: "Template2 ",
  //       premium: false,
  //       previewImage: virtualCanvas.toDataURL({ format: "png" }),
  //       price: 0,
  //     });
  //   });
  // };

  const saveProjectName = (e: React.FocusEvent) => {
    if ((e.target as HTMLInputElement).value) {
      saveProject({ name: (e.target as HTMLInputElement).value }, 0);
    } else {
      saveProject({ name: "Untitled" }, 0);
    }
  };

  const saveProjectStatus = () => {
    const virtualCanvas = new fabric.Canvas("");
    virtualCanvas.setDimensions({
      //@ts-ignore
      width: fabricRef.current.getWidth() / fabricRef.current.getZoom(),
      //@ts-ignore
      height: fabricRef.current.getHeight() / fabricRef.current.getZoom(),
    });
    virtualCanvas.loadFromJSON(slides[0].content, () => {
      saveProject(
        {
          formattedData: JSON.stringify({ slides: slides, music: musicArr }),
          previewImage: virtualCanvas.toDataURL({ format: "png" }),
        },
        0
      );
    });
  };

  return (
    <header className="bg-primary-50 fixed top-0 left-0 w-full z-10 shadow-md">
      <nav className="hidden mx-auto lg:flex items-center justify-between gap-x-6 px-4 md:px-10 lg:px-16 py-4">
        <div className="hidden lg:flex lg:flex-1">
          <Link to="/dashboard" className="-m-1.5 p-1.5">
            <img className="h-12 w-auto" src={logoimg} alt="" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <input
            type="text"
            className="text-center p-2 bg-transparent"
            defaultValue={name}
            onBlur={saveProjectName}
          />
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <button onClick={saveProjectStatus}>Save</button>
          {/* <button
            className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
            onClick={generateTemplateData}
          >
            Generate template
          </button> */}
          <DownloadButton />
        </div>
      </nav>
      <nav className="flex lg:hidden items-center justify-end gap-x-6 px-4 md:px-10 lg:px-16 py-4">
        <div className="flex grow justify-center overflow-hidden">
          <input
            type="text"
            className="w-full p-2 bg-transparent"
            defaultValue={name}
            onBlur={saveProjectName}
          />
        </div>
        <div className="flex items-center gap-x-6">
          <button className=" text-primary-400" onClick={goBackInHistory}>
            <IconArrowBackUp />
          </button>
        </div>

        {fabricRef.current?._activeObject ? (
          <button className="text-primary-400" onClick={deleteObject}>
            <IconTrash />
          </button>
        ) : null}
        <button className="text-primary-400" onClick={saveProjectStatus}>
          Save
        </button>
        <DownloadButton />
      </nav>
    </header>
  );
}
