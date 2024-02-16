import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Divider from "./Divider";

const Footer = () => {
  return (
    <Flex py={10} gap={10} direction="column" justify="space-around">
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
        <Divider />
        <Text align="center" color="lightText">
          @ All rights reserved, copyright bollocks...
        </Text>
      </Box>
    </Flex>
  );
};

export default Footer;
