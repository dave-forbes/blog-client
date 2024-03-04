import {
  Button,
  Flex,
  FormControl,
  Text,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import API_URL from "../utils/apiConfig";
import { CommentI } from "../utils/interfaces";

interface CreateCommentProps {
  postId: string | undefined;
  fetchComments: () => Promise<void>;
  setCommentsLoading: () => void;
  commentToEdit: CommentI | undefined;
  cancelCommentToEdit: () => void;
}

const CreateCommentForm = ({
  postId,
  fetchComments,
  setCommentsLoading,
  commentToEdit,
  cancelCommentToEdit,
}: CreateCommentProps) => {
  const [error, setError] = useState<string | undefined>();
  const [commentText, setCommentText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Create a ref for the textarea

  useEffect(() => {
    if (commentToEdit && textareaRef.current) {
      textareaRef.current.focus();
    }
    if (commentToEdit) {
      setCommentText(commentToEdit.text);
    } else {
      setCommentText("");
    }
  }, [commentToEdit]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    const formData = {
      text: commentText,
      user: localStorage.getItem("userId"),
      post: postId,
    };

    const token = localStorage.getItem("token");

    let response;

    try {
      if (!commentToEdit) {
        response = await fetch(`${API_URL}/comments/create`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify(formData),
        });
      } else {
        response = await fetch(
          `${API_URL}/comments/update/${commentToEdit._id}`,
          {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(formData),
          }
        );
      }

      if (!response.ok) {
        console.log(response);
        if (response.status === 400) {
          setError("Comment text is required");
        } else if (response.status === 401) {
          setError("Unauthorized: Please log in.");
        } else {
          throw new Error("Server Error");
        }
      }

      setCommentsLoading();

      await fetchComments();

      setCommentText("");
      setError("");
      cancelCommentToEdit();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Box alignSelf="center">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Flex direction="column" w="300px" align="center" gap={3}>
            <Textarea
              ref={textareaRef}
              placeholder="Write a comment"
              resize="none"
              bg="white"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            ></Textarea>
            {commentToEdit ? (
              <>
                {error ? (
                  <Text>Error: {error}</Text>
                ) : (
                  <Text>Updating comment.</Text>
                )}
                <Flex gap={5}>
                  <Button type="submit" w="50%">
                    Submit
                  </Button>
                  <Button
                    colorScheme="red"
                    w="50%"
                    onClick={cancelCommentToEdit}
                  >
                    Cancel
                  </Button>
                </Flex>
              </>
            ) : (
              <Button type="submit" w="50%">
                Submit
              </Button>
            )}
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};

export default CreateCommentForm;
