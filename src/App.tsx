import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import FeaturedPost from "./components/FeaturedPost";
import { useEffect, useState } from "react";
import Divider from "./components/Divider";
import Title from "./components/Title";
import Posts from "./components/Posts";
import Footer from "./components/Footer";

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
        <Box as="section" my={10}>
          <Title />
        </Box>
        <Box as="section" my={10}>
          <Divider />
        </Box>
        <Box as="section" my={10}>
          <FeaturedPost />
        </Box>
        <Box as="section" my={10}>
          <Posts />
        </Box>
      </Box>
      <Box as="section" mt={10} bg="mediumBg">
        <Box maxW="1200px" mx="auto">
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
