import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import { useEffect } from "react";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./authContext";

function App() {
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Decode the token to get its expiration time
    if (token) {
      const decodedToken: { id: string; username: string; exp: number } =
        jwtDecode(token);
      localStorage.setItem("userId", decodedToken.id);
      localStorage.setItem("userName", decodedToken.username);
      const expirationTimeS = decodedToken.exp;
      const expirationTimeMs = expirationTimeS * 1000;
      const currentTime = Date.now();
      if (currentTime < expirationTimeMs) {
        setIsLoggedIn(true);
      } else {
        // Token expired, clear it from storage and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Box bg="lightBg">
      <Box maxW="1200px" mx="auto" pt="73px">
        <Box as="section" my={10}>
          <Header
            logout={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("userName");
              localStorage.removeItem("userId");
              setIsLoggedIn(false);
            }}
          />
        </Box>
      </Box>
      <Outlet />
      <Box as="section" mt={10} bg="mediumBg">
        <Box maxW="1200px" mx="auto">
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
