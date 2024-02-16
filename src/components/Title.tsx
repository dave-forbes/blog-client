import { Box, Heading, Text } from "@chakra-ui/react";

const Title = () => {
  return (
    <Box mx={4}>
      <Heading as="h1" size="4xl" color="headerText">
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
  );
};

export default Title;
