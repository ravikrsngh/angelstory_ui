import { IconCrown } from "@tabler/icons-react";
import template_img from "./../assets/templates_card.svg";
export default function TemplatesGrid() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        <div className="relative">
          <img src={template_img} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
          <IconCrown className="absolute top-4 right-4 text-orange-300" />
        </div>

        <div className="relative">
          <img src={template_img} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={template_img} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
          <IconCrown className="absolute top-4 right-4 text-orange-300" />
        </div>
        <div className="relative">
          <img src={template_img} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={template_img} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
          <IconCrown className="absolute top-4 right-4 text-orange-300" />
        </div>
        <div className="relative">
          <img src={template_img} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={template_img} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
          <IconCrown className="absolute top-4 right-4 text-orange-300" />
        </div>
        <div className="relative">
          <img src={template_img} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
