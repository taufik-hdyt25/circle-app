import { useState, ChangeEvent, useRef } from "react";
import { ICreateThread } from "../../../interface/thread.interface";
import { API } from "../../../libs/api";
import { useMutation } from "@tanstack/react-query";
import { useFetchThreads } from "./useFetchThread";
import { useDisclosure } from "@chakra-ui/react";

export function useThreads() {
  const inputFileRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    inputFileRef.current?.click();
  }

  //=================== VERSI TANPA MESSAGE QUEUE =====================
  const [selectedGambarUrl, setSelectedGambarUrl] = useState<string>("");
  const [selectedFile, setSelecetedFile] = useState<any>();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoding] = useState<boolean>(false);
  const [form, setForm] = useState<ICreateThread>({
    content: "",
    image: "",
  });

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // state menangkap input gambar dari file
  function handleChangeGambar(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelecetedFile(e.target.files[0]);
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedGambarUrl(imgUrl);
    }
  }

  function handleOpenFile() {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  }

  const { refetch } = useFetchThreads();

  const onCloseModal = () => {
    setSelectedGambarUrl("");
    setForm({
      content: "",
      image: "",
    });
    onClose();
  };

  const { mutate: createThread, isPending: loadingCreateThread } = useMutation({
    mutationFn: async (body: ICreateThread) => {
      await API.post("/thread", body);
    },
    onSuccess: () => {
      refetch();
      onCloseModal();
      setForm({
        content: "",
        image: "",
      });
    },
  });

  const handleUpload = async () => {
    setLoding(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    await API.post("/upload", formData).then((res) => {
      setLoding(false);
      createThread({
        content: form.content,
        image: res.data.url,
      });
    });
  };

  return {
    handleOpenFile,
    handleChangeGambar,
    handleUpload,
    handleChange,
    selectedGambarUrl,
    loading,
    inputFileRef,
    form,
    handleButtonClick,
    isOpen,
    onClose,
    onOpen,
    loadingCreateThread,
  };
}
