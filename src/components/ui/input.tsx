import { cn } from "../../utils";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

type InputProps = {
  label: string;
  error?: string;
  labelClassname?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, error, labelClassname, ...rest }, ref) => {
    return (
      <div>
        <label
          className={cn(
            "mb-2 block text-sm font-medium text-black/90",
            labelClassname ? labelClassname : ""
          )}
          htmlFor={label}
        >
          {label}
        </label>
        <input
          ref={ref}
          id={label}
          className={cn(
            "w-full border-[0.4px] border-slate-400 bg-white px-4 py-3 text-xs focus:outline-none",
            className
          )}
          {...rest}
        />
        {error && <span className="text-xs text-accent-400">{error}</span>}
      </div>
    );
  }
);
