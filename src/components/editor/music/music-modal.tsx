import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import {
  CanvasContextType,
  MusicElementType,
  MusicModalPropType,
} from "../../../types";
import EditInputBox from "../../edit-panel/components/edit-inputbox";
import toast from "react-hot-toast";
import { CanvasContext } from "../../../context/canvasContext";

export default function MusicModal({
  musicModalOpen,
  setMusicModalOpen,
  defaultData,
  setMusicArr,
}: MusicModalPropType) {
  const { slides } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const auidoRef = useRef<HTMLAudioElement | null>(null);

  const [sldieFrom, setSlideFrom] = useState<number>(
    defaultData ? defaultData.slideFrom : 1
  );
  const [sldieTo, setSlideTo] = useState<number>(
    defaultData ? defaultData.slideTo : 1
  );
  const [startFrom, setStartFrom] = useState<number>(
    defaultData ? defaultData.startFrom : 1
  );

  console.log(startFrom);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    setAudioFile(files ? files[0] : null);
  };

  function closeModal() {
    setAudioFile(null);
    setSlideFrom(0);
    setSlideTo(0);
    setStartFrom(0);
    setMusicModalOpen(false);
  }

  const validateMusic = () => {
    if (sldieFrom > sldieTo) {
      toast.error("Slide To should be greater than Slide From");
      return;
    }
    if (sldieFrom <= 0 || sldieTo <= 0) {
      toast.error("Slide numbers cannot be negative or zero");
      return;
    }
  };

  const calculateDurationOfMusic = () => {
    let t = 0;
    for (let i = sldieFrom - 1; i < sldieTo; i++) {
      t += slides[i].duration;
    }
    return t;
  };

  const addThisMusic = () => {
    validateMusic();
    const t = calculateDurationOfMusic();
    setMusicArr((prev: MusicElementType[] | null) => {
      let arr = prev;
      if (arr) {
        if (defaultData) {
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].id == defaultData.id) {
              arr[i].name = audioFile ? audioFile.name : "";
              arr[i].slideFrom = sldieFrom;
              arr[i].slideTo = sldieTo;
              arr[i].startFrom = startFrom;
              arr[i].duration = t;
            }
          }
        } else {
          arr.push({
            id: Math.floor(Math.random() * 10000) + 1,
            name: audioFile ? audioFile.name : "",
            url: audioFile ? URL.createObjectURL(audioFile) : "",
            slideFrom: sldieFrom,
            slideTo: sldieTo,
            startFrom: startFrom,
            duration: t,
          });
        }
      } else {
        arr = [];
        arr.push({
          id: Math.floor(Math.random() * 10000) + 1,
          name: audioFile ? audioFile.name : "",
          url: audioFile ? URL.createObjectURL(audioFile) : "",
          slideFrom: sldieFrom,
          slideTo: sldieTo,
          startFrom: startFrom,
          duration: t,
        });
      }
      return arr;
    });
    closeModal();
  };

  useEffect(() => {
    console.log("Reload");
    if (auidoRef.current) {
      auidoRef.current.currentTime = startFrom;
    }
  }, [audioFile, startFrom]);

  return (
    <>
      <Transition appear show={musicModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="py-10 px-5 w-full max-w-xl transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="flex justify-between items-center"
                  >
                    <h3 className="text-xl font-medium leading-6 text-gray-900">
                      Add Music
                    </h3>
                  </Dialog.Title>
                  {!defaultData && (
                    <form className="mt-4">
                      <input
                        type="file"
                        accept="audio/*"
                        name="audioFile"
                        onChange={handleFileSelect}
                      />
                    </form>
                  )}
                  {audioFile || defaultData ? (
                    <div>
                      <div className="mt-4 flex gap-4">
                        <audio
                          ref={auidoRef}
                          controls
                          src={
                            audioFile
                              ? URL.createObjectURL(audioFile)
                              : defaultData?.url
                          }
                          className="w-full grow"
                        ></audio>
                        <button
                          onClick={() =>
                            setStartFrom(auidoRef.current?.currentTime || 0)
                          }
                          className="p-2 bg-primary-300 text-sm whitespace-nowrap rounded-md"
                        >
                          Start Here
                        </button>
                      </div>
                      <div className="flex mt-4 gap-20">
                        <EditInputBox
                          icon={<label className="text-sm"> Slide From</label>}
                          containerClassName="w-full flex flex-col items-start border-none"
                          inputClassName="border border-slate-200 py-2"
                          type="number"
                          id="slideFrom"
                          defaultValue={sldieFrom}
                          onChange={(e) =>
                            setSlideFrom(parseInt(e.target.value))
                          }
                          min={1}
                          max={slides.length}
                        />
                        <EditInputBox
                          icon={<label className="text-sm"> Slide To</label>}
                          containerClassName="w-full flex flex-col items-start border-none"
                          inputClassName="border border-slate-200 py-2"
                          type="number"
                          id="slideTo"
                          defaultValue={sldieTo}
                          onChange={(e) => setSlideTo(parseInt(e.target.value))}
                          min={1}
                          max={slides.length}
                        />
                        <EditInputBox
                          icon={<label className="text-sm">Music Start</label>}
                          containerClassName="w-full flex flex-col items-start border-none"
                          inputClassName="border border-slate-200 py-2"
                          type="number"
                          id="Music Start"
                          defaultValue={startFrom}
                          onChange={(e) =>
                            setStartFrom(parseInt(e.target.value))
                          }
                        />
                      </div>
                      <div className="flex justify-end mt-8">
                        <button
                          className="py-3 w-full px-4 text-sm bg-primary-400 text-white"
                          onClick={addThisMusic}
                        >
                          Add this Music
                        </button>
                      </div>
                    </div>
                  ) : null}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
