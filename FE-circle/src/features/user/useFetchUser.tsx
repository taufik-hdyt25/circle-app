import { useQuery } from "@tanstack/react-query";
import { API } from "../../libs/api";

export const useFetchUser = (id: number) => {
  const { data: users, isLoading,refetch} = useQuery({
    queryFn: async () => {
      const dataUsers = await API.get(`/user/${id}`);
      return dataUsers.data
    },
    queryKey: ['user'],
  });
  return {
    data: users,
    isLoading,
    refetch
  };
};
