import {
  Avatar,
  Button,
  HStack,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFollow } from "../../../follows/follow.hook";
import { API } from "../../../../libs/api";
import { useDispatch } from "react-redux";
import { AUTH_CHECK } from "../../../../store/RootReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/type/RootState";
import { IFollow } from "../../../../interface/user.interface";

interface IProps {
  name?: string;
  username?: string;
  imgProfile?: string;
  id: number;
}
function FollowItem({
  imgProfile,
  name,
  username,
  id
}: IProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const checkStatus = auth.followings.map((e: IFollow) => e.id).includes(id)
    ? "Unfollow"
    : "Follow";

  const { mutate: Follow } = useFollow({
    onSuccess: async () => {
      const response = await API.get("/auth/check");
      dispatch(AUTH_CHECK(response.data));
    },
  });

  return (
    <HStack justify="space-between">
      <Link href={`/profile/${id}`}>
        <HStack spacing={3}>
          <Avatar size="md" src={imgProfile} />
          <Stack spacing={-4}>
            <Text fontSize="md" color="white">
              {name}
            </Text>
            <Text color="whiteAlpha.600" fontSize="sm">
              @{username}
            </Text>
          </Stack>
        </HStack>
      </Link>

      <Button
        onClick={() => Follow(id)}
        _hover={{ bg: "gray" }}
        variant="outline"
        rounded="full"
        size="sm"
        color={checkStatus === "Unfollow" ? "gray" : "white"}

      >
        {checkStatus}
      </Button>
    </HStack>
  );
}

export default FollowItem;
