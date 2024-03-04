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
import FetchError from "./FetchError";

const CommentSection = () => {
  const { isLoggedIn } = useAuth();
  const { postId } = useParams();
  const [comments, setComments] = useState<CommentI[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [errorComment, setErrorComment] = useState("");
  const smallScreen = useBreakpointValue({ base: true, md: false });
  const [commentToEdit, setCommentToEdit] = useState<CommentI>();
  const [errorDeleteComment, setErrorDeleteComment] = useState("");

  // fetch post comments

  const fetchComments = async () => {
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
      setErrorComment("");
    } catch (error: any) {
      setErrorComment(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // edit comment

  const handleEditComment = (comment: CommentI) => {
    setCommentToEdit(comment);
  };

  //delete comment

  const handleDeleteComment = async (commentToDelete: CommentI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/comments/delete/${commentToDelete._id}`,
        {
          method: "DELETE",
          mode: "cors",
          cache: "no-cache",
          referrerPolicy: "no-referrer",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Internal server error, please try again later."
            : response.status === 401
            ? `${response.status}: Unauthenticated, either not logged in or invalid login token.`
            : response.status === 403
            ? `${response.status}: Access forbidden, your login token was not valid.`
            : `${response.status}: Bad request.`
        );
      }
      const updatedComments = comments.filter(
        (comment) => comment._id !== commentToDelete._id
      );

      setComments(updatedComments);
      setErrorDeleteComment("");
    } catch (error: any) {
      setErrorDeleteComment(error.message);
    }
  };

  return (
    <Flex direction="column" maxW="1200px" mx="auto" gap={5}>
      <Divider />
      <Flex
        w={smallScreen ? "100%" : "70%"}
        p={smallScreen ? 1 : 5}
        mx="auto"
        justify="center"
        direction="column"
        gap={5}
      >
        <Flex direction="column" align="center" justify="center" gap={1}>
          <Heading fontSize="3xl">Comments</Heading>
        </Flex>
        {errorComment && (
          <Flex justify="center" align="center">
            <FetchError message={errorComment} />
          </Flex>
        )}
        {errorDeleteComment && (
          <Flex justify="center" align="center" direction="column">
            <FetchError
              message={`Cannot delete comment${errorDeleteComment}`}
            />
            <Button onClick={() => setErrorDeleteComment("")}>Refresh</Button>
          </Flex>
        )}
        {!errorComment && !errorDeleteComment && (
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
                        <Comment
                          comment={comment}
                          onEdit={handleEditComment}
                          onDelete={handleDeleteComment}
                        />
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
                commentToEdit={commentToEdit}
                cancelCommentToEdit={() => setCommentToEdit(undefined)}
              />
            ) : (
              <Flex direction="column" align="center" justify="center" gap={3}>
                <Text>You need to be logged in to write comments.</Text>
                <Link href="/log-in">
                  <Button>Log in</Button>
                </Link>
              </Flex>
            )}
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default CommentSection;
