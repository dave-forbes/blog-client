import {
  Image,
  Flex,
  GridItem,
  Heading,
  Text,
  useBreakpointValue,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { UserI } from "../interfaces";

interface PostCardProps {
  title: string;
  text: string;
  user: UserI;
  createdAt: Date;
  _id: string;
  img1: string;
}

const PostCard = ({
  title,
  text,
  user,
  _id,
  createdAt,
  img1,
}: PostCardProps) => {
  const smallScreen = useBreakpointValue({ base: true, lg: false });

  const shortenedText = (string: string): string =>
    string.slice(0, 100).concat("...").replace("Introduction:", "").trim();

  const date = new Date(createdAt);

  const summary = shortenedText(text);

  return (
    <GridItem w="100%" h="100%">
      <LinkBox pos="relative">
        <LinkOverlay href={"/posts/" + _id}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            pos="relative"
          >
            <Image src={img1} w="100%" h="auto" objectFit="cover"></Image>
            <Flex
              pos="absolute"
              bg="lightBg"
              p={10}
              w="75%"
              bottom="-5px"
              direction="column"
              gap={4}
              align="center"
            >
              <Heading textAlign="center" fontSize="1.5rem">
                {title}
              </Heading>
              {!smallScreen ? (
                <>
                  <Text>{summary}</Text>
                  <Text>
                    <strong>{user.username}</strong> -{" "}
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
          </Flex>
        </LinkOverlay>
      </LinkBox>
    </GridItem>
  );
};

export default PostCard;
