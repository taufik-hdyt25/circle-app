import { useQuery } from "@tanstack/react-query";
import { API } from "../../libs/api";

export const useFetchAllUsers = (search?: string | "") => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const dataUsers = await API.get(`/users?search=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return dataUsers.data;
    },
    queryKey: ["users"],
  });
  return {
    data: users,
    isLoading,
    refetch,
  };
};
