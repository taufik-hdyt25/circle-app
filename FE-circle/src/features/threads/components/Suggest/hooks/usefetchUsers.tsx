import { useQuery } from "@tanstack/react-query";
import { API } from "../../../../../libs/api";

export const useFetchUsersSuggest = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const dataUsers = await API.get("/suggest-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dataUsers.data;
    },
    queryKey: ["fetchUsers"],
  });
  return {
    data: users,
    isLoading,
    refetch,
  };
};
