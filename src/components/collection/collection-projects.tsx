/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from "react-router-dom"
import { useGetProjectsFromCollection } from "../../hooks/project/use-get-projects-from-collection"
import { CollectionProjectCard } from "./collection-project-card"
import { DesignType } from "../../types"

export const CollectionProjects = () => {
    const params = useParams()
    const {data, isLoading, isFetching} = useGetProjectsFromCollection(parseInt(params.collectionId?params.collectionId : "-1"))
    if(isLoading || isFetching) {
      return <span>Loading ...</span>
    }
    console.log(data)
    return (
      <div className="mt-10">
          <h4 className="font-medium mb-10 text-xl flex justify-between items-center">
            Journies
          </h4>
          <div className="flex gap-4 overflow-auto">
            {data?.map((proj:DesignType) => <CollectionProjectCard key={proj.id} projData={proj} /> )}
          </div>
        </div>
    )
  }