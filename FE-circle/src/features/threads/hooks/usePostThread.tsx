import { useMutation } from "@tanstack/react-query";
import { API } from "../../../libs/api";
import { ICreateThread } from "../../../interface/thread.interface";
import { AxiosError } from "axios";
import {useToast} from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePostThread = ({onSuccess}: any)=>{
  const toast = useToast()
 return useMutation({
    mutationFn: async (body: ICreateThread)=> {
      await API.post("/thread-post", body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
    },
    onSuccess,
    onError: (error: unknown) => {
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
