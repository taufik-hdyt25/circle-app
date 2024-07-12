/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useRegister } from "../../features/auth/hooks/useRegister";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

function Register() {
  const { handleChange, handleRegister,isLoading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      bg="blackAlpha.800"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box w="350px">
        <Heading color="green" size="4xl">
          circle
        </Heading>
        <Text color="white" mt={3} fontSize="xl">
          Create Account Circle
        </Text>
        <Stack mt={3} spacing={3} color="white">
          <FormControl>
            <Input
              name="fullname"
              placeholder="Fullname"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <Input name="email" placeholder="Email" onChange={handleChange} />
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

          <Button
            onClick={handleRegister}
            rounded="full"
            colorScheme="whatsapp"
            isLoading={isLoading}
          >
            Create
          </Button>
        </Stack>
        <Text color="white" fontSize="sm" display="flex" gap={2} mt={4}>
          Already have account?{" "}
          <Link to="/login">
            <Text fontWeight="semibold" color="green">
              Login
            </Text>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Register;
