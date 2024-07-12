import { useQuery } from "@tanstack/react-query";
import { API } from "../../../libs/api";

export const useFetchDetailThreads = (id: number) => {
  const { data: detailThreads, isLoading,refetch} = useQuery({
    queryFn: async () => {
      const dataDetailThreads = await API.get(`/thread/${id}`);
      return dataDetailThreads;
    },
    queryKey: ['threadsReply'],
  });
  return {
    data: detailThreads,
    isLoading,
    refetch
  };
};
