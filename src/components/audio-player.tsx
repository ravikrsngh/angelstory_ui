/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBack,
  IconPlayerSkipForward,
} from "@tabler/icons-react";
import Draggable from "react-draggable";
import { CanvasContext } from "../context/canvasContext";
import { CanvasContextType } from "../types";

const AudioPlayer = ({ name, url, startTime, duration, setSelectedMusic }) => {
  const { setSlides, slides, activeSlide } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [newStartTime, setNewStartTime] = useState(startTime);
  const [defaultX, setDefaultX] = useState(x);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(newStartTime);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      const updateTime = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener("timeupdate", updateTime);

      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, []);

  const playPauseHandler = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const backHandler = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime -= 5;
    }
  };

  const forwardHandler = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime += 5;
    }
  };

  const calculateProgress = () => {
    const audio = audioRef.current;
    if (audio) return (currentTime / audio.duration) * 100 || 0;
  };

  const getSelectedWidth = () => {
    const audio = audioRef.current;
    if (audio) return (duration / audio?.duration) * 100 || 0;
  };

  const handleProgressBarClick = (e: React.MouseEvent) => {
    const audio = audioRef.current;
    if (audio) {
      const progressContainer = e.currentTarget as HTMLElement;
      const clickPosition =
        e.clientX - progressContainer.getBoundingClientRect().left;
      const newPosition =
        (clickPosition / progressContainer.offsetWidth) * (audio.duration || 0);
      audio.currentTime = newPosition;
    }
  };

  // @ts-ignore
  const onMusicDragStop = (e, data) => {
    const w2 = data.node.parentNode.offsetWidth;
    console.log(data.x);
    // @ts-ignore
    const duration_to_width = audioRef.current?.duration / w2;
    // @ts-ignore
    setNewStartTime(parseInt(data.x * duration_to_width));
    setDefaultX(data.x);
  };

  const saveMusic = () => {
    const slides_copy = [...slides];
    slides_copy[activeSlide].music = {
      name: name,
      url: url,
      startTime: newStartTime,
      duration: duration,
    };
    setSlides(slides_copy);
    setSelectedMusic(null);
  };

  const handleLoadedData = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadeddata", handleLoadedData);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("loadeddata", handleLoadedData);
      }
    };
  }, []);

  return (
    <div className="audio-player">
      <audio ref={audioRef}>
        <source src={url} type="audio/mp3" />
        Your browser does not support the audio tag.
      </audio>

      {isLoaded ? (
        <>
          <div
            className="progress-bar-container relative h-8 flex items-center"
            id="progress-bar-container"
          >
            <div
              className="progress-bar bg-primary-200 w-full"
              onClick={handleProgressBarClick}
            >
              <div
                className="progress bg-primary-400 h-[4px]"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>

            <Draggable
              defaultPosition={{ x: defaultX, y: 0 }}
              bounds="parent"
              axis="x"
              onStop={onMusicDragStop}
            >
              <div
                className="absolute h-full border-2 border-primary-600 rounded-md z-10 cursor-move"
                style={{
                  width: `${getSelectedWidth()}%`,
                  backgroundColor: "rgba(229,238,249, 0.7)",
                }}
              ></div>
            </Draggable>
          </div>

          <div className="track-duration flex justify-between mt-2 text-xs">
            <span>{`${Math.trunc(Math.floor(currentTime) / 60)}m ${
              Math.floor(currentTime) -
              60 * Math.trunc(Math.floor(currentTime) / 60)
            }s`}</span>
            <span>{`${Math.trunc(
              // @ts-ignore
              Math.floor(audioRef.current?.duration) / 60
            )}m ${
              // @ts-ignore
              Math.floor(audioRef.current?.duration) -
              // @ts-ignore
              60 * Math.trunc(Math.floor(audioRef.current?.duration) / 60)
            }s`}</span>
          </div>

          <div className="track-info mb-2">
            <p className="text-center text-xs">{name}</p>
          </div>

          <div className="controls w-full flex gap-2 justify-center text-primary-400">
            <button onClick={backHandler}>
              <IconPlayerSkipBack />
            </button>
            <button onClick={playPauseHandler}>
              {isPlaying ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
            </button>
            <button onClick={forwardHandler}>
              <IconPlayerSkipForward />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-end gap-x-6">
            <button
              className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
              onClick={() => setSelectedMusic(null)}
            >
              Cancel
            </button>
            <button
              onClick={saveMusic}
              className=" bg-primary-500 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <span>Loading the Music...</span>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
