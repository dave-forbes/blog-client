import {
  Heading,
  Text,
  Image,
  Flex,
  Center,
  useBreakpointValue,
  SkeletonText,
} from "@chakra-ui/react";
import image from "../assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";
import Divider from "./Divider";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { PostI } from "../interfaces";
import { useEffect, useState } from "react";

const ReadPost = () => {
  const [post, setPost] = useState<PostI>();
  const [loading, setLoading] = useState(true);
  const { postId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://blog-api-production-7c83.up.railway.app/posts/read/${postId}`,
          {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            referrerPolicy: "no-referrer",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const post = await response.json();
        post.createdAt = new Date(post.createdAt);

        setPost(post);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
    fetchPosts();
  }, []);

  const smallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <Flex
        maxW="1200px"
        mx="auto"
        align="center"
        justify="center"
        direction="column"
      >
        <Image src={image} h="500px" w="100%" objectFit="cover"></Image>
        <Flex
          bg="lightBg"
          top="500px"
          maxW="800px"
          p={5}
          m={smallScreen ? "" : 5}
          mt="-200px"
          justify="center"
          direction="column"
          gap={5}
        >
          <Flex direction="column" align="center" gap={5}>
            <Heading color="headerText">{post ? post.title : ""}</Heading>
            <Text>
              <strong>{post ? post.user.username : ""}</strong> -
              {post
                ? post.createdAt.toLocaleString("en-gb", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </Text>
          </Flex>
          {/* <Text fontSize="xl" fontWeight="500" color="headerText">
            <em>
              Navigating the Impact of Environmental Shifts on the Climbing
              Community
            </em>
          </Text> */}
          <SkeletonText isLoaded={!loading} noOfLines={80} spacing="4">
            <Text fontSize="lg" whiteSpace="pre-wrap">
              {post ? post.text : ""}
            </Text>
          </SkeletonText>
        </Flex>
      </Flex>
      <Flex direction="column" maxW="1200px" mx="auto" gap={5}>
        <Divider />
        <Flex
          maxW="800px"
          p={5}
          mx="auto"
          justify="center"
          direction="column"
          gap={5}
        >
          <Center>
            <Heading fontSize="3xl">Comments</Heading>
          </Center>
          <Comment
            commentText={
              "A really long comment with lots of content, really just going on and on about how good this articale was and a bit more. Even more text added on now."
            }
          />
          <Comment commentText={"Shorter commemt."} />
        </Flex>
      </Flex>
    </>
  );
};

export default ReadPost;
