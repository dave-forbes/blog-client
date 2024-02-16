import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
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
  return (
    <Box bg="lightBg">
      <Box maxW="1200px" mx="auto" pt="73px">
        <Box as="section" my={10}>
          <Header />
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
