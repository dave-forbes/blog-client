import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import { useEffect } from "react";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import { decodeToken, isTokenValid } from "./authUtils";

function App() {
  const { setIsLoggedIn } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      if (isTokenValid(token)) {
        const decodedToken = decodeToken(token);
        if (decodedToken) {
          // Token valid so log in
          localStorage.setItem("userId", decodedToken.id);
          localStorage.setItem("userName", decodedToken.username);
          setIsLoggedIn(true);
          return;
        }
      }
      // Token expired or invalid, clear it from storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("userName");
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
    } else {
      // No token so log out
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
