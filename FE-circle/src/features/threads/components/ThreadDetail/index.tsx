import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import { AiFillHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { ILike, IReplies } from "../../../../interface/thread.interface";
import { BsDot } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/type/RootState";
import { useThreadReply } from "../../hooks/useThreadReply";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  name: string;
  username: string;
  content: string;
  time: string;
  likeCount: [];
  replies: [];
  imgProfile: string;
  imgContent: string;
}
function ThreadDetail({
  content,
  likeCount,
  name,
  replies,
  time,
  username,
  imgProfile,
  imgContent,
}: IProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const params = useParams();

  const idThread = Number(params.id);

  const [inputContent, setInputContent] = useState<string>("");
  // const [inputImage, setInputImage] = useState<string>("");

  const queryClient = useQueryClient();
  const { mutate: replyThread } = useThreadReply({
    idThread: idThread,
    onSuccess: () => {
      setInputContent("");
      queryClient.invalidateQueries({ queryKey: ["threadsReply"] });
    },
  });

  function handleReply() {
    // if (inputImage) {
    //   body.image = inputImage;
    // }
    replyThread({ content: inputContent });
  }

  return (
    <Flex gap={3}>
      <Avatar size="sm" name={name} src={imgProfile} />
      <Box w="full">
        <HStack>
          <Text
            display="flex"
            gap={2}
            fontSize="sm"
            fontWeight="semibold"
            color="whiteAlpha.800"
          >
            {name}
          </Text>
        </HStack>
        <Text fontSize="sm" color="whiteAlpha.600">
          @{username}
        </Text>
        <Text color="white" fontSize="sm">
          {content}
        </Text>
        {imgContent && <Image mt="2" w="300px" src={imgContent} alt={name} />}

        <Text
          mt={3}
          display="flex"
          align="center"
          fontSize="xs"
          color="whiteAlpha.600"
        >
          {moment(time).format("MMMM Do YYYY, h:mm:ss a")}
        </Text>
        <HStack spacing={6}>
          <HStack cursor="pointer" color="whiteAlpha.600" mt={2}>
            <AiFillHeart
              size={20}
              color={
                likeCount
                  ?.map((like: ILike) => like.user.id)
                  .includes(auth.user.id)
                  ? "red"
                  : ""
              }
            />
            <Text fontSize="sm" color="whiteAlpha.600">
              {likeCount?.length}
            </Text>
          </HStack>
          <HStack cursor="pointer" color="whiteAlpha.600" mt={2}>
            <BiCommentDetail size={20} />
            <Text fontSize="sm" color="whiteAlpha.600">
              {replies?.length}
            </Text>
          </HStack>
        </HStack>

        <HStack mt={5} justify="space-between">
          <HStack w="full">
            <Avatar size="sm" mr={3} src={auth.user.profile_picture} />
            <Input
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              rounded="none"
              borderBottom="1px solid gray"
              variant="unstyled"
              color="white"
              placeholder="Type your reply!"
            />
          </HStack>
          <HStack>
            {/* <Box cursor="pointer">
              <BiImageAdd size={25} color="green" />
            </Box> */}
            <Button
              onClick={handleReply}
              colorScheme="whatsapp"
              size="xs"
              px={3}
              rounded="full"
            >
              Reply
            </Button>
          </HStack>
        </HStack>

        <Stack mt={8}>
          {replies &&
            replies.map((e: IReplies) => (
              <Flex gap={3} borderBottom="1px solid gray" mt={1}>
                <Avatar
                  bg="gray"
                  fontWeight="semibold"
                  size="sm"
                  name={e.user.fullname}
                  src={e.user.profile_picture}
                />
                <Box mb={4}>
                  <Link href="/profile">
                    <HStack>
                      <Text
                        display="flex"
                        gap={1}
                        fontSize="sm"
                        fontWeight="semibold"
                        color="whiteAlpha.800"
                        cursor="pointer"
                      >
                        {e.user.fullname}
                        <Text
                          fontWeight="light"
                          display="flex"
                          color="whiteAlpha.600"
                        >
                          @{e.user.username} <BsDot color="gray" size={24} />
                          {moment(e.createdAt).format("MMM Do YY")}
                        </Text>
                      </Text>
                    </HStack>
                  </Link>

                  <Text
                    wordBreak="break-word"
                    fontSize="sm"
                    color="whiteAlpha.800"
                    fontWeight="light"
                  >
                    {e.content}
                  </Text>
                </Box>
              </Flex>
            ))}
        </Stack>
      </Box>
    </Flex>
  );
}

export default ThreadDetail;
