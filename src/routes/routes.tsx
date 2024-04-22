import { Route, Routes } from "react-router-dom";
import { Template } from "../components/templates-reference/template";
import ViewCollection from "../components/templates-reference/view-collection";
import ViewJourney from "../components/templates-reference/view-journey";
import { BasicPage } from "../components/ui/basic-page";
import AccountDashboard from "../pages/account-dashboard";
import Collection from "../pages/collection";
import CollectionAssets from "../pages/collection-assets";
import Dashboard from "../pages/dashboard";
import { DesignLoader } from "../pages/design";
import { ForgotPassword } from "../pages/forgot-password";
import Journey from "../pages/journey";
import LoginPage from "../pages/login";
import PublicPage from "../pages/public";
import SignUpPage from "../pages/signup";
import Templates from "../pages/templates";
import ViewAll from "../pages/view-all";
import { ViewAllCollectionAssets } from "../pages/view-all/collection-assets";
import { ViewAllCollectionJournies } from "../pages/view-all/collection-journey";
import { ViewAllJourneyAssets } from "../pages/view-all/journey-assets";
import { ViewAllJourneyMemories } from "../pages/view-all/journey-memories";
import { PrivateRoutes } from "./private-route";

const RouteData = () => {
  return (
    <Routes>
      <Route path="/" element={<BasicPage />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/account-dashboard" element={<AccountDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/collection/:collectionId" element={<Collection />} />
          <Route path="/journey/:journeyId" element={<Journey />} />
          <Route
            path="/collection/:collectionId/assets"
            element={<CollectionAssets />}
          />
          <Route path="/public-view/:publicId" element={<PublicPage />} />
        </Route>
        <Route path="/" element={<PrivateRoutes />}>
          <Route path="/view-all" element={<ViewAll />}>
            <Route
              path="collection/:collectionId/assets"
              element={<ViewAllCollectionAssets />}
            />
            <Route
              path="collection/:collectionId/journies"
              element={<ViewAllCollectionJournies />}
            />
            <Route
              path="journey/:journeyId/assets"
              element={<ViewAllJourneyAssets />}
            />
            <Route
              path="journey/:journeyId/memory"
              element={<ViewAllJourneyMemories />}
            />
          </Route>
        </Route>
        <Route path="/view" element={<Template />} />
        <Route path="/view-collection" element={<ViewCollection />} />
        <Route path="/view-journey" element={<ViewJourney />} />
      </Route>
      <Route path="/">
        <Route path="/" element={<PrivateRoutes />}>
          <Route
            path="/design/:collectionId/:journeyId/:projectId"
            element={<DesignLoader />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default RouteData;
