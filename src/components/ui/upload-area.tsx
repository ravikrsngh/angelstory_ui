import { ChangeEvent } from "react";
import {
  DragOverEventHandlerType,
  DropEventHandlerType,
  UploadAreaCompPropType,
} from "../../types";

export default function UploadArea({
  setFiles,
  nextBtnHandler,
}: UploadAreaCompPropType) {
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files as FileList) as File[];
    setFiles(selectedFiles);
    nextBtnHandler();
  };

  const dropHanlder: DropEventHandlerType = (ev) => {
    let filesInDrop = [] as File[];
    console.log("File(s) dropped");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {
        // If dropped items aren't files, reject them
        if (item.kind === "file") {
          const file = item.getAsFile();
          filesInDrop.push(file as File);
          console.log(`… file[${i}].name = ${file?.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      filesInDrop = [...ev.dataTransfer.files] as File[];
      filesInDrop.forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
    setFiles(filesInDrop);
    nextBtnHandler();
  };

  const dragHandler: DragOverEventHandlerType = (ev) => {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  };
  return (
    <div className="upload-container h-full w-full grow">
      <div
        id="drop_zone"
        className="bg-primary-50 rounded-md w-full h-full flex justify-center items-center"
      >
        <label
          className="w-full h-full text-center flex justify-center items-center hover:underline"
          htmlFor="uploadFilesInput"
          onDrop={dropHanlder}
          onDragOver={dragHandler}
        >
          Darg or Select Files
        </label>
      </div>
      <input
        type="file"
        name="uploadedFiles"
        id="uploadFilesInput"
        className="h-0 w-0 overflow-hidden"
        onChange={fileChangeHandler}
        multiple
      />
    </div>
  );
}
