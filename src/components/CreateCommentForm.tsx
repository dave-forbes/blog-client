import {
  Button,
  Flex,
  FormControl,
  Text,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import API_URL from "../utils/apiConfig";

interface CreateCommentProps {
  postId: string | undefined;
  fetchComments: () => Promise<void>;
  setCommentsLoading: () => void;
}

const CreateCommentForm = ({
  postId,
  fetchComments,
  setCommentsLoading,
}: CreateCommentProps) => {
  const [error, setError] = useState<string | undefined>();
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    const formData = {
      text: commentText,
      user: localStorage.getItem("userId"),
      post: postId,
    };

    const token = localStorage.getItem("token");

    console.log(formData);
    console.log(token);

    try {
      const response = await fetch(`${API_URL}/comments/create`, {
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

      if (!response.ok) {
        if (response.status === 401) {
          setError("Unauthorized: Please log in.");
        } else {
          const data = await response.json();
          console.log(data);
          setError(data.message);
        }
        throw new Error("Server Error");
      }

      const data = await response.json();

      console.log(data);

      setCommentsLoading();

      await fetchComments();

      setCommentText("");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setError("An error occurred while processing your request.");
    }
  };

  if (error) {
    return <Text>An error occurred: {error}</Text>;
  }

  return (
    <Box alignSelf="center">
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Flex direction="column" w="300px" align="center" gap={3}>
            <Textarea
              placeholder="Write a comment"
              resize="none"
              bg="white"
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            ></Textarea>
            <Button type="submit" w="50%">
              Submit
            </Button>
          </Flex>
        </FormControl>
      </form>
    </Box>
  );
};

export default CreateCommentForm;
