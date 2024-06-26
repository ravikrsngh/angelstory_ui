/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectDetails } from "../../hooks/project/use-get-project";
import { useSaveProject } from "../../hooks/project/use-save-project";
import Design from "./design";

export const DesignLoader = () => {
  const timeoutRef = useRef<number>(null);
  const params = useParams();
  const { data, isLoading, isFetching } = useGetProjectDetails(
    parseInt(params.projectId ? params.projectId : "-1")
  );
  const saveProjectHook = useSaveProject();

  if (isLoading || isFetching) {
    return (
      <>
        <span>Loading</span>
      </>
    );
  }

  const saveProject = (
    obj: { formattedData?: string; name?: string; previewImage?: string },
    time: number = 300000
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    timeoutRef.current = setTimeout(() => {
      const projData = {
        collectionId: data?.collectionId,
        journeyId: data?.journeyId,
        formattedData: data?.formattedData,
        height: data?.height,
        name: data?.name,
        previewImage: data?.previewImage,
        projectId: data?.id,
        projectType: data?.projectType,
        width: data?.width,
      };
      // @ts-ignore
      saveProjectHook.mutate({ ...projData, ...obj });
    }, time);
  };

  console.log(data);

  return (
    <>
      {data ? (
        <Design
          originalWidth={data?.width}
          ratio={data.height / data.width}
          initialSlides={
            data.formattedData != ""
              ? JSON.parse(data.formattedData).slides
              : [{ content: "", duration: 2, previewImg: "", history: [] }]
          }
          initialMusic={
            data.formattedData != "" ? JSON.parse(data.formattedData).music : []
          }
          name={data.name}
          projectType={data.projectType}
          saveProject={saveProject}
        />
      ) : null}
    </>
  );
};
