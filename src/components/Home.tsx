import { Box } from "@chakra-ui/react";
import Title from "./Title";
import Divider from "./Divider";
import Posts from "./Posts";

const Home = () => {
  return (
    <>
      <Box maxW="1200px" mx="auto">
        <Box as="section" my={10}>
          <Title />
        </Box>
        <Box my={10}>
          <Divider />
        </Box>
        <Box as="section" my={10}>
          <Posts />
        </Box>
      </Box>
    </>
  );
};

export default Home;
