import {
  Grid,
  Box,
  useBreakpointValue,
  Flex,
  Spinner,
  Button,
} from "@chakra-ui/react";
import PostCard from "./PostCard";
import FeaturedPost from "./FeaturedPost";
import { useEffect, useState } from "react";
import { PostI, FeaturedPostI } from "../utils/interfaces";
import API_URL from "../utils/apiConfig";
import FetchError from "./FetchError";

const Posts = () => {
  const smallScreen = useBreakpointValue({ base: true, lg: false });
  const [posts, setPosts] = useState<PostI[]>([]);
  const [featuredPost, setFeaturedPost] = useState<FeaturedPostI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          throw new Error("Failed to fetch posts, please try again later.");
        }
        const data = await response.json();

        // remove unpublished posts

        const filteredData = data.filter((post: PostI) => post.published);

        // Extract the featured post
        const featuredPostIndex = filteredData.findIndex(
          (post: { featured: FeaturedPostI }) => post.featured
        );
        const featuredPost =
          featuredPostIndex !== -1
            ? filteredData.splice(featuredPostIndex, 1)[0]
            : null;

        setPosts(filteredData);
        setFeaturedPost(featuredPost);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchPosts();
  }, [error]);

  if (error) {
    return (
      <Flex justify="center" align="center" h="50vh" direction="column" gap={3}>
        <FetchError message={error} />
        <Button onClick={() => setError("")}>Refresh</Button>
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
    <Box as="section">
      <Box as="section" my={10}>
        <FeaturedPost post={featuredPost} />
      </Box>
      <Box as="section" my={10}>
        <Grid
          m="4rem 0"
          templateColumns={
            !smallScreen
              ? "repeat(auto-fill, minmax(400px, 1fr))"
              : "repeat(auto-fill, minmax(300px, 1fr))"
          }
          gap="4rem"
          justifyItems="center"
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Posts;
