import { Box, Button, Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex p={10} gap={10} direction="column" justify="space-around">
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
  );
};

export default Footer;
