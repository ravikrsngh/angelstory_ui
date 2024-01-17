import { cn } from "../../../utils";
import { EditInputBoxType } from "../../../types";

export default function EditInputBox({
  containerClassName,
  icon,
  inputClassName,
  type,
  id,
  defaultValue,
  onChange,
  step,
  min,
  max,
}: EditInputBoxType) {
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
        step={step}
        min={min}
        max={max}
      />
    </div>
  );
}
