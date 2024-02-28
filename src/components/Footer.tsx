import { Box, Flex, Text } from "@chakra-ui/react";
import Divider from "./Divider";

const Footer = () => {
  return (
    <Flex py={10} gap={10} direction="column" justify="space-around">
      <Flex direction="column" gap={3}>
        <Box>
          <Flex justify="space-evenly">
            <Text>Contact</Text>
            <Text>Terms of Use</Text>
            <Text>Privacy Policy</Text>
          </Flex>
        </Box>
        <Divider />
        <Text align="center" color="lightText">
          &#169; 2024 climbtribe.app. All Rights Reserved.
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;
