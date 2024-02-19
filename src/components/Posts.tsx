import { Grid, Box } from "@chakra-ui/react";
import PostCard from "./PostCard";
import FeaturedPost from "./FeaturedPost";

const Posts = () => {
  return (
    <>
      <Box as="section" my={10}>
        <FeaturedPost />
      </Box>
      <Box as="section" my={10}>
        <Grid
          m="4rem 0"
          templateColumns={
            window.innerWidth > 768
              ? "repeat(auto-fill, minmax(400px, 1fr))"
              : "repeat(auto-fill, minmax(320px, 1fr))"
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
