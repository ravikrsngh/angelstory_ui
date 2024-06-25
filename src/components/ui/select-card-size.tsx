import { useGetAllSizes } from "../../hooks/collection/use-get-size";
import { SelectCardSizePropType, SizeResType } from "../../types";

export default function SelectCardSize({
  setProjectDimension,
  nextBtnHandler,
}: SelectCardSizePropType) {
  const { data, isLoading, isFetching, isError } = useGetAllSizes();
  if (isLoading || isFetching) {
    return <span>Loading ...</span>;
  }

  if (isError) {
    return <span>Some error occurred while fetching data ...</span>;
  }
  return (
    <div>
      <div className="flex overflow-x-auto gap-4 items-center my-4">
        {data?.map((size: SizeResType) => (
          <div
            key={size.id}
            style={{ aspectRatio: `${size.width / size.height}` }}
            className="p-4 h-40 bg-primary-100 rounded-sm flex justify-center items-center hover:shadow-md hover:cursor-pointer"
            onClick={async () => {
              await setProjectDimension({
                width: size.width,
                height: size.height,
              });
              nextBtnHandler();
            }}
          >
            {" "}
            <span className="text-sm text-center">{size.label}</span>{" "}
          </div>
        ))}
      </div>
      <div>
        <p className="text-center text-xs">OR</p>
      </div>
      <form className="mt-4">
        <p className="text-center mb-4">Custom size?</p>
        <div className="flex gap-4 justify-center items-center">
          <input
            type="text"
            name=""
            id=""
            maxLength={4}
            placeholder="Width (px)"
            className="w-32 border border-slate-300 p-2 text-sm"
          />
          <span>X</span>
          <input
            type="text"
            name=""
            id=""
            maxLength={4}
            placeholder="Height (px)"
            className="w-32 border border-slate-300 p-2 text-sm"
          />
          <button className="bg-primary-400 text-white text-xs md:text-base p-2 px-4 rounded-sm">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
