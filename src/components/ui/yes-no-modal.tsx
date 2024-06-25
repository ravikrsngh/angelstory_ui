import { Dispatch, SetStateAction } from "react";
import { Modal } from "./modal";

type YesNoModalPropType = {
  modalDisplay: boolean;
  setModalDisplay: Dispatch<SetStateAction<boolean>>;
  yesLabel?: string;
  noLabel?: string;
  yesCallback: () => void;
  noCallback: () => void;
  description: string;
};

export const YesNoModal = ({
  modalDisplay,
  setModalDisplay,
  yesCallback,
  yesLabel,
  noCallback,
  noLabel,
  description,
}: YesNoModalPropType) => {
  return (
    <Modal
      headerLabel=""
      openModal={modalDisplay}
      setOpenModal={setModalDisplay}
    >
      <div>
        <div className="yes-no-modal">
          <span className="block mt-4">{description}</span>
          <div className="flex gap-4 justify-end mt-10">
            <button
              className=" text-slate-600 px-10 py-3 rounded-sm"
              onClick={() => {
                setModalDisplay(false);
                noCallback();
              }}
            >
              {noLabel ? noLabel : "No"}
            </button>
            <button
              className="bg-primary-400 text-white px-10 py-3 rounded-sm"
              onClick={yesCallback}
            >
              {yesLabel ? yesLabel : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
