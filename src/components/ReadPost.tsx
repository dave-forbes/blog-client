import {
  Heading,
  Text,
  Image,
  Flex,
  useBreakpointValue,
  Spinner,
  Button,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { PostI } from "../utils/interfaces";
import { useEffect, useState } from "react";
import API_URL from "../utils/apiConfig";
import replaceElement from "../utils/replaceElement";
import parse from "html-react-parser";
import CommentSection from "./CommentSection";
import FetchError from "./FetchError";

const ReadPost = () => {
  const [post, setPost] = useState<PostI>();
  const [postLoading, setPostLoading] = useState(true);
  const { postId } = useParams();
  const [errorPost, setErrorPost] = useState("");
  const smallScreen = useBreakpointValue({ base: true, md: false });

  // fetch post

  const fetchPost = async () => {
    try {
      const response = await fetch(`${API_URL}/posts/read/${postId}`, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        referrerPolicy: "no-referrer",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch post, please try again later.");
      }
      const post = await response.json();
      post.createdAt = new Date(post.createdAt);
      setPost(post);
      setPostLoading(false);
    } catch (error: any) {
      setErrorPost(error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [errorPost]);

  if (errorPost) {
    return (
      <Flex justify="center" align="center" h="70vh" direction="column" gap={3}>
        <FetchError message={errorPost} />
        <Button onClick={() => setErrorPost("")}>Refresh</Button>
      </Flex>
    );
  }

  if (postLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Flex
        maxW="1200px"
        mx="auto"
        align="center"
        justify="center"
        direction="column"
      >
        <Image
          src={post && post.img1}
          h="500px"
          w="100%"
          objectFit="cover"
        ></Image>
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
            <Heading color="headerText">{post && post.title}</Heading>
            <Text>
              <strong>{post && post.user.username}</strong> -
              {post &&
                post.createdAt.toLocaleString("en-gb", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </Text>
          </Flex>
          {post && parse(post.text, { replace: replaceElement })}
        </Flex>
      </Flex>
      <CommentSection />
    </>
  );
};

export default ReadPost;
