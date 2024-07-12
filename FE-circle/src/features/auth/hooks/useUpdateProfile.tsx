// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useMutation } from "@tanstack/react-query";
import { API } from "../../../libs/api";
import { AxiosError } from "axios";
import {useToast} from '@chakra-ui/react'
import { IUpdateProfile } from "../../../interface/user.interface";

export const useUpdateProfiile = ({onSuccess,id}: any)=>{
  const toast = useToast()
 return useMutation({
    mutationFn: async ( body: IUpdateProfile)=> {
      await API.patch(`/user/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })

    },
    onSuccess,
    onError: (error: unknown) => {
      console.log(error);

      let errorMessage = "Something Error";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.Error;
        } else {
          errorMessage = error.message;
        }
      }
      toast({
        title: errorMessage,
        status: "error",
        position: "top",
      });
    },
  });
};
