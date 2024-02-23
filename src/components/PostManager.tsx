import { useEffect, useState } from "react";
import { Box, Flex, Grid, Spinner, Text, Button } from "@chakra-ui/react";
import { PostI } from "../interfaces";
import PostCard from "./PostCard";

const PostManager = () => {
  const [posts, setPosts] = useState<PostI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://blog-api-production-7c83.up.railway.app/posts",
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
        const data = await response.json();

        setPosts(data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchPosts();
  }, []);

  if (error) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text>
          An error occured, failed to find posts, please try again later.
        </Text>
      </Flex>
    );
  }

  if (loading) {
    return (
      <Flex justify="center" h="100vh" pt="20vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Box as="section" my={10}>
        <Grid m="4rem 0" templateColumns="1fr" justifyItems="center">
          {posts.map((post) => (
            <>
              <PostCard key={post._id} {...post} />
              <Flex gap={5} mb={10}>
                {post.published ? (
                  <Button colorScheme="orange">Unpublish</Button>
                ) : (
                  <Button colorScheme="green">Unpublish</Button>
                )}
                {post.featured ? (
                  <Button colorScheme="yellow">UnFeature</Button>
                ) : (
                  <Button colorScheme="pink">Feature</Button>
                )}
                <Button colorScheme="blue">Edit</Button>
                <Button colorScheme="red">Delete</Button>
              </Flex>
            </>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default PostManager;
