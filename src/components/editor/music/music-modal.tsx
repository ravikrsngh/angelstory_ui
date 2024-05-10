import { Dialog, Transition } from "@headlessui/react";
import Cookies from "js-cookie";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { CanvasContext } from "../../../context/canvasContext";
import { useCreateAssets } from "../../../hooks/assets/use-create-assets";
import { uploadFileToS3 } from "../../../service/aws";
import {
  CanvasContextType,
  MusicElementType,
  MusicModalPropType,
} from "../../../types";
import EditInputBox from "../../edit-panel/components/edit-inputbox";

export default function MusicModal({
  musicModalOpen,
  setMusicModalOpen,
  defaultData,
  setMusicArr,
  musicArr,
}: MusicModalPropType) {
  const { slides } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const auidoRef = useRef<HTMLAudioElement | null>(null);

  const [slideFrom, setSlideFrom] = useState<number>(
    defaultData ? defaultData.slideFrom : 1
  );
  const [slideTo, setSlideTo] = useState<number>(
    defaultData ? defaultData.slideTo : slideFrom
  );
  const [startFrom, setStartFrom] = useState<number>(
    defaultData ? defaultData.startFrom : 1
  );

  const createAssetHook = useCreateAssets();

  const params = useParams();

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
    if (slideFrom > slideTo) {
      toast.error("Slide To should be greater than Slide From");
      return false;
    }
    if (slideFrom <= 0 || slideTo <= 0) {
      toast.error("Slide numbers cannot be negative or zero");
      return false;
    }
    for (const music of musicArr) {
      if (music.id != defaultData?.id) {
        const slideNumbers = Array.from(
          { length: music.slideTo - music.slideFrom + 1 },
          (_, index) => music.slideFrom + index
        );
        console.log(slideNumbers);
        if (
          slideNumbers.includes(slideTo) ||
          slideNumbers.includes(slideFrom)
        ) {
          toast.error("Music are getting overlapped.");
          return false;
        }
      }
    }
    return true;
  };

  const calculateDurationOfMusic = () => {
    let t = 0;
    for (let i = slideFrom - 1; i < slideTo; i++) {
      t += slides[i].duration;
    }
    return t;
  };

  const uploadMusicToS3 = async () => {
    if (params.projectId && params.collectionId && params.journeyId) {
      await uploadFileToS3(
        audioFile,
        `${import.meta.env.VITE_AWS_STORAGE_BUCKET_NAME}`,
        `users/${Cookies.get("user")}/project/audio/${audioFile?.name.replace(
          " ",
          "_"
        )}`
      );
      const assetUrl = `https://${
        import.meta.env.VITE_AWS_STORAGE_BUCKET_NAME
      }.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/users/${Cookies.get(
        "user"
      )}/project/audio/${audioFile?.name.replace(" ", "_")}`;
      await createAssetHook.mutate({
        assetType: "AUDIO",
        assetUrl: assetUrl,
        projectId: parseInt(params.projectId),
        journeyId: parseInt(params.journeyId),
        collectionId: parseInt(params.collectionId),
      });
      return assetUrl;
    }
  };

  const addThisMusic = async () => {
    if (validateMusic()) {
      const assetURL = await uploadMusicToS3();
      const t = calculateDurationOfMusic();
      if (assetURL) {
        setMusicArr((prev: MusicElementType[] | null) => {
          let arr = prev;
          if (arr) {
            if (defaultData) {
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == defaultData.id) {
                  arr[i].slideFrom = slideFrom;
                  arr[i].slideTo = slideTo;
                  arr[i].startFrom = startFrom;
                  arr[i].duration = t;
                }
              }
            } else {
              arr.push({
                id: Math.floor(Math.random() * 10000) + 1,
                name: audioFile ? audioFile.name : "",
                url: assetURL,
                slideFrom: slideFrom,
                slideTo: slideTo,
                startFrom: startFrom,
                duration: t,
              });
            }
          } else {
            arr = [];
            arr.push({
              id: Math.floor(Math.random() * 10000) + 1,
              name: audioFile ? audioFile.name : "",
              url: assetURL,
              slideFrom: slideFrom,
              slideTo: slideTo,
              startFrom: startFrom,
              duration: t,
            });
          }
          return arr;
        });
        closeModal();
      }
    }
  };

  console.log(slideTo);

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
                          defaultValue={slideFrom}
                          onChange={(e) => {
                            setSlideFrom(parseInt(e.target.value));
                            setSlideTo(parseInt(e.target.value));
                          }}
                          min={1}
                          max={slides.length}
                        />
                        <EditInputBox
                          icon={<label className="text-sm"> Slide To</label>}
                          containerClassName="w-full flex flex-col items-start border-none"
                          inputClassName="border border-slate-200 py-2"
                          type="number"
                          id="slideTo"
                          defaultValue={slideTo}
                          onChange={(e) => setSlideTo(parseInt(e.target.value))}
                          min={slideFrom}
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
