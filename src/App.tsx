import { Button, Flex, Heading, Center, Spacer, Box } from "@chakra-ui/react";

function App() {
  return (
    <Box bg="light">
      <Center h="100vh">
        <Flex direction="column" gap="2">
          <Heading as="h1" size="4xl" color="headerText">
            WELCOME TO MY BLOG!
          </Heading>
          <Spacer />
          <Flex gap="4" align="center" justify="center">
            <Button colorScheme="cyan">Cyan</Button>
            <Button colorScheme="blackAlpha">BlackAlpha</Button>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
}

export default App;
