import {
  Avatar,
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState, ChangeEvent, useRef } from "react";
import { TbEditCircle } from "react-icons/tb";
import { IUpdateProfile, IUser } from "../../interface/user.interface";
import { useUpdateProfiile } from "../../features/auth/hooks/useUpdateProfile";
import { API } from "../../libs/api";
import { useDispatch } from "react-redux";
import { AUTH_CHECK } from "../../store/RootReducer";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  userData: IUser;
}
export default function ModalEditProfile({
  isOpen,
  onClose,
  userData,
}: IProps) {


  const queryClient = useQueryClient()
  const dispatch = useDispatch();
  const { mutate: updateProfile } = useUpdateProfiile({
    id: userData.id,
    onSuccess: async () => {
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data));
      queryClient.invalidateQueries({queryKey: ["threads"]})
      onClose();
    },
  });

  const [form, setForm] = useState<IUpdateProfile>({
    email: "",
    fullname: "",
    profile_description: "",
    profile_picture: "",
    username: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  // ================================================================

  // manipulasi input dan button membuka file gambar
  const inputRef = useRef<HTMLInputElement>(null);

  // state menangkap input gambar dari file
  const [selectedGambarUrl, setSelectedGambarUrl] = useState<string>("");
  const [selectedFile, setSelecetedFile] = useState<any>();
  function handleChangeGambar(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setSelecetedFile(e.target.files[0]);
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedGambarUrl(imgUrl);
    }
  }

  const [loading, setLoding] = useState<boolean>(false);
  // upload image ke cloudinari
  const handleUpload = async () => {
    setLoding(true);
    const formData = new FormData();
    formData.append("image", selectedFile);
    await API.post("/upload", formData).then((res) => {
      setLoding(false);
      // menjalankan fungsi update ketika gambar berhasil di upload
      handleUpdate(res.data.url);
    });
  };
  function handleUpdate(imageLink: string) {
    updateProfile({
      email: form.email !== "" ? form.email : userData.email,
      fullname: form.fullname !== "" ? form.fullname : userData.fullname,
      profile_description:
        form.profile_description !== ""
          ? form.profile_description
          : userData.profile_description,
      profile_picture: imageLink !== "" ? imageLink : userData.profile_picture,
      username: form.username !== "" ? form.username : userData.username,
    });
  }

  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Box
              pos="relative"
              w="fit-content"
              bg="lightgray"
              rounded='full'
              p={1}
              onClick={() => {
                if (inputRef.current) {
                  inputRef.current.click();
                }
              }}
            >

              <Avatar
                src={
                  selectedGambarUrl
                    ? selectedGambarUrl
                    : userData.profile_picture
                }
                size="xl"
              />
              <Box
                cursor="pointer"
                pos="absolute"
                bottom={0}
                right={0}
                bg="black"
                p={1}
                rounded="full"
              >
                <TbEditCircle color="white" size={16} />
              </Box>
            </Box>
          </Center>
          <Input
            onChange={handleChangeGambar}
            display="none"
            type="file"
            ref={inputRef}
            accept="image/*"
          />

          {/* ============= */}
          <Grid mt={8} gridTemplateColumns="1fr 1fr" gap="2">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                onChange={handleChange}
                variant="filled"
                defaultValue={userData.username}
                name="username"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fullname</FormLabel>
              <Input
                onChange={handleChange}
                variant="filled"
                defaultValue={userData.fullname}
                name="fullname"
              />
            </FormControl>
            {/* <FormControl>
              <FormLabel>Password</FormLabel>
              <Input value={password} type="password" name='password' />
            </FormControl> */}
          </Grid>
          <FormControl mt={3}>
            <FormLabel>Email</FormLabel>
            <Input
              onChange={handleChange}
              variant="filled"
              defaultValue={userData.email}
              name="email"
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Profile Description</FormLabel>
            <Input
              onChange={handleChange}
              variant="filled"
              placeholder="Tambahkan bio"
              defaultValue={userData.profile_description}
              name="profile_description"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter gap="4">
          <Button
            isLoading={loading}
            // onClick={handleUpdate}
            onClick={handleUpload}
            colorScheme="whatsapp"
          >
            Update
          </Button>
          <Button mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
