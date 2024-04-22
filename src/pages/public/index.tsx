import { useParams } from "react-router-dom";
import { useGetPublicEntity } from "../../hooks/access-rights/use-get-public-entity";
import { EntityType } from "../../types";

export default function PublicPage() {
  const params = useParams();
  const { isLoading, isError, data, isFetching } = useGetPublicEntity(
    params.publicId || ""
  );

  console.log(isLoading);

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Something went wrong!!</span>;
  }
  return (
    <div>
      {data.accessType == EntityType.COLLECTION && <span>View Collection</span>}
      {data.accessType == EntityType.JOURNEY && <span>View Journey</span>}
    </div>
  );
}
