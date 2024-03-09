/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useState } from "react";
import { MoveCopyModalTemp } from "./all-modals";

export const UploadFlowModalTemp = () => {
  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [stage, setStage] = useState(1);

  const fileChangeHandler = (e) => {
    const selectedFiles = Array.from(e.target.files) as File[];
    setAllFiles(selectedFiles);
  };

  const dropHanlder = (ev) => {
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
          console.log(`… file[${i}].name = ${file.name}`);
        }
      });
    } else {
      // Use DataTransfer interface to access the file(s)
      filesInDrop = [...ev.dataTransfer.files] as File[];
      filesInDrop.forEach((file, i) => {
        console.log(`… file[${i}].name = ${file.name}`);
      });
    }
    setAllFiles(filesInDrop);
  };

  const dragHandler = (ev) => {
    console.log("File(s) in drop zone");

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  };

  return (
    <div>
      {stage == 1 ? (
        <>
          {allFiles.length > 0 ? (
            <>
              <div className="upload-view-container flex gap-4 p-4 bg-slate-100 rounded-sm w-full min-h-[300px] mt-4">
                {allFiles.map((f: File) => {
                  const objectURL = URL.createObjectURL(f);
                  return (
                    <div key={f.name} className="w-16 h-16 bg-white">
                      <img src={objectURL} alt={f.name} className="w-full" />
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-4 justify-end mt-10">
                <button
                  className="bg-primary-400 text-white px-10 py-3 rounded-sm"
                  onClick={() => setStage(2)}
                >
                  Upload
                </button>
              </div>
            </>
          ) : (
            <div className="upload-container">
              <input
                type="file"
                name="uploadedFiles"
                id="uploadFilesInput"
                className="h-0 w-0 overflow-hidden"
                onChange={fileChangeHandler}
                multiple
              />
              <div
                id="drop_zone"
                className="bg-slate-100 rounded-sm w-full min-h-[300px] flex justify-center items-center mt-4"
              >
                <label
                  className="w-full h-full text-center block"
                  htmlFor="uploadFilesInput"
                  onDrop={dropHanlder}
                  onDragOver={dragHandler}
                >
                  Darg or Select Files
                </label>
              </div>
            </div>
          )}
        </>
      ) : null}
      {stage == 2 ? (
        <>
          <MoveCopyModalTemp
            initalStage={1}
            stageList={[
              {
                id: 1,
                name: "collection",
                query: "collection",
              },
              {
                id: 2,
                name: "journey",
                query: "journey",
              },
              {
                id: 3,
                name: "inside-journey",
              },
            ]}
            actionLabel={"Upload here"}
            action={"upload"}
          />
        </>
      ) : null}
    </div>
  );
};
