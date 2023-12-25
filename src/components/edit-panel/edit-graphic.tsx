/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck

import EditBorder from "./components/border";
import EditShadow from "./components/shadow";
import EditFill from "./components/fill";
import { EditObjectType } from "../../types";
import { DeleteObjectButton } from "../editor/delete-object-btn";

export default function EditGraphic({object} : EditObjectType) {
  console.log(object)
  return (
    <div className="p-5">
      <h3 className="font-medium text-lg text-primary-700 mb-4 flex justify-between">Edit <DeleteObjectButton /></h3>
      <div className="flex flex-col gap-4">
        {!["line"].includes(object?.type) && (
          <EditFill object={object} />
        )}
        <EditBorder object={object} />
        <EditShadow object={object} />
      </div>
    </div>
  );
}
