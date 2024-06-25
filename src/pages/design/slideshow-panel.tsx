/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { IconEdit, IconPlayerPlay, IconTrash } from "@tabler/icons-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import AudioPlayer from "../../components/audio-player";
import MusicModal from "../../components/editor/music/music-modal";
import { Loader } from "../../components/ui/loaders";
import { CanvasContext } from "../../context/canvasContext";
import { uploadRandomFiles } from "../../service/aws";
import {
  CanvasContextType,
  MusicElementType,
  SlideCardType,
  SlideMusic,
} from "../../types";
import { cn, dataURLtoBlob, secondsToHHMMSS } from "../../utils";

const Slide = ({
  isActive,
  slideNumber,
  slide,
  setSelectedMusic,
}: SlideCardType) => {
  const { fabricRef, setActiveSlide, setSlides, slides } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const onClickSlide = () => {
    setActiveSlide(slideNumber);
    setSelectedMusic(null);
    if (slide.content) {
      fabricRef.current?.loadFromJSON(slide.content, () => {});
      fabricRef.current?.renderAll();
    } else {
      fabricRef.current?.clear();
      fabricRef?.current?.setBackgroundColor(
        "#FFF",
        fabricRef?.current?.renderAll.bind(fabricRef?.current)
      );
    }
  };

  // const onSelectMusic = (event: React.ChangeEvent) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     // const objectUrl = URL.createObjectURL(file);
  //     setSelectedMusic({
  //       name: file.name,
  //       url: "https://www.computerhope.com/jargon/m/example.mp3",
  //       startTime: 0,
  //       duration: 0,
  //     });
  //   }
  // };

  const changeDuration = (e, index) => {
    console.log(e.target.value, index);
    const slides_copy = [...slides];
    slides_copy[index].duration = parseInt(e.target.value);
    setSlides(slides_copy);
  };

  // const getMusicDetails = () => {
  //   console.log(slides[slideNumber]);
  //   setSelectedMusic({
  //     name: slides[slideNumber].music?.name || "",
  //     url: slides[slideNumber].music?.url || "",
  //     duration: slides[slideNumber].music?.duration || 0,
  //     startTime: slides[slideNumber].music?.startTime || 0,
  //     x: slides[slideNumber].music?.x || 0,
  //   });
  // };

  return (
    <div>
      <div
        className={cn(
          "h-14 w-14 rounded-md overflow-hidden relative border border-slate-200 flex justify-center items-center",
          isActive && "border-2 border-primary-600"
        )}
        onClick={onClickSlide}
      >
        <img
          src={slide.previewImg}
          className="w-full border border-slate-200"
        />
        <div className="absolute bottom-1 left-1 flex">
          <input
            type="text"
            className=" w-3 text-xs bg-transparent outline-none"
            defaultValue={slide.duration}
            onChange={(e) => changeDuration(e, slideNumber)}
          />
          <span className="-ml-1 text-xs">s</span>
        </div>
      </div>
      {/* {isActive && (
        <div className="">
          {slides[slideNumber].music ? (
            <button
              onClick={getMusicDetails}
              className="text-center text-xs mt-2 inline-block bg-primary-400 text-white w-full py-1"
            >
              Edit Music
            </button>
          ) : (
            <>
              <input
                type="file"
                name="file"
                id="music-upload-file"
                className="w-0 h-0 overflow-hidden"
                onChange={onSelectMusic}
              />
              <label
                htmlFor="music-upload-file"
                className="text-center text-xs mt-2 inline-block bg-primary-400 text-white w-full py-1"
              >
                Add Music
              </label>
            </>
          )}
        </div>
      )} */}
    </div>
  );
};

export default function SlideshowPane({
  saveProject,
  musicArr,
  setMusicArr,
}: {
  saveProject: (
    obj: {
      formattedData?: string | undefined;
      name?: string | undefined;
      previewImage?: string | undefined;
    },
    time: number
  ) => void;
  musicArr: MusicElementType[] | null;
  setMusicArr: React.Dispatch<SetStateAction<MusicElementType>>;
}) {
  const { fabricRef, slides, setSlides, activeSlide } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );

  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [musicModalOpen, setMusicModalOpen] = useState<boolean>(false);
  const ffmpegRef = useRef(new FFmpeg());

  const [selectedMusic, setSelectedMusic] = useState<SlideMusic | null>(null);
  const [editMusicData, setEditMusicData] = useState<MusicElementType | null>(
    null
  );
  const [isPageLoading, setIsPageLoading] = useState(false);

  const addSlide = () => {
    setSlides([
      ...slides,
      { content: "", duration: 2, previewImg: "", history: [] },
    ]);
  };

  const getTotalDuration = () => {
    let t = 0;
    for (let i = 0; i < slides.length; i++) {
      t += slides[i].duration || 0;
    }
    return <>{t}</>;
  };

  const createEachSlideVideo = async (slide: SlideType, idx: number) => {
    const virtualCanvas = new fabric.Canvas("");
    const vw = fabricRef.current.getWidth() / fabricRef.current.getZoom();
    const vh = fabricRef.current.getHeight() / fabricRef.current.getZoom();
    virtualCanvas.setDimensions({
      //@ts-ignore
      width: vw,
      //@ts-ignore
      height: vh,
    });
    return new Promise((resolve) => {
      virtualCanvas.loadFromJSON(slide.content, async () => {
        console.log("Loading new slide");
        const imgBlob = dataURLtoBlob(
          virtualCanvas.toDataURL({ format: "png" })
        );
        await ffmpegRef.current.writeFile(
          `image${idx}.png`,
          await fetchFile(imgBlob)
        );
        console.log("Loaded Image");
        await ffmpegRef.current.exec([
          "-framerate",
          "30",
          "-loop",
          "1",
          "-i",
          `image${idx}.png`,
          "-c:v",
          "libx264",
          "-t",
          `${slide.duration}`,
          "-pix_fmt",
          "yuv420p",
          "-vf",
          `scale=${vw}:${vh}`,
          `test${idx}.mp4`,
        ]);
        console.log("Video Made", `test${idx}.mp4`);
        resolve();
      });
    });
  };

  // const createPreview = async () => {
  //   setLoading(true);
  //   const fileList = [];
  //   for (let i = 0; i < slides.length; i++) {
  //     await createEachSlideVideo(slides[i], i);
  //     fileList.push(`file test${i}.mp4`);
  //   }
  //   console.log(fileList);
  //   await ffmpegRef.current.writeFile(
  //     "fileList.txt",
  //     new TextEncoder().encode(fileList.join("\n"))
  //   );
  //   console.log("Started Merging");
  //   await ffmpegRef.current.exec([
  //     "-f",
  //     "concat",
  //     "-safe",
  //     "0",
  //     "-i",
  //     "fileList.txt",
  //     "-c",
  //     "copy",
  //     "output.mp4",
  //   ]);
  //   console.log("Merging Complete");
  //   const createdVideo = await ffmpegRef.current.readFile("output.mp4");
  //   setVideoURL(URL.createObjectURL(new Blob([createdVideo.buffer])));
  //   setLoading(false);
  // };

  console.log(musicArr);

  const createPreview2 = async () => {
    setIsPageLoading(true);
    try {
      //Hnadle Music
      console.log(musicArr);
      const musicFileList = [];
      for (let i = 0; i < musicArr.length; i++) {
        const music = musicArr[i];
        // Add music to FFMPEG FileSystem
        await ffmpegRef.current.writeFile(
          `music${i}.mp3`,
          await fetchFile(music.url)
        );
        console.log("Loaded Music");
        // Take input of the music and change the start time.
        await ffmpegRef.current.exec([
          "-i",
          `music${i}.mp3`,
          "-ss",
          secondsToHHMMSS(music.startFrom),
          "-t",
          secondsToHHMMSS(music.duration),
          "-acodec",
          "copy",
          `new_music${i}.mp3`,
        ]);
        console.log("Music cropped");
        musicFileList.push(`file new_music${i}.mp3`);
      }
      //Concat all the music
      await ffmpegRef.current.writeFile(
        "musicFileList.txt",
        new TextEncoder().encode(musicFileList.join("\n"))
      );
      await ffmpegRef.current.exec([
        "-f",
        "concat",
        "-i",
        "musicFileList.txt",
        "-c",
        "copy",
        "final_music.mp3",
      ]);
      console.log("Music Merge complete");

      //Handle Video
      const videoFileList = [];
      for (let i = 0; i < slides.length; i++) {
        await createEachSlideVideo(slides[i], i);
        videoFileList.push(`file test${i}.mp4`);
      }
      console.log(videoFileList);
      await ffmpegRef.current.writeFile(
        "videoFileList.txt",
        new TextEncoder().encode(videoFileList.join("\n"))
      );
      await ffmpegRef.current.exec([
        "-f",
        "concat",
        "-safe",
        "0",
        "-i",
        "videoFileList.txt",
        "-c",
        "copy",
        "final_video.mp4",
      ]);

      //Merge audio and video
      await ffmpegRef.current.exec([
        "-i",
        "final_video.mp4",
        "-i",
        "final_music.mp3",
        "-c:v",
        "copy",
        "-c:a",
        "aac",
        "-strict",
        "experimental",
        "output.mp4",
      ]);
      const createdVideo = await ffmpegRef.current.readFile("output.mp4");
      console.log(createdVideo);
      const videoURL = URL.createObjectURL(new Blob([createdVideo.buffer]));
      const urlLists = await uploadRandomFiles([
        {
          file: createdVideo.buffer,
          name: `${new Date().toISOString()}-preview.mp4`,
        },
      ]);

      setVideoURL(videoURL);
      saveProject({ previewImage: urlLists[0].url }, 0);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
      setIsPageLoading(false);
    }
    setIsPageLoading(false);
  };

  const loadFFMPEG = async () => {
    console.log("Loading FFMPEG");
    setLoading(true);
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm";
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoading(false);
    console.log("Loaded FFMPEG");
  };

  const editThisMusic = (music: MusicElementType) => {
    setEditMusicData(music);
    setMusicModalOpen(true);
  };

  const deleteMusic = (id: number) => {
    const musicArrCopy = musicArr?.filter((music) => music.id != id);
    setMusicArr(musicArrCopy);
  };

  useEffect(() => {
    loadFFMPEG();
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (videoURL) {
    return (
      <div className="fixed top-0 left-0 w-full h-full p-4 md:p-10 lg:p-16 z-50 bg-black/75 flex flex-col justify-center items-center">
        <video className="w-full max-w-xl" src={videoURL} controls></video>
        <button
          className="text-center text-sm mt-10 inline-block bg-primary-400 text-white py-2 px-5 w-fit"
          onClick={() => setVideoURL(null)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className=" bg-white w-full p-5">
      <div className="slide_section flex gap-4">
        <div className="flex flex-col items-center gap-2">
          <button
            className="h-14 w-14 rounded-full text-primary-700 hover:text-white bg-primary-50 hover:bg-primary-500 flex justify-center items-center"
            onClick={createPreview2}
          >
            <IconPlayerPlay />
          </button>
          <span className="text-xs">Total - {getTotalDuration()}s</span>
          <button
            className="text-center text-xs mt-2 inline-block bg-primary-400 text-white w-full py-1"
            onClick={() => {
              setEditMusicData(null);
              setMusicModalOpen(true);
            }}
          >
            Add Music
          </button>
          {musicModalOpen && (
            <MusicModal
              musicModalOpen={musicModalOpen}
              setMusicModalOpen={setMusicModalOpen}
              defaultData={editMusicData}
              setMusicArr={setMusicArr}
              musicArr={musicArr}
            />
          )}
        </div>
        <div>
          <div className="flex gap-4">
            {slides.map((slide, index) => (
              <Slide
                key={index}
                isActive={activeSlide == index}
                slideNumber={index}
                slide={slide}
                setSelectedMusic={setSelectedMusic}
              />
            ))}
            <div
              className={cn(
                "h-14 w-14 flex justify-center items-center bg-primary-100 rounded-md"
              )}
              onClick={addSlide}
            >
              +
            </div>
          </div>
          <div className="music-container mt-2 relative">
            {musicArr?.map((music: MusicElementType) => (
              <div
                key={music.id}
                className={cn(
                  "h-8 bg-slate-300 flex gap-1 justify-end items-center rounded-md p-2 absolute"
                )}
                style={{
                  left: `${(music.slideFrom - 1) * 72}px`,
                  width: `${
                    (music.slideTo - music.slideFrom + 1) * 56 +
                    (music.slideTo - music.slideFrom) * 16
                  }px`,
                }}
              >
                <span className="text-xs whitespace-nowrap overflow-hidden">
                  {music.name}
                </span>
                <button onClick={() => editThisMusic(music)}>
                  <IconEdit size={14} />
                </button>
                <button onClick={() => deleteMusic(music.id)}>
                  <IconTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-4">
        {selectedMusic && (
          <AudioPlayer
            name={selectedMusic.name}
            url={selectedMusic.url}
            startTime={selectedMusic.startTime}
            duration={slides[activeSlide].duration || 0}
            setSelectedMusic={setSelectedMusic}
          />
        )}
      </div>
      <Loader
        isLoading={isPageLoading}
        position={"fixed"}
        label="Preparing the preview..."
      />
    </div>
  );
}
