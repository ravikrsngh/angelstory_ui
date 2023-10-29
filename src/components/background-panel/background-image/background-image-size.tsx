import { IconArrowsMaximize, IconAspectRatio } from "@tabler/icons-react";
import { BackgroundImageOptions } from "./backgroud-image-options";

export default function BackgroundImageSize({ size, setSize }) {
  return (
    <div className="bg-image-positions">
      <h5 className="text-xs text-primary-600 font-medium mb-3">Size</h5>
      <div className="select-position flex gap-2">
        <BackgroundImageOptions
          icon={<IconAspectRatio />}
          label="Cover"
          value={0}
          isActive={size == 0}
          action={setSize}
        />
        <BackgroundImageOptions
          icon={<IconArrowsMaximize />}
          label="Stretch"
          value={1}
          isActive={size == 1}
          action={setSize}
        />
      </div>
    </div>
  );
}
