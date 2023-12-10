import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { CreateProject } from "../create-project";
import dashboard_hero_img from './../../assets/dashboard_hero.svg'

export const CreateProjectBanner = () => {
    const [displayCreateProject,setDisplayCreateProject] = useState<boolean>(false);
  return (
    <>
      <div className="relative rounded-md overflow-hidden h-40 md:h-56 lg:h-auto max-h-96">
        <img
          src={dashboard_hero_img}
          alt=""
          className="h-40 md:h-56 max-w-none lg:h-auto lg:w-full"
        />
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <button
            onClick={() => setDisplayCreateProject(true)}
            className="flex items-center gap-2 bg-primary-400 text-white px-10 py-3 rounded-sm hover:bg-primary-500"
          >
            <IconPlus />{" "}
            <span className="text-sm lg:text-base font-medium">
              New Journey
            </span>
          </button>
        </div>
      </div>

      <CreateProject
        initialStep={1}
        initalValue={{
          collectionId: null,
          height: null,
          name: "Untitled",
          projectType: null,
          width: null,
          formattedData: "",
          previewImage: "",
        }}
        displayCreateProject={displayCreateProject}
        setDisplayCreateProject={setDisplayCreateProject}
      />
    </>
  );
};
