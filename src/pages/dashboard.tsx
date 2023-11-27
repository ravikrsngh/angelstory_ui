import { IconSearch } from "@tabler/icons-react";
import { DashboardCollection } from "../components/dashboard/collection";
import { DashboardTemplates } from "../components/dashboard/template";
import { CreateProjectBanner } from "../components/dashboard/create-project-banner";

export default function Dashboard() {
  
  return (
    <>
    <div className="px-16 py-8 flex flex-col gap-10">
      <div>
        <form
          action=""
          className="flex border-[1px] border-slate-400 bg-white rounded-sm"
        >
          <input
            type="text"
            placeholder="Search templates"
            className="grow px-4 py-3"
          />
          <button className="px-4 py-3">
            <IconSearch />
          </button>
        </form>
      </div>
      <CreateProjectBanner />
      <div className="">
        <DashboardCollection />
      </div>
      <div className="mt-10">
        <DashboardTemplates />
      </div>
    </div>
    </>
    
  )
}
