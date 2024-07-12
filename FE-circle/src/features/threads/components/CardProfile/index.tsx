import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";

interface IProps {
  name?: string;
  username?: string;
  profile_bio?: string;
  following?: [];
  followers?: [];
  profile_picture?: string;
  openModalEditProfile: () => void;
}
function CardProfile({
  followers,
  following,
  name,
  profile_bio,
  profile_picture,
  username,
  openModalEditProfile,
}: IProps) {
  return (
    <Card bg="whiteAlpha.200" p={4}>
      <Text color="white">My Profile</Text>
      <Box
        pos="relative"
        h="80px"
        mt={3}
        rounded="xl"
        // bg="linear-gradient(to top, #96fbc4 0%, #f9f586 100%)"
        bg="lightgrey"
      >
        <Box bg='whatsapp.500' p={1} rounded='full' bottom={-6} left={4} pos="absolute">
          <Box  bg="#434343" rounded="full">
            <Avatar size="lg" src={profile_picture} />
          </Box>
        </Box>
      </Box>
      <Flex justify="right" mt={-6}>
        <Button
          color="white"
          size="xs"
          rounded="full"
          variant="outline"
          mt={8}
          w="fit-content"
          _hover={{ bg: "gray" }}
          onClick={openModalEditProfile}
        >
          Update Profile
        </Button>
      </Flex>

      <Stack spacing={0}>
        <Text mt={3} fontSize="lg" fontWeight="semibold" color="white">
          ✨{name}✨
        </Text>
        <Text fontSize="xs" color="whiteAlpha.600">
          @{username}
        </Text>
        <Text fontSize="sm" color="whiteAlpha.800">
          {profile_bio}
        </Text>
        <HStack fontSize="sm">
          <HStack>
            <Text color="whiteAlpha.800">
              {following?.length ? following.length : 0}
            </Text>
            <Text color="whiteAlpha.600">Following</Text>
          </HStack>
          <HStack>
            <Text color="whiteAlpha.800">
              {followers?.length ? followers.length : 0}
            </Text>
            <Text color="whiteAlpha.600">Followers</Text>
          </HStack>
        </HStack>
      </Stack>
    </Card>
  );
}

export default CardProfile;
