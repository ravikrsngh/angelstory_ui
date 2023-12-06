import { useContext, useEffect } from "react";
import { CanvasContext } from "../../context/canvasContext";
import { useGetAllTemplate } from "../../hooks/templates/use-get-all-templates";
import { CanvasContextType, TemplateType } from "../../types";
import { useGetTemplateDetails } from "../../hooks/templates/use-get-template-details";

const TemplateCard = ({details}) => {

  const { fabricRef, setSlides, setActiveSlide } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );

  const {data, refetch} = useGetTemplateDetails(details.id)

  useEffect(() => {
    if (data) {
      fabricRef.current?.loadFromJSON(
        JSON.parse(data.formattedData)[0].content,
        () => {}
      );
      fabricRef.current?.renderAll();
      setSlides(JSON.parse(data.formattedData));
      setActiveSlide(0);
    }
  },[data])

  return (
    <>
    <div
          className="flex justify-center items-center"
              onClick={() => refetch()}>
            <img src={details.previewImage} />
          </div>
    </>
  )
}

export const TemplatePanel = () => {
  const { data, isLoading, isFetching, isError } = useGetAllTemplate();

  console.log(data);

  if (isLoading || isFetching) {
    return (
      <div className="p-5">
        <h4 className="hidden lg:block text-base text-primary-700 font-medium">Templates</h4>
        <div>
          <span>Loading ...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-5">
        <h4 className="hidden lg:block text-base text-primary-700 font-medium">Templates</h4>
        <div>
          <span>Something went wrong!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h4 className="hidden lg:block text-base text-primary-700 font-medium">Templates</h4>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data?.map((template) => <TemplateCard key={template.id} details={template} />)}
      </div>
    </div>
  );
};
