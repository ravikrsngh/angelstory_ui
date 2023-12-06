import { HoverCard } from "@radix-ui/react-hover-card"
import { useParams } from "react-router-dom"
import { useGetProjectsFromCollection } from "../../hooks/project/use-get-projects-from-collection"
import { CollectionProjectCard } from "./collection-project-card"

export const CollectionProjects = () => {
    const params = useParams()
    const {data, isLoading, isFetching} = useGetProjectsFromCollection(params.collectionId)
    if(isLoading || isFetching) {
      return <span>Loading ...</span>
    }
    console.log(data)
    return (
      <div className="mt-10">
          <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
            Journies
          </h4>
          <div className="flex gap-4">
            {data.map((proj) => <CollectionProjectCard key={proj.id} projData={proj} /> )}
          </div>
        </div>
    )
  }