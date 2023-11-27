import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { CreateProject } from "../create-project";
import dashboard_hero_img from './../../assets/dashboard_hero.svg'

export const CreateProjectBanner = () => {
    const [displayCreateProject,setDisplayCreateProject] = useState<boolean>(false);
  return (
    <>
    <div className="relative rounded-md overflow-hidden max-h-96">
      <img src={dashboard_hero_img} alt="" className="w-full" />
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <button
          onClick={() => setDisplayCreateProject(true)}
          className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500"
        >
          <IconPlus /> <span className="font-medium">New Project</span>
        </button>
      </div>
    </div>
    
    <CreateProject step={1} initalValue={{width: null, height: null, projectType:null}} displayCreateProject={displayCreateProject} setDisplayCreateProject={setDisplayCreateProject} />
    </>
    
  );
};