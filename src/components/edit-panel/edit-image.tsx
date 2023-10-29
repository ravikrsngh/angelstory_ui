import EditBorder from "./components/border";
import EditShadow from "./components/shadow";

export default function EditImage() {
  return (
    <div className="p-5">
      <h3 className="font-medium text-lg text-primary-700 mb-4">Edit Image</h3>
      <div className="flex flex-col gap-4">
        <EditBorder />
        <EditShadow />
      </div>
    </div>
  );
}
