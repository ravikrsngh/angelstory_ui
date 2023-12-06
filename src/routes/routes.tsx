import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login";
import SignUpPage from "../pages/signup";
import AccountDashboard from "../pages/account-dashboard";
import Dashboard from "../pages/dashboard";
import Collection from "../pages/collection";
import CollectionAssets from "../pages/collection-assets";
import Templates from "../pages/templates";
import { PrivateRoutes } from "./private-route";
import { BasicPage } from "../components/ui/basic-page";
import { DesignLoader } from "../pages/design";

const RouteData = () => {

  return (
    <Routes>
      <Route path="/" element={<BasicPage />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/account-dashboard" element={<AccountDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collection/:collectionId" element={<Collection />} />
          <Route path="/collection/assets" element={<CollectionAssets />} />
        </Route>
      </Route>
      <Route path="/">
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/design/:collectionId/:projectId" element={<DesignLoader />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouteData;
