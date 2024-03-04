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
    <>
      <div className="flex overflow-x-auto gap-4 items-center my-8">
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
    </>
  );
}
