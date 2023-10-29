import React from "react";
import { cn } from "../../../utils";

export default function EditInputBox({
  containerClassName,
  icon,
  inputClassName,
  type,
  id,
  defaultValue,
  onChange,
}) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center border border-slate-200 pl-2 w-20",
        containerClassName
      )}
    >
      {icon}
      <input
        className={cn("pl-2 outline-none w-full", inputClassName)}
        type={type}
        id={id}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
}
