import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useLogin } from "../../features/auth/hooks/useLogin";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const { handleChange, handleLogin, loading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      bg="blackAlpha.800"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="350px" p={{base:"6", md: ""}}>
        <Heading color="green" size="4xl">
          circle
        </Heading>
        <Text color="white" mt={3} fontSize="xl">
          Login to Circle
        </Text>

        <Stack mt={3} spacing={3} color="white">
          <FormControl>
            <Input
              name="emailOrUsername"
              onChange={handleChange}
              placeholder="Email/Username"
            />
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputRightElement onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <AiOutlineEye size={24} />
                ) : (
                  <AiOutlineEyeInvisible size={24} />
                )}
              </InputRightElement>
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                placeholder="Password"
              />
            </InputGroup>
          </FormControl>

          {/* <Text fontSize="sm" textAlign="end">
            Forgot Password?
          </Text> */}

          <Button
            isLoading={loading}
            onClick={handleLogin}
            rounded="full"
            colorScheme="whatsapp"
          >
            Login
          </Button>
        </Stack>

        <Text color="white" fontSize={{base:"x-small",md:"x-small"}} display="flex" gap={1} mt={4}>
          Don't have an account account yet?
          <Link to="/register">
            <Text fontWeight="semibold" fontSize="x-small"  color="green">
              Create account
            </Text>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Login;
