import { Box, Button, GridItem, HStack, Spinner } from "@chakra-ui/react";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Layout from "../../components/Layout/Layout";
import ThreadDetail from "../../features/threads/components/ThreadDetail";
import { Link, useParams } from "react-router-dom";
import { useFetchDetailThreads } from "../../features/threads/hooks/useFetchDetailThread";

function Reply() {
  const params = useParams();

  const idParams = Number(params.id);

  const { data, isLoading } = useFetchDetailThreads(idParams);
  const detailData = data?.data;

  return (
    <Layout title="Reply">
      <GridItem>
        <HStack justifyContent='space-between'>
          <Link to="/">
            <Button
              display="flex"
              color="white"
              variant="unstyled"
              leftIcon={<IoChevronBackCircleOutline size={24} />}
            >
              Status
            </Button>
          </Link>
          {isLoading && <Spinner color="white" />}
        </HStack>
        {/*  REPLY =================== */}
        <Box mt={4}>
          <ThreadDetail
            imgContent={detailData?.image}
            imgProfile={detailData?.user.profile_picture}
            content={detailData?.content}
            likeCount={detailData?.likes}
            replies={detailData?.replies}
            name={detailData?.user.fullname}
            username={detailData?.user.username}
            time={detailData?.createdAt}
          />
        </Box>
      </GridItem>
    </Layout>
  );
}

export default Reply;
