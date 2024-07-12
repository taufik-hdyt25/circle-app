/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { API } from "../../libs/api";


export const useLike = ({onSuccess, id}: any)=>{
 return useMutation({
    mutationFn: async ()=> {
      await API.post(`thread/${id}/like`,"", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
    },
    onSuccess,
  });
};
