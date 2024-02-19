import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode the token to get its expiration time
      const decodedToken = jwtDecode<JwtPayload>(token);
      console.log(decodedToken);
      if (decodedToken) {
        const expirationTime = decodedToken.exp;
        if (expirationTime) {
          const currentTime = Date.now();
          console.log(currentTime);
          const exp = expirationTime * 1000;
          console.log(exp);
          if (currentTime < expirationTime * 1000) {
            setIsLoggedIn(true);
          } else {
            // Token expired, clear it from storage and redirect to login
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }
        }
      }
    }
  }, []);

  return (
    <Box bg="lightBg">
      <Box maxW="1200px" mx="auto" pt="73px">
        <Box as="section" my={10}>
          <Header
            isLoggedIn={isLoggedIn}
            logout={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          />
        </Box>
      </Box>
      <Outlet context={[isLoggedIn, setIsLoggedIn]} />
      <Box as="section" mt={10} bg="mediumBg">
        <Box maxW="1200px" mx="auto">
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
