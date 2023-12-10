import AccountDashboardHeading from "./account-dashboard-heading";
import { Tab } from "@headlessui/react";
import { cn } from "../../utils";
import TemplatesGrid from "../templates-grid";

export default function YourTemplates() {
  return (
    <div className="">
      <AccountDashboardHeading name="Your Templates" />
      <Tab.Group>
        <Tab.List>
          <div className="flex gap-4 border-b border-slate-300 items-center mb-8">
            <Tab>
              {({ selected }) => (
                <button
                  className={cn(
                    "px-10 py-3 font-medium",
                    selected
                      ? "text-primary-400 border-b-2 border-primary-400"
                      : ""
                  )}
                >
                  Static
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  className={cn(
                    "px-10 py-3 font-medium",
                    selected
                      ? "text-primary-400 border-b-2 border-primary-400"
                      : ""
                  )}
                >
                  Video
                </button>
              )}
            </Tab>
            <Tab>
              {({ selected }) => (
                <button
                  className={cn(
                    "px-10 py-3 font-medium",
                    selected
                      ? "text-primary-400 border-b-2 border-primary-400"
                      : ""
                  )}
                >
                  Audio
                </button>
              )}
            </Tab>
            <button className="ml-auto px-7 py-2 font-medium text-white bg-primary-400">
              BUY NEW TEMPLATE
            </button>
          </div>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <TemplatesGrid />
          </Tab.Panel>
          <Tab.Panel>
            <TemplatesGrid />
          </Tab.Panel>
          <Tab.Panel>
            <TemplatesGrid />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
