import { useQuery } from "@tanstack/react-query";
import ky from "ky";

const getAllPhotos = (searchQuery: string) => {
  const accessKey = "dqSeyQ2g_HMdOVHAPGVKtCnS2YcgKejOAAlrJ2JXkJM";
  const url = `https://api.unsplash.com/search/photos?${
    searchQuery ? "query=" + searchQuery : ""
  }&client_id=${accessKey}`;
  return ky.get(url).json();
};

export function useGetStockImages(searchQuery: string) {
  return useQuery({
    queryKey: ["stock-images", searchQuery],
    queryFn: () => getAllPhotos(searchQuery),
  });
}
