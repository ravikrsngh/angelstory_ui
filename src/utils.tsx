/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import {
  IconFolderFilled,
  IconMusic,
  IconPhoto,
  IconVideo,
} from "@tabler/icons-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AssetTypes } from "./types";

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

export function getHeaderIcon(type: string) {
  if (type == AssetTypes.FOLDER) {
    return <IconFolderFilled />;
  } else if (type == AssetTypes.IMAGE) {
    return <IconPhoto />;
  } else if (type == AssetTypes.AUDIO) {
    return <IconMusic />;
  } else if (type == AssetTypes.VIDEO) {
    return <IconVideo />;
  }
  return <></>;
}

export type DynamicArrayFilterType = {
  key: string;
  operator: string;
  value: string | number | boolean;
};
export function dynamicFilter(array, conditions) {
  return array.filter((item) => {
    // Check if all conditions are met for the current item
    return conditions.every((condition) => {
      const { key, operator, value } = condition;
      switch (operator) {
        case "===":
          return item[key] === value;
        case "!==":
          return item[key] !== value;
        case ">":
          return item[key] > value;
        case "<":
          return item[key] < value;
        case ">=":
          return item[key] >= value;
        case "<=":
          return item[key] <= value;
        default:
          return false;
      }
    });
  });
}
