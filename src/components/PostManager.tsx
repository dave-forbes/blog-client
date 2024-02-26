import { useEffect, useState } from "react";
import { Box, Flex, Grid, Spinner, Text } from "@chakra-ui/react";
import { PostI } from "../interfaces";
import PostCard from "./PostCard";
import PostControls from "./PostControls";
import API_URL from "../apiConfig";

const PostManager = () => {
  const [posts, setPosts] = useState<PostI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          referrerPolicy: "no-referrer",
        });
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
            <Flex key={post._id} direction="column" w="100%" align="center">
              <PostCard {...post} />
              <PostControls posts={posts} setPosts={setPosts} post={post} />
            </Flex>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default PostManager;
