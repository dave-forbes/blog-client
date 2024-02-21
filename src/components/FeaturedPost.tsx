import {
  Box,
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import image from "../assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";
import { PostI } from "../interfaces";

interface FeaturedPostProps {
  post: PostI | null;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  if (!post) {
    return <Text> Unable to find featured post.</Text>;
  }
  const extractFirstSentence = (text: string): string => {
    const sentences = text.replace("Introduction:", "").split(".");
    const firstSentence = sentences[0].trim();
    return firstSentence;
  };
  const summary = extractFirstSentence(post.text);

  const date = new Date(post.createdAt);
  const smallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <LinkBox pos="relative">
      <LinkOverlay href={"/posts/" + post._id}>
        <Image src={image} h="500px" w="100%" objectFit="cover"></Image>
        <Box bg="lightBg" pos="absolute" bottom="0" p={5} m={5}>
          <Heading color="headerText">{post.title}</Heading>
          <Flex align="baseline" gap={5}>
            <Text
              fontSize="xl"
              fontWeight="500"
              color="headerText"
              pl="0.5rem"
              pt="1rem"
            >
              {summary + "..."}
            </Text>
            {!smallScreen ? (
              <>
                <Text>
                  <strong>{post.user.username}</strong> -{" "}
                  {date.toLocaleString("en-gb", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </>
            ) : (
              ""
            )}
          </Flex>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export default FeaturedPost;
