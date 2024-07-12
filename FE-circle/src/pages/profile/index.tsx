import {
  Avatar,
  Box,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useFetchThreads } from "../../features/threads/hooks/useFetchThread";
import Navbar from "../../components/Navbar";
import { CgMenuGridR } from "react-icons/cg";
import { IThreads } from "../../interface/thread.interface";
import Thread from "../../features/threads/components/ThreadItem";
import { RootState } from "../../store/type/RootState";
import { useSelector } from "react-redux";

export default function ProfilePage() {
  const params = useParams();
  const idParams = Number(params.id);
  const auth = useSelector((state: RootState) => state.auth);

  const { data: dataThreads, isLoading } = useFetchThreads();
  const threads: IThreads[] = dataThreads?.data.data;
  const threadUser = threads?.filter((item) => item.user.id === idParams);
  console.log(threadUser);

  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", md: "300px 1fr" }}
      bg="blackAlpha.700"
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

      {isLoading && (
        <HStack justify="center" spacing={6}>
          <Spinner size="xl" color="white" />
          <Text fontWeight="semibold" color="white">
            Loading data...
          </Text>
        </HStack>
      )}

      {threadUser && (
        <GridItem overflowY='auto'>
          <Box px={4} py={8}>
            <Box>
              <Stack align="center">
                <Avatar
                  size={{ base: "lg", md: "2xl" }}
                  src={auth?.user.profile_picture}
                />

                <Stack textAlign="center" spacing={0}>
                  <Text color="white" fontWeight="semibold">
                    {auth?.user.fullname}
                  </Text>
                  <Text color="white">{auth?.user.profile_description}</Text>
                </Stack>
              </Stack>
              <HStack mt={10} justify="space-around" w="full">
                <HStack spacing={{ base: 4, md: 20 }}>
                  <Stack spacing={0} color="white" textAlign="center">
                    <Text fontWeight="semibold">
                      {threadUser?.length ? threadUser?.length : 0}
                    </Text>
                    <Text>Post</Text>
                  </Stack>
                  <Stack spacing={0} color="white" textAlign="center">
                    <Text fontWeight="semibold">
                      {auth?.followers?.length ? auth?.followers?.length : 0}
                    </Text>
                    <Text>Followers</Text>
                  </Stack>
                  <Stack spacing={0} color="white" textAlign="center">
                    <Text fontWeight="semibold">
                      {auth?.followings?.length ? auth?.followings?.length : 0}
                    </Text>
                    <Text>Following</Text>
                  </Stack>
                </HStack>
              </HStack>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            pb={3}
            borderBottom="1px solid gray"
            mt={6}
          >
            <CgMenuGridR color="white" size={30} />
          </Box>
          <Stack p={3}>
            {threadUser?.map((e: IThreads, idx) => (
              <Thread
                key={idx}
                likes={e.likes}
                content={e.content}
                idThread={e.id}
                idUser={e.user.id}
                imageContent={e.image}
                imgProfile={e.user.profile_picture}
                replies={e.replies}
                name={e.user.fullname}
                username={e.user.username}
                time={e.createdAt}
              />
            ))}
          </Stack>
        </GridItem>
      )}
    </Grid>
  );
}
