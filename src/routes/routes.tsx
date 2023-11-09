import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import AccountDashboard from "../pages/account-dashboard";
import Dashboard from "../pages/dashboard";
import Collection from "../pages/collection";
import CollectionAssets from "../pages/collection-assets";
import Design from "../pages/design/design";
import Templates from "../pages/templates";

const RouteData = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/account-dashboard" element={<AccountDashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/collection" element={<Collection />} />
      <Route path="/collection/assets" element={<CollectionAssets />} />
      <Route path="/design" element={<Design />} />
    </Routes>
  );
};

export default RouteData;
