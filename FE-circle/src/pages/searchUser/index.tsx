import Layout from "../../components/Layout/Layout";
import {
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import FollowItem from "../../features/threads/components/FollowItem";
import { RiUserSearchLine } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { IUser } from "../../interface/user.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../store/type/RootState";
import { useFetchAllUsers } from "../../features/user/useFetchAllUsers";
import { useState } from "react";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string>("");

  const { data, refetch } = useFetchAllUsers(searchResult);

  const auth = useSelector((state: RootState) => state.auth);

  function handleSearch() {
    setSearchResult(searchQuery);
    setTimeout(()=> {
      refetch()
    },300)
  }

  return (
    <Layout title="Search">
      <HStack>
        <InputGroup>
          <InputLeftElement>
            <RiUserSearchLine color="white" size={24} />
          </InputLeftElement>
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            rounded="full"
            color="white"
            type="text"
            placeholder="Seacrh user"
          />
        </InputGroup>
        <IconButton
          onClick={handleSearch}
          rounded="full"
          px={6}
          colorScheme="whatsapp"
          aria-label="search"
          icon={<BsSearch color="white" size={24} />}
        />
      </HStack>
      <Stack mt={8} spacing={6}>
        {data
          ?.filter((e: IUser) => e.id !== auth.user.id)
          .map((e: IUser) => (
            <FollowItem
              id={e.id}
              imgProfile={e.profile_picture}
              name={e.fullname}
              username={e.username}
            />
          ))}
      </Stack>
    </Layout>
  );
}

export default SearchPage;
