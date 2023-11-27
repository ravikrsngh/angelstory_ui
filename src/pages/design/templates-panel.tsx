import { useContext } from "react";
import { CanvasContext } from "../../context/canvasContext";
import { useGetAllTemplate } from "../../hooks/templates/use-get-all-templates";
import { CanvasContextType, TemplateType } from "../../types";

export const TemplatePanel = () => {
  const { fabricRef, setSlides, setActiveSlide } = useContext(
    CanvasContext as React.Context<CanvasContextType>
  );
  const { data, isLoading, isFetching, isError } = useGetAllTemplate();

  const selectThisTemplate = (template: TemplateType) => {
    fabricRef.current?.loadFromJSON(
      JSON.parse(template.formattedData)[0].content,
      () => {}
    );
    fabricRef.current?.renderAll();
    setSlides(JSON.parse(template.formattedData));
    setActiveSlide(0);
  };

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
        {data?.map((template: TemplateType) => (
          <div
          className="flex justify-center items-center"
          key={template.id}
              onClick={() => selectThisTemplate(template)}>
            <img src={template.previewImage} />
          </div>
        ))}
      </div>
    </div>
  );
};
