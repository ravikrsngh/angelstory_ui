import { Disclosure } from "@headlessui/react";
import {
  IconChevronDown,
  IconChevronRight,
  IconChevronUp,
  IconFolderFilled,
} from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetCollectionLevel } from "../../hooks/collection/use-collection-level";
import { CollectionLevelResType, HierarchyType } from "../../types";
import { cn } from "../../utils";

export const ViewAllHierarchy = () => {
  const { data, isLoading, isFetching, isError } = useGetCollectionLevel();
  const [displayDrawer, setDisplayDrawer] = useState(false);
  const [hierarchy, setHierarchy] = useState<HierarchyType[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const obj: HierarchyType[] = [];
    data?.forEach((lvl: CollectionLevelResType) => {
      obj.push({
        name: lvl.name,
        id: lvl.id,
        url: `/view-all/collection/${lvl.id}`,
        childs: [
          {
            name: "All Assets",
            id: 0,
            url: `/view-all/collection/${lvl.id}/assets`,
            childs: [],
          },
          {
            name: "All Journies",
            id: 0,
            url: `/view-all/collection/${lvl.id}/journies`,
            childs: [],
          },
          ...lvl.childList.map((subLvl) => {
            return {
              name: subLvl.name,
              id: subLvl.id,
              url: `/view-all/journey/${subLvl.id}`,
              childs: [
                {
                  name: "All Assets",
                  id: 0,
                  url: `/view-all/journey/${subLvl.id}/assets`,
                  childs: [],
                },
                {
                  name: "All Memories",
                  id: 0,
                  url: `/view-all/journey/${subLvl.id}/memory`,
                  childs: [],
                },
              ],
            };
          }),
        ],
      });
    });
    setHierarchy(obj);
  }, [data]);

  useEffect(() => {
    setDisplayDrawer(false);
  }, [location]);

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }
  return (
    <>
      <div
        className={cn(
          "absolute top-0 lg:relative w-80 border-l bg-white z-10 border-slate-300 h-full py-8 shadow-md overflow-y-auto",
          displayDrawer ? "left-0" : "-left-80",
          "lg:left-0"
        )}
      >
        <h4 className="text-lg mb-4 px-5">Collection</h4>
        {hierarchy.map((h: HierarchyType) => (
          <Disclosure key={h.id} as={Fragment}>
            {({ open }) => (
              <>
                <div className="flex gap-3 items-center text-left px-5 py-2 hover:bg-primary-50 justify-between">
                  <div className="flex gap-2 items-center text-sm ">
                    <IconFolderFilled size={20} />
                    {h.name}
                  </div>
                  <Disclosure.Button className={cn("outline-none")}>
                    {open ? (
                      <IconChevronUp className="ml-auto" />
                    ) : (
                      <IconChevronDown className="ml-auto" />
                    )}
                  </Disclosure.Button>
                </div>

                <Disclosure.Panel className="pl-6">
                  {h.childs.map((h_child) => (
                    <>
                      {h_child.childs.length == 0 ? (
                        <div
                          className="px-9 flex gap-2 items-center text-sm py-2 hover:bg-primary-50"
                          key={h_child.id}
                          onClick={() => navigate(h_child.url)}
                        >
                          {h_child.id ? <IconFolderFilled size={20} /> : null}
                          {h_child.name}
                        </div>
                      ) : (
                        <Disclosure as={Fragment} key={h_child.id}>
                          {({ open }) => (
                            <>
                              <div className="flex gap-3 items-center text-left px-5 py-2 hover:bg-primary-50 justify-between">
                                <div className="flex gap-2 items-center text-sm ">
                                  <IconFolderFilled size={20} />
                                  {h_child.name}
                                </div>
                                <Disclosure.Button
                                  className={cn("outline-none")}
                                >
                                  {open ? (
                                    <IconChevronUp className="ml-auto" />
                                  ) : (
                                    <IconChevronDown className="ml-auto" />
                                  )}
                                </Disclosure.Button>
                              </div>
                              <Disclosure.Panel className="pl-6">
                                {h_child.childs.map((hcc) => (
                                  <>
                                    {h_child.id ? (
                                      <div
                                        className="px-9 flex gap-2 items-center text-sm py-2 hover:bg-primary-50"
                                        key={hcc.id}
                                        onClick={() => navigate(hcc.url)}
                                      >
                                        {hcc.name}
                                      </div>
                                    ) : null}
                                  </>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )}
                    </>
                  ))}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </div>
      <div
        className={cn(
          "lg:hidden w-10 h-10 rounded-full absolute top-1/2 flex justify-end items-center bg-white z-20 shadow-md pr-1 transition",
          displayDrawer ? "left-72 pr-0 justify-center" : "-left-2"
        )}
        onClick={() => setDisplayDrawer((prev) => !prev)}
      >
        <IconChevronRight
          className={cn(displayDrawer ? "transform rotate-180" : "")}
        />
      </div>
    </>
  );
};
