import { Box, Flex, GridItem, Heading, Text } from "@chakra-ui/react";

const PostCard = () => {
  return (
    <GridItem>
      <Flex
        direction="column"
        w="500px"
        h="300px"
        border="1px"
        align="center"
        justify="center"
        pos="relative"
      >
        <Box bg="headerText" w="100%" h="100%"></Box>
        <Flex
          pos="absolute"
          bg="lightBg"
          p={10}
          bottom="-70px"
          w="75%"
          direction="column"
          gap={4}
        >
          <Heading fontSize="1.5rem">Title of blog post.</Heading>
          <Text>
            An excerpt of the blog post, some more words until finally it cuts
            off with an ellipsis...
          </Text>
          <Text>author - date</Text>
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default PostCard;
