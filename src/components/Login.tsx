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
import { useAuth } from "../authContext";
import { decodeToken, isTokenValid } from "../authUtils";

const Login = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        "https://blog-api-production-7c83.up.railway.app/users/log-in",
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
        const data = await response.json();
        throw new Error(JSON.stringify(data));
      }

      const data = await response.json();
      const token = data.token;

      // log in successful, check token and store data

      if (token) {
        localStorage.setItem("token", token);
        if (isTokenValid(token)) {
          const decodedToken = decodeToken(token);
          if (decodedToken) {
            // Token valid
            const authorString = JSON.stringify(decodedToken.author);
            localStorage.setItem("author", authorString);
            localStorage.setItem("userId", decodedToken.id);
            localStorage.setItem("userName", decodedToken.username);
            setIsLoggedIn(true);
            navigate("/");
          }
        }
      }
    } catch (error: any) {
      const responseData = JSON.parse(error.message);
      setError(responseData.message);
    }
  };

  return (
    <Flex align="center" justify="center" height="60vh">
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
          <Button type="submit" colorScheme="teal" mt={4}>
            Login
          </Button>
          {error && (
            <Text textAlign="center" mt={5} color="red">
              {error}
            </Text>
          )}
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
