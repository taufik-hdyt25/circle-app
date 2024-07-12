/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { API } from "../../libs/api";


export const useFollow = ({onSuccess}: any)=>{
 return useMutation({
    mutationFn: async (id:number)=> {
      await API.post(`/follow/${id}`,"", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
    },
    onSuccess,
  });
};
