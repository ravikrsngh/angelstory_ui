import EditBorder from "./components/border";
import EditShadow from "./components/shadow";
import EditFill from "./components/fill";
import { EditObjectType } from "../../types";

export default function EditGraphic({object} : EditObjectType) {
  console.log(object)
  return (
    <div className="p-5">
      <h3 className="font-medium text-lg text-primary-700 mb-4">Edit</h3>
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
