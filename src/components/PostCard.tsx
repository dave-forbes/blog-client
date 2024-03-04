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
import { PostI } from "../utils/interfaces";

interface PostCardProps {
  post: PostI;
}

const PostCard = ({ post }: PostCardProps) => {
  const smallScreen = useBreakpointValue({ base: true, lg: false });

  const date = new Date(post.createdAt);

  return (
    <GridItem w="100%" h="100%">
      <LinkBox pos="relative">
        <LinkOverlay href={"/posts/" + post._id}>
          <Flex
            direction="column"
            align="center"
            justify="center"
            pos="relative"
          >
            <Image src={post.img1} w="100%" h="400px" objectFit="cover"></Image>
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
                {post.title}
              </Heading>
              {!smallScreen && (
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
              )}
            </Flex>
          </Flex>
        </LinkOverlay>
      </LinkBox>
    </GridItem>
  );
};

export default PostCard;
