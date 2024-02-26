import { Button, Flex, Text } from "@chakra-ui/react";
import { PostI } from "../interfaces";
import { Dispatch, SetStateAction, useState } from "react";

interface PostControlProps {
  post: PostI;
  posts: PostI[];
  setPosts: Dispatch<SetStateAction<PostI[]>>;
}

const PostControls = ({ posts, setPosts, post }: PostControlProps) => {
  const [error, setError] = useState("");
  const handlePublish = async (id: string) => {
    try {
      const response = await fetch(
        `https://blog-api-production-7c83.up.railway.app/posts/publish/${id}`,
        {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          referrerPolicy: "no-referrer",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Internal server error, please try again later.");
        } else {
          const data = await response.json();
          throw new Error(data.message);
        }
      }

      const updatedPosts = posts.map((post) => {
        if (post._id === id) {
          return { ...post, published: !post.published };
        }
        return post;
      });

      setPosts(updatedPosts);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <>
      <Flex gap={5} mb={10}>
        {post.published ? (
          <Button onClick={() => handlePublish(post._id)} colorScheme="orange">
            Unpublish
          </Button>
        ) : (
          <Button onClick={() => handlePublish(post._id)} colorScheme="green">
            Publish
          </Button>
        )}
        {post.featured ? (
          <Button colorScheme="yellow">UnFeature</Button>
        ) : (
          <Button colorScheme="pink">Feature</Button>
        )}
        <Button colorScheme="blue">Edit</Button>
        <Button colorScheme="red">Delete</Button>
      </Flex>
      {error && (
        <Text textAlign="center" mb={5} color="red">
          {error}
        </Text>
      )}
    </>
  );
};

export default PostControls;
