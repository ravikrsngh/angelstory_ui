import { Link } from "react-router-dom";
import MultiCarousel from "../multi-carousel";
import { useGetAllTemplate } from "../../hooks/templates/use-get-all-templates";
import { TemplateType } from "../../types";

export const DashboardTemplates = () => {
  const { data, isLoading, isFetching, isError } = useGetAllTemplate();

  if(isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if(isError) {
    return <span>Something went wrong...</span>
  }

  return (
    <>
      <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
        Select Templates{" "}
        <Link to="/templates" className="text-base hover:underline">
          View All
        </Link>
      </h4>
      <div>
        <MultiCarousel itemClass="mx-3 !w-56">
        {data?.map((template: TemplateType) => (
          <div className="relative w-56">
          <img src={template.previewImage} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="bg-primary-400 text-white px-5 py-2 rounded-sm ">
              Use This template
            </button>
          </div>
        </div>
        ))}
        </MultiCarousel>
      </div>
    </>
  );
};
