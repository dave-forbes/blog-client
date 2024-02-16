import { Heading, Box, Image, Text } from "@chakra-ui/react";
import Header from "./components/Header";
import image from "./assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";

function App() {
  return (
    <Box bg="light" h="100vh">
      <Box maxW="1200px" mx="auto">
        <Header />
        <Box mt="4rem" p={4}>
          <Heading as="h1" size="4xl" color="headerText" w={[400, 500, 600]}>
            WELCOME TO CLIMBTRIBE.
          </Heading>
          <Text
            fontSize="xl"
            fontWeight="500"
            color="headerText"
            pl="0.5rem"
            pt="1rem"
          >
            Blog articles about climbing.
          </Text>
        </Box>
        <Box
          borderTop="1px"
          borderColor="borderColor"
          opacity="0.5"
          m="10px 0"
        ></Box>
        <Image src={image}></Image>
      </Box>
    </Box>
  );
}

export default App;
