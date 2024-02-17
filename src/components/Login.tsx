import { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setIsLoggedIn: (param: Boolean) => void = useOutletContext();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Form submitted");

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
        console.log(data);
        setError(data.message);
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <form onSubmit={handleSubmit}>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          Login
        </Button>
        {error && <Text>{error}</Text>}
      </form>
    </Flex>
  );
};

export default Login;
