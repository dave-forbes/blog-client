import { Grid } from "@chakra-ui/react";
import PostCard from "./PostCard";

const Posts = () => {
  return (
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
  );
};

export default Posts;
