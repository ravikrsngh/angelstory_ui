
import { EditObjectType } from "../../types";
import { DeleteObjectButton } from "../editor/delete-object-btn";
import EditBorder from "./components/border";
import EditShadow from "./components/shadow";

export default function EditImage({object} : EditObjectType) {
  return (
    <div className="p-5">
      <h3 className="font-medium text-lg text-primary-700 mb-4 flex justify-between">Edit Image <DeleteObjectButton /> </h3>
      <div className="flex flex-col gap-4">
        <EditBorder object={object} />
        <EditShadow object={object} />
      </div>
    </div>
  );
}
