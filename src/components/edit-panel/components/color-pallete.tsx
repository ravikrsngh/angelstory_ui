import { IconX } from "@tabler/icons-react";
import { Sketch } from "@uiw/react-color";
import React from "react";

export default function ColorPallete({ color, onChange, displayColorPallete }) {
  return (
    <div className="flex gap-2 items-start mt-4">
      <Sketch
        style={{
          width: "100%",
          boxShadow: "none",
          border: "1px solid rgba(0,0,0,0.15)",
        }}
        color={color}
        onChange={(c) => {
          onChange(c.hex);
        }}
      />
      <button
        onClick={() => displayColorPallete(false)}
        className="text-slate-500 hover:text-slate-800"
      >
        <IconX />
      </button>
    </div>
  );
}
