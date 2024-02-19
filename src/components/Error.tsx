import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

const Error = () => {
  return (
    <Flex bg="lightBg" direction="column" h="100vh">
      <Box maxW="1200px" mx="auto" pt="73px">
        <Box as="section" my={10}>
          <Header isLoggedIn={false} logout={() => {}} />
        </Box>
      </Box>
      <Flex flex="1" direction="column" align="center" justify="center">
        <Heading>An error has occured...</Heading>
        <Text>
          <Link href="/">Click here</Link> to return to home.
        </Text>
      </Flex>
      <Box as="section" mt={10} bg="mediumBg">
        <Box maxW="1200px" mx="auto">
          <Footer />
        </Box>
      </Box>
    </Flex>
  );
};

export default Error;
