import { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ExpressValidatorErrorI } from "../interfaces";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await fetch(
        "https://blog-api-production-7c83.up.railway.app/users/register",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          // recieved express validator array
          const data = await response.json();
          let errorString: string = "";
          data.errors.forEach((error: any): void => {
            errorString = errorString + ", " + error.msg;
          });
          throw new Error(`${response.status}: ${errorString.slice(1)}`);
        } else {
          throw new Error(`${response.status}: Server error`);
        }
      }

      navigate("/log-in");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      height="60vh"
      direction="column"
      gap={5}
    >
      <form onSubmit={handleSubmit}>
        <Flex direction="column">
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              bg="white"
            />
          </FormControl>
          <FormControl id="password" isRequired mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="white"
            />
          </FormControl>
          <FormControl id="confirmPassword" isRequired mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              bg="white"
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" mt={4}>
            Sign Up
          </Button>
        </Flex>
      </form>
      {error && <Text color="red">{error}</Text>}
    </Flex>
  );
};

export default Register;
