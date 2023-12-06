import { useContext, useState } from "react";
import logoimg from "./../../assets/logo.svg";
import { Link } from "react-router-dom";
import { CanvasContext } from "../../context/canvasContext";
import { useCreateTemplate } from "../../hooks/templates/use-create-template";
import { fabric } from "fabric";
import { DownloadButton } from "./download-btn";
import { IconArrowBackUp, IconArrowLeft, IconShare, IconTrash } from "@tabler/icons-react";

export default function EditorHeader({deleteObject,goBackInHistory, name, saveProject}) {
  const { fabricRef, slides } = useContext(CanvasContext);

  const createTemplateHook = useCreateTemplate();

  const generateTemplateData = () => {
    const virtualCanvas = new fabric.Canvas('');
      virtualCanvas.setDimensions({
        width: fabricRef.current.getWidth()/fabricRef.current.getZoom(),
        height: fabricRef.current.getHeight()/fabricRef.current.getZoom()
      });
    virtualCanvas.loadFromJSON(slides[0].content, () => {
      createTemplateHook.mutate({
        collectionId: 0,
        formattedData: JSON.stringify(slides),
        name: "Template2 ",
        premium: false,
        previewImage:  virtualCanvas.toDataURL({format:'png'}),
        price: 0
      });
    });
  };

  const saveProjectName = (e) => {
    if(e.target.value) {
      saveProject({name:e.target.value})
    } else {
      saveProject({name: "Untitled"})
    }
  }

  return (
    <header className="bg-primary-50 fixed top-0 left-0 w-full z-10 shadow-md">
      <nav
        className="hidden mx-auto lg:flex items-center justify-between gap-x-6 px-4 md:px-10 lg:px-16 py-4">
        <div className="hidden lg:flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
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
        <button
            className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
            onClick={generateTemplateData}
          >
            Generate template
          </button>
          <DownloadButton/>
          <button className="hidden lg:block bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Share
          </button>
        </div>
      </nav>
      <nav className="flex lg:hidden items-center justify-end gap-x-6 px-4 md:px-10 lg:px-16 py-4">
      <div className="mr-auto flex items-center gap-x-6">
        <button className=" text-primary-400" onClick={goBackInHistory}>
          <IconArrowBackUp />
        </button>
      </div>
      
        {
          fabricRef.current?._activeObject? 
          <button className="text-primary-400" onClick={deleteObject}>
            <IconTrash />
          </button> : null
        }
        <DownloadButton/>
        <button className="text-primary-400">
          <IconShare />
        </button>
      </nav>
    </header>
  );
}
