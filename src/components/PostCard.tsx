import { Image, Flex, GridItem, Heading, Text } from "@chakra-ui/react";
import image from "../assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";

const PostCard = () => {
  return (
    <GridItem w="100%" h="100%">
      <Flex direction="column" align="center" justify="center" pos="relative">
        <Image src={image} w="100%" h="auto" objectFit="cover"></Image>
        <Flex
          pos="absolute"
          bg="lightBg"
          p={10}
          w="75%"
          bottom="-5px"
          direction="column"
          gap={4}
        >
          <Heading fontSize="1.5rem">Title of blog post.</Heading>
          {window.innerWidth > 768 ? (
            <>
              <Text>
                An excerpt of the blog post, some more words until finally it
                cuts off with an ellipsis...
              </Text>
              <Text>author - date</Text>
            </>
          ) : (
            ""
          )}
        </Flex>
      </Flex>
    </GridItem>
  );
};

export default PostCard;
