/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dataURLtoBlob(dataUrl) {
  const base64Data = dataUrl.split(",")[1];
  const binaryData = atob(base64Data);

  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  return new Blob([uint8Array], { type: "image/png" });
}

function padWithZero(value) {
  return value < 10 ? "0" + value : value;
}

export function secondsToHHMMSS(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = [
    padWithZero(hours),
    padWithZero(minutes),
    padWithZero(remainingSeconds),
  ].join(":");

  return formattedTime;
}
