import {
  Box,
  Button,
  HStack,
  Heading,
  Stack,
  Text,
  useDisclosure,
  Link,
} from "@chakra-ui/react";
import { AiOutlineUser, AiOutlineHeart, AiOutlineHome } from "react-icons/ai";
import { TbUserSearch } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../store/type/RootState";
import ALertConfirm from "../Alert/ALert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH_LOGOUT } from "../../store/RootReducer";

function Navbar() {
  const auth = useSelector((state: RootState) => state.auth);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(AUTH_LOGOUT());
    navigate("/login");
    onClose();
  }

  return (
    <Stack h="full" justify="space-between">
      <Box>
        <Heading color="green">circle</Heading>
        <Stack mt={8} spacing={6}>
          <Link href="/">
            <HStack cursor="pointer" color="white">
              <AiOutlineHome size={25} />
              <Text fontSize="sm  ">Home</Text>
            </HStack>
          </Link>
          <Link href="/search">
            <HStack cursor="pointer" color="white">
              <TbUserSearch size={25} />
              <Text fontSize="sm  ">Search</Text>
            </HStack>
          </Link>
          <Link href="/follows">
            <HStack cursor="pointer" color="white">
              <AiOutlineHeart color="transparant" size={25} />
              <Text fontSize="sm  ">Follows</Text>
            </HStack>
          </Link>
          <Link href={`profile/${auth.user.id}`}>
            <HStack cursor="pointer" color="white">
              <AiOutlineUser size={25} />
              <Text fontSize="sm  ">Profile</Text>
            </HStack>
          </Link>
        </Stack>
      </Box>

      <Button
        fontWeight="light"
        color="white"
        display="flex"
        justifyContent="start"
        leftIcon={<BiLogOut size={30} />}
        colorScheme="teal"
        variant="unstyled"
        onClick={onOpen}
      >
        Logout
      </Button>

      <ALertConfirm
        onOk={() => handleLogout()}
        isOpen={isOpen}
        onCLose={onClose}
      />
    </Stack>
  );
}

export default Navbar;
