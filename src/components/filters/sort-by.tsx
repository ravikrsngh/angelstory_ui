import { IconArrowNarrowUp } from "@tabler/icons-react";
import { ChangeEvent, useEffect, useState } from "react";
import { cn } from "../../utils";

type SortByFilterType = {
  defaultValue: string;
  onChange: (value: string) => void;
  options: {
    name: string;
    value: string;
  }[];
};

export const SortByFilter = ({
  defaultValue,
  onChange,
  options,
}: SortByFilterType) => {
  console.log(defaultValue);
  const [ascending, setAscending] = useState<boolean>(
    defaultValue.includes("-") ? false : true
  );
  const sortByChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e);
    let val = e.target.value as string;
    if (!ascending) {
      val = "-" + val;
    }
    onChange(val);
  };

  const changeOrdering = () => {
    setAscending((prev) => !prev);
  };

  useEffect(() => {
    let val = defaultValue;
    if (!ascending) {
      if (!defaultValue.includes("-")) {
        val = "-" + val;
      }
    } else {
      if (val.includes("-")) {
        val = val.slice(1);
      }
    }
    onChange(val);
  }, [ascending]);

  return (
    <div className="ml-auto flex justify-center items-center">
      <button
        className={cn("transition", !ascending ? "transform rotate-180" : "")}
        onClick={changeOrdering}
      >
        <IconArrowNarrowUp />
      </button>
      <select
        className="outline-none bg-transparent"
        name="sortBy"
        id="sortBy"
        value={ascending ? defaultValue : defaultValue.slice(1)}
        onChange={sortByChanged}
      >
        {options.map((opt) => (
          <option value={opt.value}>{opt.name}</option>
        ))}
      </select>
    </div>
  );
};
