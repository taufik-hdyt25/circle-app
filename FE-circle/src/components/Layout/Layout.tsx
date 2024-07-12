import { ReactNode } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import CardProfile from "../../features/threads/components/CardProfile";
import Suggest from "../../features/threads/components/Suggest";
import Footer from "../Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../store/type/RootState";
import ModalEditProfile from "../Modal/ModalUpdateProfile";
import { GiHamburgerMenu } from "react-icons/gi";
import DrawerMenu from "../DrawerMenu/DrawerMenu";
interface IProps {
  children?: ReactNode;
  title?: string;
}
const Layout: React.FC<IProps> = ({ children, title }): JSX.Element => {
  const auth = useSelector((state: RootState) => state.auth);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isDrawerMenu,
    onClose: closeDrawerMenu,
    onOpen: openDrawerMenu,
  } = useDisclosure();

  return (
    <Grid
      gridTemplateColumns={{
        base: "1fr",
        md: "300px 1.5fr",
        xl: "300px 1.5fr 1fr",
      }}
      bg="blackAlpha.800"
      h="100vh"
    >
      <GridItem
        display={{ base: "none", md: "block" }}
        px={6}
        py={4}
        borderRight="1px solid gray"
      >
        <Navbar />
      </GridItem>

      <GridItem
        px={6}
        py={4}
        borderRight="1px solid gray"
        overflowY="auto"
        h="100vh"
      >
        <HStack mb={3} justify="space-between">
          {title && (
            <Text color="white" fontSize="lg">
              {title}
            </Text>
          )}
          <Button
            display={{ base: "block", md: "none" }}
            aria-label="hamburger"
            variant="unstyled"
            size="sm"
            onClick={openDrawerMenu}
          >
            <GiHamburgerMenu color="white" size={24} />
          </Button>
        </HStack>
        {children}
      </GridItem>

      <GridItem display={{ base: "none", md: "block" }} px={6} py={4}>
        <CardProfile
          openModalEditProfile={onOpen}
          followers={auth.followers}
          following={auth.followings}
          name={auth.user.fullname}
          profile_bio={auth.user.profile_description}
          profile_picture={auth.user.profile_picture}
          username={auth.user.username}
        />
        <Box mt={4}>
          <Suggest />
          <Footer />
        </Box>
      </GridItem>

      <ModalEditProfile
        userData={auth.user}
        isOpen={isOpen}
        onClose={onClose}
      />

      <DrawerMenu isOpen={isDrawerMenu} onClose={closeDrawerMenu} />
    </Grid>
  );
};

export default Layout;
