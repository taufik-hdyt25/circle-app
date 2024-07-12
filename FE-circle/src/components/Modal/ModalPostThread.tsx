import {
  Box,
  Button,
  Center,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import { useThreads } from "../../features/threads/hooks/useThread";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalPostThread({ isOpen, onClose }: Props) {
  const {
    handleChange,
    handleChangeGambar,
    handleOpenFile,
    handleUpload,
    loading,
    selectedGambarUrl,
    inputFileRef,
    form,
    loadingCreateThread
  } = useThreads();
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.100">
        <ModalHeader>Post Thread</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            value={form.content}
            resize="none"
            fontSize="sm"
            name="content"
            variant="outline"
            color="black"
            bg="InfoBackground"
            placeholder="What is happening?!"
            onChange={handleChange}
          />
          <Box mt={4}>
            <Input
              onChange={handleChangeGambar}
              ref={inputFileRef}
              display="none"
              type="file"
              accept="image/*"
              name="image"
            />
            {selectedGambarUrl ? (
              <Center>
                <Image maxH="250px" rounded="lg" src={selectedGambarUrl} />
              </Center>
            ) : (
              <Box
                w="fit-content"
                cursor="pointer"
                mt={3}
                onClick={handleOpenFile}
              >
                <BiImageAdd color="green" size={30} />
              </Box>
            )}
          </Box>
        </ModalBody>

        <ModalFooter gap={3}>
          {selectedGambarUrl && (
            <Button
              onClick={handleOpenFile}
              variant="outline"
              px={4}
              size="sm"
              colorScheme="whatsapp"
            >
              Change
            </Button>
          )}

          <Button
            isLoading={loading || loadingCreateThread}
            onClick={handleUpload}
            px={4}
            size="sm"
            colorScheme="whatsapp"
            isDisabled={!form.content}
          >
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
