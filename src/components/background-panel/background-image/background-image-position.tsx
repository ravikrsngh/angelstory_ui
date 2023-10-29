import {
  IconKeyframeAlignCenter,
  IconBoxAlignTopLeft,
  IconBoxAlignTopRight,
  IconBoxAlignBottomLeft,
  IconBoxAlignBottomRight,
} from "@tabler/icons-react";
import { BackgroundImageOptions } from "./backgroud-image-options";

export default function BackgroundImagePosition({ position, setPosition }) {
  return (
    <div className="bg-image-positions mb-4">
      <h5 className="text-xs text-primary-600 font-medium mb-3">Position</h5>
      <div className="select-position flex gap-2">
        <BackgroundImageOptions
          icon={<IconKeyframeAlignCenter />}
          label="Center"
          value={0}
          isActive={position == 0}
          action={setPosition}
        />
        <BackgroundImageOptions
          icon={<IconBoxAlignTopLeft />}
          label="Top Left"
          value={1}
          isActive={position == 1}
          action={setPosition}
        />
        <BackgroundImageOptions
          icon={<IconBoxAlignTopRight />}
          label="Top Right"
          value={2}
          isActive={position == 2}
          action={setPosition}
        />
        <BackgroundImageOptions
          icon={<IconBoxAlignBottomLeft />}
          label="Bottom Left"
          value={3}
          isActive={position == 3}
          action={setPosition}
        />
        <BackgroundImageOptions
          icon={<IconBoxAlignBottomRight />}
          label="Bottom Right"
          value={4}
          isActive={position == 4}
          action={setPosition}
        />
      </div>
    </div>
  );
}
