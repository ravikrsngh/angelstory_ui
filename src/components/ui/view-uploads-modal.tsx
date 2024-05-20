import { IconFile, IconMusic, IconVideo, IconX } from "@tabler/icons-react";
import { FileTypeMap, MemoryTypes, ViewUploadCompPropType } from "../../types";

const ViewUploadCard = ({
  file,
  onDelete,
}: {
  file: File;
  onDelete: () => void;
}) => {
  const ext = file.name.split(".")[1];
  const fType: string = FileTypeMap[ext];
  return (
    <div key={file.name} className="relative">
      <div className="w-16 h-20 overflow-hidden bg-white flex justify-center items-center">
        {fType == MemoryTypes.IMAGE && (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full"
          />
        )}
        {fType == MemoryTypes.AUDIO && <IconMusic />}
        {fType == MemoryTypes.VIDEO && <IconVideo />}
        {fType == MemoryTypes.PDF && <IconFile />}
      </div>
      <span className="w-16 block mt-1 text-xs  overflow-hidden text-ellipsis whitespace-nowrap">
        {file.name}
      </span>
      <div
        className="remove absolute -top-1 -right-1 rounded-full p-1 bg-white hover:bg-primary-50"
        onClick={onDelete}
      >
        <IconX size={12} />
      </div>
    </div>
  );
};

export default function ViewUploadModalContent({
  files,
  setFiles,
  nextBtnHandler,
  backBtnHandler,
  nextBtnLabel,
  backBtnLabel,
}: ViewUploadCompPropType) {
  const deleteFile = (idx: number) => {
    const filesCopy = [...files];
    filesCopy.splice(idx, 1);
    setFiles(filesCopy);
  };
  if (files.length == 0) {
    backBtnHandler();
    return <></>;
  }
  return (
    <>
      <div className="upload-view-container flex gap-4 p-4 bg-slate-100 rounded-sm w-full h-[300px] overflow-auto flex-wrap mt-4">
        {files.map((f: File, idx: number) => (
          <ViewUploadCard file={f} onDelete={() => deleteFile(idx)} />
        ))}
      </div>
      <div className="flex gap-4 text-sm md:text-base justify-end mt-10">
        <button className="px-10 py-3" onClick={backBtnHandler}>
          {backBtnLabel ? backBtnLabel : "Back"}
        </button>
        <button
          className="bg-primary-400 text-white px-4 text-sm md:text-base md:px-10 py-3 rounded-sm"
          onClick={nextBtnHandler}
        >
          {nextBtnLabel ? nextBtnLabel : "Next"}
        </button>
      </div>
    </>
  );
}
