import { useParams } from "react-router-dom";
import { useGetProjectDetails } from "../../hooks/project/use-get-project";
import Design from "./design";
import { useSaveProject } from "../../hooks/project/use-save-project";
import { useRef } from "react";

export const DesignLoader = () => {
  const timeoutRef = useRef<unknown>(null);
  const params = useParams();
  const { data, isLoading, isFetching } = useGetProjectDetails(
    params.projectId
  );
  const saveProjectHook = useSaveProject()

  if (isLoading || isFetching) {
    return (
      <>
        <span>Loading</span>
      </>
    );
  }

  const saveProject = (obj) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      let projData = {
        collectionId: data.collectionId,
        formattedData: data.formattedData,
        height: data.height,
        name: data.name,
        previewImage: data.previewImage,
        projectId: data.id,
        projectType: data.projectType,
        width: data.width
      }
      saveProjectHook.mutate({...projData, ...obj})
    }, 5000)
  }

  console.log(data);

  return (
    <Design
      originalWidth={data.width}
      ratio={data.height / data.width}
      initialSlides={
        data.formattedData
          ? JSON.parse(data.formattedData)
          : [{ content: "", duration: 2, previewImg: "", history: [] }]
      }
      name={data.name}
      projectType = {data.projectType}
      saveProject = {saveProject}
    />
  );
};
