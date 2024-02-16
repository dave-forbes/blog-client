import { Heading, Box, Text, Grid, Flex, Button } from "@chakra-ui/react";
import Header from "./components/Header";
import FeaturedPost from "./components/FeaturedPost";
import PostCard from "./components/PostCard";

function App() {
  return (
    <Box bg="lightBg">
      <Box maxW="1200px" mx="auto">
        {/* HEADER */}
        <Header />
        {/* TITLE */}
        <Box m={4}>
          <Heading as="h1" size="4xl" color="headerText" w={[600, 700, 800]}>
            Are you obssesed with climbing as well?
          </Heading>
          <Text
            fontSize="xl"
            fontWeight="500"
            color="headerText"
            pl="0.5rem"
            pt="1rem"
          >
            Read some blog articles about climbing.
          </Text>
        </Box>
        {/* DIVIDER */}
        <Box
          borderTop="1px"
          borderColor="borderColor"
          opacity="0.5"
          m={4}
        ></Box>
        {/* FEATURED POST */}
        <FeaturedPost />
        {/* POSTS */}
        <Grid
          p="4rem 2rem"
          templateColumns="repeat(auto-fit, minmax(400px, 1fr))"
          // templateColumns="1fr 1fr"
          gap="4rem"
          justifyItems="center"
        >
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </Grid>
        {/* Footer */}
        <Flex
          h="300px"
          bg="mediumBg"
          direction="column"
          justify="space-around"
          mt={10}
        >
          <Box>
            <Flex justify="center">
              <p>Sign up to our newsletter</p>
              <input></input>
              <Button>Sign up</Button>
            </Flex>
          </Box>
          <Box>
            <Box>
              <Flex justify="space-evenly">
                <Text>Overview</Text>
                <Text>Licence</Text>
                <Text>Documentation</Text>
                <Text>Social</Text>
              </Flex>
            </Box>
            <Box
              borderTop="1px"
              borderColor="borderColor"
              opacity="0.5"
              m="10px 0"
              w="90%"
              mx="auto"
            ></Box>
            <Text align="center" color="lightText">
              @ All rights reserved, copyright bollocks...
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default App;
