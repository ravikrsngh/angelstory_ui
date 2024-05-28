import { Link } from "react-router-dom";
import dummyCatImg from "../assets/Artboard 5.svg";
import { DashboardCollection } from "../components/dashboard/collection";
import { CreateProjectBanner } from "../components/dashboard/create-project-banner";
import { DashboardRecentActivity } from "../components/dashboard/recent-activity";
import { SharedEntity } from "../components/dashboard/shared-entity";

export default function Dashboard() {
  return (
    <>
      <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-6 md:gap-10">
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
        <div className="overflow-x-auto">
          <div className="flex gap-4">
            <div className="min-w-[140px] md:min-w-[200px] rounded-lg">
              <Link to={"/"} className="w-full">
                <img src={dummyCatImg} className="w-full" />
              </Link>
            </div>
            <div className="min-w-[140px] md:min-w-[200px] rounded-lg">
              <Link to={"/"} className="w-full">
                <img src={dummyCatImg} className="w-full" />
              </Link>
            </div>
            <div className="min-w-[140px] md:min-w-[200px] rounded-lg">
              <Link to={"/"} className="w-full">
                <img src={dummyCatImg} className="w-full" />
              </Link>
            </div>

            <div className="min-w-[140px] md:min-w-[200px] rounded-lg">
              <Link to={"/"} className="w-full">
                <img src={dummyCatImg} className="w-full" />
              </Link>
            </div>
            <div className="min-w-[140px] md:min-w-[200px] rounded-lg">
              <Link to={"/"} className="w-full">
                <img src={dummyCatImg} className="w-full" />
              </Link>
            </div>
            <div className="min-w-[140px] md:min-w-[200px] rounded-lg">
              <Link to={"/"} className="w-full">
                <img src={dummyCatImg} className="w-full" />
              </Link>
            </div>
            <div className="min-w-[140px] md:min-w-[200px] rounded-lg">
              <Link to={"/"} className="w-full">
                <img src={dummyCatImg} className="w-full" />
              </Link>
            </div>
          </div>
        </div>

        <div>
          <DashboardRecentActivity />
        </div>
        <div className="">
          <DashboardCollection />
        </div>
        <div className="">
          <SharedEntity />
        </div>
      </div>
    </>
  );
}
