import { Box, Card, Stack, Text } from "@chakra-ui/react";
import { useFetchUsersSuggest } from "./hooks/usefetchUsers";
import { IUser } from "../../../../interface/user.interface";
import FollowItem from "../FollowItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/type/RootState";


function Suggest() {
  const { data } = useFetchUsersSuggest();
  const auth = useSelector((state: RootState) => state.auth);


  return (
    <Card bg="whiteAlpha.200" p={4}>
      <Text color="white">Suggested for you</Text>
      <Box mt={3}>
        <Stack>
          {data
            ?.filter((e: IUser) => e.id !== auth.user.id)
            .map((e: IUser) => (
              <FollowItem
                key={e.id}
                name={e.fullname}
                imgProfile={e.profile_picture}
                username={e.username}
                id={e.id}
              />
            ))}
        </Stack>
      </Box>
    </Card>
  );
}

export default Suggest;
