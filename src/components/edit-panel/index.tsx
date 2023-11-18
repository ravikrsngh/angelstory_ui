import EditImage from "./edit-image";
import EditGraphic from "./edit-graphic";
import EditText from "./edit-text";
import { EditGroup } from "./edit-group";
import { EditObjectType } from "../../types";

export default function EditPanel({object} : EditObjectType ) {
  if(object && object.type) {
    if (object.type == "image") {
      return (
        <div>
          <EditImage object={object} />
        </div>
      );
    } else if (
      ["rect", "circle", "triangle", "line","path","polygon"].includes(object.type)
    ) {
      return (
        <div>
          <EditGraphic object={object} />
        </div>
      );
    } else if (object.type == "i-text") {
      return (
        <div>
          <EditText object={object} />
        </div>
      );
    } else if (object.type == "group") {
      return (
        <div>
          <EditGroup object={object} />
        </div>
      );
    }
  }
  return <></>;
}
