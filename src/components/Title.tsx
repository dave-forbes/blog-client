import { Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";

const Title = () => {
  const smallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Box mx={4}>
      <Heading
        as="h1"
        size="4xl"
        color="headerText"
        w={smallScreen ? "100%" : "70%"}
      >
        Are you obssesed with climbing as well?
      </Heading>
      <Text
        fontSize="xl"
        fontWeight="500"
        color="headerText"
        pl="0.5rem"
        pt="1rem"
      >
        Read some blog articles about climbing and join the discussion.
      </Text>
    </Box>
  );
};

export default Title;
