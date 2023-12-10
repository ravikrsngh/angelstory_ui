import TemplatesGrid from "../components/templates-grid";
import AccountDashboardHeading from "../components/account-dashboard/account-dashboard-heading";

export default function Templates() {
  return (
    <div className="p-10">
      <div className="text-center">
        <AccountDashboardHeading name="All Templates" />
      </div>
      <TemplatesGrid />
    </div>
  );
}
