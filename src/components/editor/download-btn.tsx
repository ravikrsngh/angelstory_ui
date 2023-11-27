import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { CanvasContext } from "../../context/canvasContext";
import { fabric } from "fabric";
import * as JSZip from 'jszip';
import { dataURLtoBlob } from "../../utils";

export const DownloadButton = () => {
    let { fabricRef, slides } = useContext(CanvasContext);

  const downloadImage = () => {
    let img = new Image();
    img.src = fabricRef.current.toDataURL({ format: "png" });
    let link = document.createElement("a");
    link.href = img.src;
    link.download = "abc.png";
    link.click();
  };

  const downloadSlideShow = () => {
    const zip = new JSZip();
    for (let index = 0; index < slides.length; index++) {
      const virtualCanvas = new fabric.Canvas('');
      virtualCanvas.setDimensions({
        width: fabricRef.current.getWidth()/fabricRef.current.getZoom(),
        height: fabricRef.current.getHeight()/fabricRef.current.getZoom()
      });
      virtualCanvas.loadFromJSON(slides[index].content, () => {
        console.log(virtualCanvas.toDataURL({ format: 'png' }))
        zip.file(
          `slide${index + 1}.png`,
          virtualCanvas.toDataURL({ format: 'png' }).split(',')[1],
          {base64: true}
        );
        console.log("Added to zip")
      });
    }
    zip.generateAsync({ type: "blob" }).then(function (content) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "slideshow.zip";
      link.click();
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <button className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900">
            Download
          </button>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="px-2 py-2 ">
            <Menu.Item>
              <button onClick={downloadImage} className="block p-2 hover:bg-primary-50 w-full text-left">This Image</button>
            </Menu.Item>
            <Menu.Item>
              <button onClick={downloadSlideShow} className="block p-2 hover:bg-primary-50 w-full text-left">Slideshow</button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
