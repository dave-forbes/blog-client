import {
  Box,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import image from "../assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";

interface FeaturePostProps {
  title: string;
  text: string;
}

const FeaturedPost = ({ title, text }: FeaturePostProps) => {
  // Function to extract the first sentence from the text
  const extractFirstSentence = (text: string): string => {
    // Split text by periods (.)
    const sentences = text.split(".");
    // Take the first sentence (remove leading/trailing whitespace)
    const firstSentence = sentences[0].trim();
    return firstSentence;
  };

  // Calculate summary
  const summary = extractFirstSentence(text);

  return (
    <LinkBox pos="relative">
      <LinkOverlay href="/posts/1">
        <Image src={image} h="500px" w="100%" objectFit="cover"></Image>
        <Box bg="lightBg" pos="absolute" bottom="0" p={5} m={5}>
          <Heading color="headerText">{title}</Heading>
          <Text
            fontSize="xl"
            fontWeight="500"
            color="headerText"
            pl="0.5rem"
            pt="1rem"
          >
            {summary}
          </Text>
        </Box>
      </LinkOverlay>
    </LinkBox>
  );
};

export default FeaturedPost;
