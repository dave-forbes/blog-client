import { Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Box bg="lightBg">
      <Box maxW="1200px" mx="auto">
        <Box as="header" my={10} pt="73px">
          <Header />
        </Box>
        <Box as="main">
          <Outlet />
        </Box>
        <Box as="footer" mt={10} bg="mediumBg">
          <Box>
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
