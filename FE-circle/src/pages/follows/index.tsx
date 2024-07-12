import Layout from "../../components/Layout/Layout";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
} from "@chakra-ui/react";
import { RootState } from "../../store/type/RootState";
import { useSelector } from "react-redux";
import FollowItem from "../../features/threads/components/FollowItem";
import { IFollow } from "../../interface/user.interface";

function FollowsPage() {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <Layout title="Follows">
      <Tabs mt={4} size="lg" color="white" colorScheme="green">
        <TabList justifyContent="space-around">
          <Tab w="full">Followers</Tab>
          <Tab w="full">Following</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Stack>
              {auth.followers &&
                auth.followers.map((e: IFollow) => (
                  <FollowItem
                    key={e.id}
                    id={e.id}
                    imgProfile={e.profile_picture}
                    name={e.fullname}
                    username={e.username}
                  />
                ))}
            </Stack>
          </TabPanel>
          <TabPanel>
            <Stack>
              {auth.followings &&
                auth.followings.map((e: IFollow) => (
                  <FollowItem
                    key={e.id}
                    id={e.id}
                    imgProfile={e.profile_picture}
                    name={e.fullname}
                    username={e.username}
                  />
                ))}
            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
}

export default FollowsPage;
