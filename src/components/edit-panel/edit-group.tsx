import { EditObjectType } from "../../types";
import { Disclosure } from "@headlessui/react";
import EditPanel from ".";
import { IconChevronDown} from "@tabler/icons-react";

const GroupItem = ({object}:EditObjectType) => {
    return (
        <Disclosure>
            {({open}) => (
                <>
                    <Disclosure.Button className="bg-primary-100 text-left p-2 flex justify-between">
                        {(object as fabric.Object).type}
                        <IconChevronDown className={open? 'rotate-180 transform' : ''} />
                    </Disclosure.Button>
                    <Disclosure.Panel className="bg-slate-100">
                        <EditPanel object={object}/>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
      )
}

export const EditGroup = ({object} : EditObjectType) => {
    return (
        <div className="p-5 overflow-auto">
            <h3 className="font-medium text-lg text-primary-700 mb-4">Edit Graphic</h3>
            <div className="flex flex-col gap-4">
                {(object as fabric.Group)._objects.map((obj) => (
                    <GroupItem object={obj} />
                ))}
            </div>
        </div>
    )
}