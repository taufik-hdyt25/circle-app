/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  FormLabel,
  VStack,
  Input,
  FormControl,
  Text,
  Image,
  Spinner,
  Center,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useState, ChangeEvent } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { API } from "../../libs/api";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  setImageUrl: Dispatch<SetStateAction<string>>;
  imageUrl?: string;
  imagePreview?: string
  setImagePreview:  Dispatch<SetStateAction<string>>
}
const ModalUploadImg: React.FC<IProps> = ({
  isOpen,
  onClose,
  setImageUrl,
  imageUrl,
  setImagePreview,
  imagePreview
}): JSX.Element => {

  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFile, setSelecetedFile] = useState<File | null>(null);


  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelecetedFile(e.target.files[0]);
      const imgUrl = URL.createObjectURL(e.target.files[0])
      setImagePreview(imgUrl)
    }
  }
  const handleUpload = () => {
    if (!selectedFile)
      return toast({
        title: "Input your image",
        status: "error",
        position: "top",
      });

    setLoading(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    API.post("/upload", formData).then((res) => {
      setImageUrl(res.data.data.url);
      setLoading(false);
      onClose()
    });
  };

  function handleCancel() {
    setSelecetedFile(null);
    onClose();
  }

  return (
    <Modal isCentered size="sm" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile Picture</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {imageUrl || imagePreview && loading === false ? (
            <>
              <Image w="full" h='200px' bgSize='cover'  src={imagePreview} alt="img" />
              <FormControl display="flex" justifyContent="center">
                <Input
                  onChange={handleChange}
                  name="file"
                  type="file"
                  id="updategambar"
                  display="none"
                  accept="image/*"

                />
              </FormControl>
            </>
          ) : (
            <>
              {loading ? (
                <Center mb={4}>
                  <Spinner size="xl" color="green" />
                </Center>
              ) : (
                <Stack
                  mb={2}
                  align="center"
                  border="3px solid green"
                  borderStyle="dotted"
                >
                  <VStack>
                    <FormControl>
                      <FormLabel
                        px={4}
                        py={2}
                        color="white"
                        fontWeight="semibold"
                        rounded="lg"
                        htmlFor="image"
                        cursor="pointer"
                      >
                        <AiOutlineCloudUpload color="green" size={100} />
                        <Text color="green">Choose FIle</Text>
                      </FormLabel>
                      <Input
                        onChange={handleChange}
                        name="file"
                        type="file"
                        id="image"
                        accept="image/*"
                        display="none"
                      />
                    </FormControl>
                  </VStack>
                </Stack>
              )}
            </>
          )}
            <ModalFooter  justifyContent='space-evenly'>
              {
                imagePreview && <FormLabel cursor='pointer' mt={2} htmlFor="updategambar"  size='sm' colorScheme="blue">Change</FormLabel>
              }

              <Button size='sm' colorScheme="whatsapp" onClick={handleUpload}>
                Update
              </Button>
              <Button size='sm' onClick={handleCancel}>Cancel</Button>
            </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalUploadImg;
