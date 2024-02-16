import { Box, Heading, Image, Text } from "@chakra-ui/react";
import image from "../assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";

const FeaturedPost = () => {
  return (
    <Box pos="relative">
      <Image src={image} h="500px" w="100%" objectFit="cover"></Image>
      <Box bg="lightBg" pos="absolute" bottom="0" p={5} m={5}>
        <Heading color="headerText">Climbing in a Changing Climate</Heading>
        <Text
          fontSize="xl"
          fontWeight="500"
          color="headerText"
          pl="0.5rem"
          pt="1rem"
        >
          Navigating the Impact of Environmental Shifts on the Climbing
          Community
        </Text>
      </Box>
    </Box>
  );
};

export default FeaturedPost;
