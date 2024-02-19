import { Grid, Box, useBreakpointValue } from "@chakra-ui/react";
import PostCard from "./PostCard";
import FeaturedPost from "./FeaturedPost";
import { useEffect, useState } from "react";
import { PostI, FeaturedPostI, UserI } from "../interfaces";

const Posts = () => {
  const smallScreen = useBreakpointValue({ base: true, lg: false });
  const [posts, setPosts] = useState<PostI[]>([]);
  const [featuredPost, setFeaturedPost] = useState<FeaturedPostI | null>(null);

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

        // Find the index of the featured post
        const featuredPostIndex = data.findIndex(
          (post: { featured: FeaturedPostI }) => post.featured
        );

        // Extract the featured post
        const featuredPost =
          featuredPostIndex !== -1
            ? data.splice(featuredPostIndex, 1)[0]
            : null;

        // Set the posts state without the featured post
        setPosts(data);
        console.log(data);

        // Set the featured post state
        setFeaturedPost(featuredPost);
        console.log(featuredPost);
        return data;
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <Box as="section" my={10}>
        <FeaturedPost
          title={featuredPost ? featuredPost.title : ""}
          text={featuredPost ? featuredPost.text : ""}
        />
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
            <PostCard key={post._id} {...post} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Posts;
