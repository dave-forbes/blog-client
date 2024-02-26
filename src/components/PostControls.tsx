import { Button, Flex, Text } from "@chakra-ui/react";
import { PostI } from "../interfaces";
import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../apiConfig";

interface PostControlProps {
  post: PostI;
  posts: PostI[];
  setPosts: Dispatch<SetStateAction<PostI[]>>;
}

const PostControls = ({ posts, setPosts, post }: PostControlProps) => {
  const [error, setError] = useState("");
  const handlePublish = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/posts/publish/${id}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Internal server error, please try again later.");
        } else {
          const data = await response.json();
          throw new Error(data.message);
        }
      }

      // update buttons locally

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

  const handleFeatured = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/posts/feature/${id}`, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        referrerPolicy: "no-referrer",
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Internal server error, please try again later.");
        } else {
          const data = await response.json();
          throw new Error(data.message);
        }
      }

      // update buttons locally

      const updatedPosts = posts.map((post) => {
        if (post.featured) {
          return { ...post, featured: !post.featured };
        }
        if (post._id === id) {
          return { ...post, featured: !post.featured };
        }
        return post;
      });

      setPosts(updatedPosts);
      setError("");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    navigate(`/posts/create-post/${id}`);
  };

  const token = localStorage.getItem("token");

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/posts/delete/${id}`, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        referrerPolicy: "no-referrer",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Internal server error, please try again later.");
        } else if (response.status === 401) {
          throw new Error(
            `${response.status}: Unathenticated, either not logged in or invalid login token.`
          );
        } else if (response.status === 403) {
          throw new Error(
            `${response.status}: Access forbidden, your login token was not valid.`
          );
        } else {
          throw new Error(`${response.status}: Bad request.`);
        }
      }

      // update posts locally

      const updatedPosts = posts.filter((post) => post._id !== id);

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
          <Button colorScheme="yellow" disabled>
            Featured
          </Button>
        ) : (
          <Button onClick={() => handleFeatured(post._id)} colorScheme="pink">
            Feature
          </Button>
        )}
        <Button onClick={() => handleEdit(post._id)} colorScheme="blue">
          Edit
        </Button>
        <Button onClick={() => handleDelete(post._id)} colorScheme="red">
          Delete
        </Button>
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
