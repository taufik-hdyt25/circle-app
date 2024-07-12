/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { BsDot } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import moment from "moment";
import { ILike, IReplies } from "../../../../interface/thread.interface";
import { useLike } from "../../../like/like.hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/type/RootState";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface IProps {
  idThread?: number;
  imgProfile?: string;
  name?: string;
  username?: string;
  content?: string;
  likes: ILike[];
  replies?: IReplies[];
  time?: string;
  imageContent?: string;
  isLink?: boolean;
  idUser?: number;
}
function Thread({
  likes,
  content,
  idThread,
  imageContent,
  imgProfile,
  name,
  replies,
  time,
  username,
  isLink,
  idUser,
}: IProps) {
  const queryClient = useQueryClient();
  const auth = useSelector((state: RootState) => state.auth);

  const { mutate: like } = useLike({
    id: idThread,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });

  return (
    <Flex gap={3} mt={3}>
      <HStack align="start" spacing={4}>
        <Avatar
          bg="gray"
          fontWeight="semibold"
          size="md"
          name={name}
          src={imgProfile}
        />
        <Box>
          {isLink ? (
            <Link to={`/profile/${idUser}`}>
              <HStack>
                <Text
                  display="flex"
                  gap={1}
                  fontSize="sm"
                  fontWeight="semibold"
                  color="whiteAlpha.800"
                  cursor="pointer"
                >
                  {name}
                  <Text
                    fontWeight="light"
                    display="flex"
                    color="whiteAlpha.600"
                  >
                    {username} <BsDot color="gray" size={24} />
                    {moment(time).format("MMM Do YY")}
                  </Text>
                </Text>
              </HStack>
            </Link>
          ) : (
            <HStack>
              <Text
                display="flex"
                gap={1}
                fontSize="sm"
                fontWeight="semibold"
                color="whiteAlpha.800"
              >
                {name}
                <Text fontWeight="light" display="flex" color="whiteAlpha.600">
                  <BsDot color="gray" size={24} />
                  {moment(time).format("MMM Do YY")}
                </Text>
              </Text>
            </HStack>
          )}

          <Text
            wordBreak="break-word"
            mb={imageContent ? 2 : 0}
            fontSize="sm"
            color="whiteAlpha.800"
            fontWeight="light"
          >
            {content}
          </Text>

          {imageContent && <Image w="300px" src={imageContent} alt="img" />}

          <HStack spacing={6}>
            <HStack
              onClick={() => like()}
              cursor="pointer"
              color="whiteAlpha.600"
              mt={2}
            >
              <AiFillHeart
                size={24}
                color={
                  likes.map((like) => like.user.id).includes(auth.user.id)
                    ? "red"
                    : ""
                }
              />
              <Text fontSize="sm" color="whiteAlpha.600">
                {likes?.length ? likes.length : ""}
              </Text>
            </HStack>
            <Link to={`reply/${idThread}`}>
              <HStack cursor="pointer" color="whiteAlpha.600" mt={2}>
                <BiCommentDetail size={24} />
                <Text fontSize="sm" color="whiteAlpha.600">
                  {replies?.length ? replies.length : ""} Replies
                </Text>
              </HStack>
            </Link>
          </HStack>
        </Box>
      </HStack>
    </Flex>
  );
}

export default Thread;
