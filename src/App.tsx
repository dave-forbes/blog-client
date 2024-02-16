import { Heading, Box, Image, Text } from "@chakra-ui/react";
import Header from "./components/Header";
import image from "./assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";

function App() {
  return (
    <Box bg="light">
      <Box maxW="1200px" mx="auto">
        {/* HEADER */}
        <Header />
        {/* TITLE */}
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
        {/* DIVIDER */}
        <Box
          borderTop="1px"
          borderColor="borderColor"
          opacity="0.5"
          m="10px 0"
        ></Box>
        {/* FEATURED POST */}
        <Box pos="relative">
          <Image src={image} h="500px" w="100%" objectFit="cover"></Image>
          <Box
            bg="light"
            pos="absolute"
            bottom="0"
            w="400px"
            left="100px"
            p="2rem"
          >
            <Heading color="headerText">Climbing in a Changing Climate</Heading>
            <Text
              fontSize="xl"
              fontWeight="500"
              color="headerText"
              pl="0.5rem"
              pt="1rem"
            >
              Navigating the Impact of Environmental Shifts on the Climbing
              Community
            </Text>
          </Box>
        </Box>
        {/* POSTS */}
        <Box h="1200px"></Box>
      </Box>
    </Box>
  );
}

export default App;
