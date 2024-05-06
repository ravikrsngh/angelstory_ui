import { DashboardCollection } from "../components/dashboard/collection";
import { CreateProjectBanner } from "../components/dashboard/create-project-banner";
import { DashboardRecentActivity } from "../components/dashboard/recent-activity";
import { SharedEntity } from "../components/dashboard/shared-entity";

export default function Dashboard() {
  return (
    <>
      <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-8 md:gap-10">
        {/* <div>
          <form
            action=""
            className="flex border-[1px] border-slate-400 bg-white rounded-sm"
          >
            <input
              type="text"
              placeholder="Search templates"
              className="grow px-4 py-3 outline-none"
            />
            <button className="px-4 py-3">
              <IconSearch />
            </button>
          </form>
        </div> */}
        <CreateProjectBanner />
        <div>
          <DashboardRecentActivity />
        </div>
        <div className="mt-3 md:mt-10">
          <DashboardCollection />
        </div>
        <div className="mt-3 md:mt-10">
          <SharedEntity />
        </div>
      </div>
    </>
  );
}
