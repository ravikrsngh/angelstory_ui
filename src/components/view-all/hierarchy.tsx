import { Disclosure } from "@headlessui/react";
import {
  IconChevronDown,
  IconChevronUp,
  IconFolderFilled,
} from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";
import { useGetCollectionLevel } from "../../hooks/collection/use-collection-level";
import { CollectionLevelResType, HierarchyType } from "../../types";
import { cn } from "../../utils";

export const ViewAllHierarchy = () => {
  const { data, isLoading, isFetching, isError } = useGetCollectionLevel();
  const [hierarchy, setHierarchy] = useState<HierarchyType[]>([]);

  useEffect(() => {
    const obj: HierarchyType[] = [];
    data?.forEach((lvl: CollectionLevelResType) => {
      obj.push({
        name: lvl.name,
        id: lvl.id,
        url: `/view-all/collection/${lvl.id}`,
        childs: [
          {
            name: "Assets",
            id: 0,
            url: `/view-all/collection/${lvl.id}/assets`,
            childs: [],
          },
          ...lvl.childList.map((subLvl) => {
            return {
              name: subLvl.name,
              id: subLvl.id,
              url: `/view-all/journey/${subLvl.id}`,
              childs: [
                {
                  name: "Assets",
                  id: 0,
                  url: `/view-all/journey/${subLvl.id}/assets`,
                  childs: [],
                },
                {
                  name: "Memories",
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

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }
  return (
    <div className="w-80 border-l border-slate-300 h-full py-8 shadow-md">
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
                              <Disclosure.Button className={cn("outline-none")}>
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
  );
};
