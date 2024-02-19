import { Grid, Box, useBreakpointValue } from "@chakra-ui/react";
import PostCard from "./PostCard";
import FeaturedPost from "./FeaturedPost";
import { useEffect, useState } from "react";

const Posts = () => {
  const smallScreen = useBreakpointValue({ base: true, lg: false });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("your_api_endpoint_here");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
  }, []);

  return (
    <>
      <Box as="section" my={10}>
        <FeaturedPost />
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
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </Grid>
      </Box>
    </>
  );
};

export default Posts;
