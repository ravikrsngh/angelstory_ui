import { Outlet } from "react-router-dom";
import { ViewAllHierarchy } from "../../components/view-all/hierarchy";

export default function ViewAll() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen pt-20 flex gap-10">
      <div>
        <ViewAllHierarchy />
      </div>
      <div className="grow">
        <Outlet />
      </div>
    </div>
  );
}
