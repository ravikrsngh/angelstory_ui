import { Link } from "react-router-dom";
import { useGetAllTemplate } from "../../hooks/templates/use-get-all-templates";
import { TemplateType } from "../../types";

export const DashboardTemplates = () => {
  const { data, isLoading, isFetching, isError } = useGetAllTemplate();

  console.log(data)

  if(isLoading || isFetching) {
    return <span>Loading...</span>
  }

  if(isError) {
    return <span>Something went wrong...</span>
  }

  return (
    <>
      <h4 className="text-base font-medium mb-6 md:mb-10 md:text-xl flex justify-between items-center">
        Select Templates{" "}
        <Link to="/templates" className=" font-normal text-sm md:text-base hover:underline">
          View All
        </Link>
      </h4>
      <div className="flex gap-4 overflow-x-auto">
        {data?.map((template: TemplateType) => (
          <div key={template.id} className="relative w-32 md:w-56">
          <img src={template.previewImage} alt="" className="w-full" />
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100">
            
          </div>
        </div>
        ))}
      </div>
    </>
  );
};
