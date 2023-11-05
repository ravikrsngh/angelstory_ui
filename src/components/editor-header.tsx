import { useContext, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logoimg from "./../assets/logo.svg";
import { Link } from "react-router-dom";
import { CanvasContext } from "../context/canvasContext";

export default function EditorHeader() {
  let { fabricRef } = useContext(CanvasContext);

  const downloadImage = () => {
    let img = new Image();
    img.src = fabricRef.current.toDataURL({ format: "png" });
    let link = document.createElement("a");
    link.href = img.src;
    link.download = "abc.png";
    link.click();
  };

  return (
    <header className="bg-primary-50 fixed top-0 left-0 w-full z-10 shadow-md">
      <nav
        className="mx-auto flex items-center justify-between gap-x-6 px-4 md:px-10 lg:px-16 py-4"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-12 w-auto" src={logoimg} alt="" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <input
            type="text"
            defaultValue="Name of the file"
            className="text-center p-2 bg-transparent"
          />
        </div>
        <div className="flex flex-1 items-center justify-end gap-x-6">
          <button
            className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
            onClick={downloadImage}
          >
            Download
          </button>
          <button className=" bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Share
          </button>
        </div>
      </nav>
    </header>
  );
}
