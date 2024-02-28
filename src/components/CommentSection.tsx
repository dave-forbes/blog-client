import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CommentI } from "../utils/interfaces";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
import { useAuth } from "../utils/authContext";
import { useParams } from "react-router-dom";
import API_URL from "../utils/apiConfig";
import { useEffect, useState } from "react";

interface CommentSectionPros {
  errorPost: Boolean;
}

const CommentSection = ({ errorPost }: CommentSectionPros) => {
  const { isLoggedIn } = useAuth();
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentI[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [errorComment, setErrorComment] = useState(false);
  const smallScreen = useBreakpointValue({ base: true, md: false });

  // fetch post comments

  const fetchComments = async () => {
    if (!errorPost) {
      try {
        const response = await fetch(`${API_URL}/comments/${postId}`, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          referrerPolicy: "no-referrer",
        });
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
        setErrorComment(true);
      }
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <Flex direction="column" maxW="1200px" mx="auto" gap={5}>
      <Divider />
      <Flex
        w={smallScreen ? "100%" : "70%"}
        p={5}
        mx="auto"
        justify="center"
        direction="column"
        gap={5}
      >
        <Flex direction="column" align="center" justify="center" gap={1}>
          <Heading fontSize="3xl">Comments</Heading>
        </Flex>
        {!errorComment ? (
          <>
            {commentsLoading ? (
              <Flex justify="center" align="center" h="10vh">
                <Spinner size="xl" />
              </Flex>
            ) : (
              <>
                {comments.length !== 0 ? (
                  <>
                    {comments.map((comment: CommentI) => (
                      <Box key={comment._id}>
                        <Divider />
                        <Comment comment={comment} />
                        <Divider />
                      </Box>
                    ))}
                  </>
                ) : (
                  <Text textAlign="center">No comments yet, be the first!</Text>
                )}
              </>
            )}
            {isLoggedIn ? (
              <CreateCommentForm
                postId={postId}
                fetchComments={fetchComments}
                setCommentsLoading={() => setCommentsLoading(true)}
              />
            ) : (
              <Flex direction="column" align="center" justify="center" gap={3}>
                <Text>You need to be logged in to write comments.</Text>
                <Link href="/log-in">
                  <Button>Log in</Button>
                </Link>
              </Flex>
            )}{" "}
          </>
        ) : (
          <Flex justify="center" align="center" h="100vh">
            <Text>An error occured, cannot find comments.</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default CommentSection;
