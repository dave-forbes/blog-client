import { Box, Flex, Spacer, Link, Button, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box p={4} color="headerText">
      <Flex alignItems="center">
        <Box>
          <Link href="#" fontSize="xl" fontWeight="bold">
            <Heading>climbtribe</Heading>
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Link href="#" mr={4}>
            Sign Up
          </Link>
          <Button colorScheme="blue">Login</Button>
        </Box>
      </Flex>
      <Box borderTop="1px" borderColor="borderColor" opacity="0.5" m={4}></Box>
    </Box>
  );
};

export default Header;
