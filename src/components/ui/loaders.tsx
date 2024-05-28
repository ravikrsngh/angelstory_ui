import { cn } from "../../utils";

type CardDefaultLoaderType = {
  number: number;
  wrap: boolean;
};
export const CardDefaultLoader = ({ number, wrap }: CardDefaultLoaderType) => {
  const elements = new Array(number).fill(null);
  return (
    <div className={cn("flex gap-4", wrap ? "flex-wrap" : "overflow-hidden")}>
      {elements.map(() => (
        <div className="min-w-[249px] h-[258px] bg-primary-100 card-loader"></div>
      ))}
    </div>
  );
};

export const GeneralPageSkeleton = () => {
  return (
    <div className="px-4 md:px-10 lg:px-16 py-8 flex flex-col gap-8">
      <div className="relative rounded-md p-4 pt-20 pb-5 md:p-10 md:pt-[140px] lg:pt-[200px] text-primary-950 bg-center bg-cover bg-primary-300 card-loader"></div>
      <CardDefaultLoader wrap={false} number={8} />
      <CardDefaultLoader wrap={false} number={8} />
      <CardDefaultLoader wrap={false} number={8} />
      <CardDefaultLoader wrap={false} number={8} />
      <CardDefaultLoader wrap={false} number={8} />
      <CardDefaultLoader wrap={false} number={8} />
      <CardDefaultLoader wrap={false} number={8} />
    </div>
  );
};
