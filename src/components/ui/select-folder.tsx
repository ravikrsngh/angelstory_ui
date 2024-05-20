import { IconFolderFilled } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useGetCollectionLevel } from "../../hooks/collection/use-collection-level";
import {
  CollectionLevelResType,
  FolderRowPropType,
  LevelResType,
  SelectFolderPropType,
} from "../../types";
import { cn } from "../../utils";

const FolderRow = ({
  toCollectionId,
  toJourneyId,
  collectionDetails,
  setToCollectionId,
  setToJourneyId,
  showJourney,
}: FolderRowPropType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div>
        <div
          className={cn(
            "w-full h-12 group flex justify-between items-center border-b border-slate-200 hover:bg-primary-50 px-4",
            toCollectionId == collectionDetails.id
              ? "bg-primary-200 hover:bg-primary-200"
              : ""
          )}
        >
          <div className="flex gap-2 items-center text-sm">
            <IconFolderFilled size={20} />
            {collectionDetails.name}
          </div>
          <div className="flex gap-4">
            <button
              className="hidden group-hover:block text-xs font-medium hover:underline underline-offset-2"
              onClick={() => {
                setToCollectionId(collectionDetails.id);
                setToJourneyId(-1);
              }}
            >
              Choose
            </button>
            {showJourney == false ? null : (
              <button
                className="text-xs font-medium hover:underline underline-offset-2"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                {isOpen ? "Close" : "Open"}
              </button>
            )}
          </div>
        </div>
        {isOpen && (showJourney == false ? showJourney : true) ? (
          <div className="">
            {collectionDetails.childList.map((lvl: LevelResType) => (
              <div
                key={lvl.id}
                className={cn(
                  "w-full h-12 group flex justify-between items-center border-b border-slate-200 hover:bg-primary-50 px-4",
                  toJourneyId == lvl.id
                    ? "bg-primary-200 hover:bg-primary-200"
                    : ""
                )}
              >
                <div className="flex gap-2 items-center text-sm pl-4">
                  <IconFolderFilled size={20} />
                  {lvl.name}
                </div>
                <div className="flex gap-4">
                  <button
                    className="hidden group-hover:block text-xs font-medium hover:underline underline-offset-2"
                    onClick={() => {
                      setToCollectionId(collectionDetails.id);
                      setToJourneyId(lvl.id);
                    }}
                  >
                    Choose
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default function SelectFolder({
  toCollectionId,
  toJourneyId,
  setToCollectionId,
  setToJourneyId,
  nextBtnHandler,
  backBtnHandler,
  nextBtnLabel,
  backBtnLabel,
  showJourney,
}: SelectFolderPropType) {
  const { data, isLoading, isFetching, isError } = useGetCollectionLevel();

  const onClickNext = () => {
    if (toCollectionId == -1 && toJourneyId == -1) {
      toast.error("You need to select a collection or journey.");
    } else {
      nextBtnHandler();
    }
  };

  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }

  return (
    <>
      <div className="upload-view-container rounded-sm w-full h-[300px] overflow-auto mt-4">
        {data?.map((level: CollectionLevelResType) => (
          <FolderRow
            key={level.id}
            collectionDetails={level}
            setToCollectionId={setToCollectionId}
            setToJourneyId={setToJourneyId}
            toCollectionId={toCollectionId}
            toJourneyId={toJourneyId}
            showJourney={showJourney}
          />
        ))}
      </div>
      <div className="flex gap-4 justify-end mt-10">
        <button
          className="px-10 py-3 text-sm md:text-base"
          onClick={backBtnHandler}
        >
          {backBtnLabel ? backBtnLabel : "Back"}
        </button>
        <button
          className="bg-primary-400 text-white text-sm md:text-base px-4  md:px-10 py-3 rounded-sm"
          onClick={onClickNext}
        >
          {nextBtnLabel ? nextBtnLabel : "Next"}
        </button>
      </div>
    </>
  );
}
