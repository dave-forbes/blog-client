import {
  Flex,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
  Tag,
  useBreakpointValue,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import { PostI } from "../utils/interfaces";
import { StarIcon } from "@chakra-ui/icons";

interface FeaturedPostProps {
  post: PostI | null;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  if (!post) {
    return null;
  }

  const date = new Date(post.createdAt);
  const smallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <LinkBox pos="relative">
      <Tag
        size="md"
        variant="solid"
        colorScheme="yellow"
        pos="absolute"
        top="0"
        left="0"
        m={3}
      >
        <TagLeftIcon boxSize="12px" as={StarIcon} />
        <TagLabel>Featured</TagLabel>
      </Tag>
      <LinkOverlay href={"/posts/" + post._id}>
        <Image src={post.img1} h="500px" w="100%" objectFit="cover"></Image>
        <Flex
          bg="lightBg"
          pos="absolute"
          bottom="0"
          p={5}
          m={5}
          align="baseline"
          gap={5}
        >
          <Heading color="headerText">{post.title}</Heading>
          <Flex align="baseline" gap={5}>
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
  );
};

export default FeaturedPost;
