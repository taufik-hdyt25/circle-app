import { useMutation } from "@tanstack/react-query";
import { API } from "../../../libs/api";
import { AxiosError } from "axios";
import {useToast} from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThreadReply = ({onSuccess,idThread}: any)=>{
  const toast = useToast()
 return useMutation({
    mutationFn: async (body: {content: string})=> {
      await API.post(`/thread/${idThread}/reply`, body)
    },

    onSuccess,
    onError: (error: unknown) => {
      let errorMessage = "Something Error";
      if (error instanceof AxiosError) {
        if (error.response) {
          errorMessage = error.response.data.message.message
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
