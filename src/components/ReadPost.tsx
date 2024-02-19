import {
  Heading,
  Text,
  Image,
  Flex,
  useBreakpointValue,
  Spinner,
  Link,
  Button,
} from "@chakra-ui/react";
import image from "../assets/jef-willemyns-mluUYXoTotY-unsplash.jpg";
import Divider from "./Divider";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { PostI, CommentI } from "../interfaces";
import { useEffect, useState } from "react";
import { useAuth } from "../authContext";
import CreateCommentForm from "./CreateCommentForm";

const ReadPost = () => {
  const [post, setPost] = useState<PostI>();
  const [postLoading, setPostLoading] = useState(true);
  const [comments, setComments] = useState<CommentI[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const { postId } = useParams();
  const [error, setError] = useState(false);
  const { isLoggedIn } = useAuth();

  // fetch post

  useEffect(() => {
    const fetchPost = async () => {
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
        setPostLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchPost();
  }, []);

  // fetch post comments

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://blog-api-production-7c83.up.railway.app/comments/${postId}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          referrerPolicy: "no-referrer",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const comments = await response.json();
      comments.map((comment: CommentI) => {
        comment.createdAt = new Date(comment.createdAt);
      });
      setComments(comments);
      setCommentsLoading(false);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const smallScreen = useBreakpointValue({ base: true, md: false });

  if (postLoading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text>An error occured...</Text>
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

          <Text fontSize="lg" whiteSpace="pre-wrap">
            {post ? post.text : ""}
          </Text>
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
          <Flex direction="column" align="center" justify="center" gap={1}>
            <Heading fontSize="3xl">Comments</Heading>
          </Flex>
          {commentsLoading ? (
            <Flex justify="center" align="center" h="10vh">
              <Spinner size="xl" />
            </Flex>
          ) : (
            <>
              {comments.length !== 0 ? (
                <>
                  {comments.map((comment: CommentI) => (
                    <Comment key={comment._id} comment={comment} />
                  ))}
                </>
              ) : (
                <Text textAlign="center">No comments yet, be the first!</Text>
              )}
            </>
          )}
          {isLoggedIn ? (
            <CreateCommentForm postId={postId} fetchComments={fetchComments} />
          ) : (
            <Flex direction="column" align="center" justify="center" gap={3}>
              <Text>You need to be logged in to write comments.</Text>
              <Link href="/log-in">
                <Button>Log in</Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default ReadPost;
