import {
  Image,
  Flex,
  GridItem,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import image from "../assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";
import { UserI } from "../interfaces";

interface PostCardProps {
  title: string;
  text: string;
  user: UserI;
  createdAt: Date;
}

const PostCard = ({ title, text, user }: PostCardProps) => {
  const smallScreen = useBreakpointValue({ base: true, lg: false });

  const shortenedText = (string: string): string =>
    string.slice(0, 100).concat("...").replace("Introduction:", "").trim();

  const summary = shortenedText(text);

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
          <Heading fontSize="1.5rem">{title}</Heading>
          {!smallScreen ? (
            <>
              <Text>{summary}</Text>
              <Text>
                <strong>{user.username}</strong> - date
              </Text>
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
