import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  Heading,
  Text,
  Button,
  useBreakpointValue,
  FormHelperText,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Divider from "./Divider";
import placeholderImage from "../assets/ondra.jpeg";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from "../utils/apiConfig";

const CreatePost = () => {
  const [postTitle, setpostTitle] = useState("Title");
  const [postText, setpostText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dignissim, libero vel consectetur scelerisque, purus justo ullamcorper elit, sed commodo nisl arcu vitae purus. In hac habitasse platea dictumst. Sed nec libero a nunc luctus rutrum. Nulla facilisi. Vivamus vel justo nec sem malesuada aliquet. Integer eleifend consectetur lectus vel consectetur. Cras feugiat tincidunt enim, vel vestibulum diam iaculis at. Integer tristique ipsum vel nisl iaculis, a aliquet tortor mollis. Sed quis lorem odio. Nullam nec sapien nulla. Sed in magna tellus. Vivamus eget erat libero. Ut non purus sit amet est rhoncus tincidunt. Integer viverra risus eu enim consectetur, nec convallis nunc ultricies...."
  );
  const [previewImage, setPreviewImage] = useState(`${placeholderImage}`);
  const [author, setAuthor] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`${API_URL}/posts/read/${postId}`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            referrerPolicy: "no-referrer",
          });
          if (!response.ok) {
            throw new Error();
          }
          const post = await response.json();
          post.createdAt = new Date(post.createdAt);

          setpostTitle(post.title);
          setpostText(post.text);
          setPreviewImage(post.img1);
          setLoading(false);
        } catch (error: any) {
          setError(error.message);
        }
      };
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    if (userName && userId) {
      setAuthor(userName);
      setId(userId);
    }
  }, []);

  useEffect(() => {
    const newDate = new Date();
    const dateString = newDate.toLocaleString("en-gb", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(dateString);
  }, []);

  const generatePreviewImage = (e: any) => {
    setFileError("");
    const input = e.target;
    if (input) {
      if (input.files && input.files[0]) {
        // check and feedback if image to big
        if (input.files[0].size > 2621440) {
          setFileError(
            "This file is too large, please uploade a smaller file."
          );
          e.target.value = "";
          return;
        }

        const reader = new FileReader();
        reader.onload = function (e: any) {
          if (e.target.result) {
            setPreviewImage(e.target.result);
          }
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", postTitle);
    formData.append("text", postText);
    formData.append("user", id);

    const imageInput = document.getElementById("image") as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
      formData.append("image", imageInput.files[0]);
    }

    const token = localStorage.getItem("token");

    try {
      let response;
      if (postId) {
        // update post
        response = await fetch(`${API_URL}/posts/update/${postId}`, {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          referrerPolicy: "no-referrer",
          body: formData,
        });
      } else {
        // create new post
        response = await fetch(`${API_URL}/posts/create`, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          referrerPolicy: "no-referrer",
          body: formData,
        });
      }

      if (!response.ok) {
        if (response.status === 401) {
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

      navigate("/posts/post-manager");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const smallScreen = useBreakpointValue({ base: true, md: false });

  if (loading) {
    return (
      <Flex justify="center" h="100vh" pt="20vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxW={smallScreen ? "90%" : "60%"} mx="auto">
          <Heading my={10}>{postId ? "Update" : "Create"} post</Heading>
          <Divider />

          <Flex direction="column" my={10} gap={5}>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                value={postTitle}
                onChange={(e) => setpostTitle(e.target.value)}
                bg="white"
              />
            </FormControl>
            <FormControl id="text" isRequired>
              <FormLabel>Text</FormLabel>
              <Textarea
                value={postText}
                onChange={(e) => setpostText(e.target.value)}
                bg="white"
                resize="none"
                h="500px"
              />
            </FormControl>
            <FormControl isRequired={postId ? false : true}>
              <FormLabel>Image</FormLabel>
              <Input
                id="image"
                type="file"
                accept="image/*"
                p={1}
                onChange={generatePreviewImage}
              />
              <FormHelperText>
                {postId && "Ignore if you want to keep original image"}
              </FormHelperText>
              {fileError && (
                <Text textAlign="center" mt={3} color="red">
                  {fileError}
                </Text>
              )}
            </FormControl>
          </Flex>

          <Heading my={10}>Preview</Heading>
          <Divider />
        </Box>

        <Flex
          maxW="1200px"
          mx="auto"
          mt={10}
          align="center"
          justify="center"
          direction="column"
        >
          <Image
            src={previewImage && previewImage}
            h="500px"
            w="100%"
            objectFit="cover"
            mt={10}
          ></Image>
          <Flex
            bg="lightBg"
            top="500px"
            maxW="800px"
            p={5}
            m={smallScreen ? "0" : 5}
            mt="-200px"
            justify="center"
            direction="column"
            gap={5}
          >
            <Flex direction="column" align="center" gap={5}>
              <Heading color="headerText">{postTitle && postTitle}</Heading>
              <Text>
                <strong>{author}</strong> - {date}
              </Text>
            </Flex>

            <Text fontSize="lg" whiteSpace="pre-wrap">
              {postText && postText}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column" maxW="60%" mx="auto" gap={5}>
          <Divider />
          <Flex align="center" justify="center" direction="column" gap={3}>
            <Button my={10} type="submit" colorScheme="teal">
              {postId ? "Update" : "Create"} post
            </Button>
            {error && (
              <Text textAlign="center" color="red">
                {error}
              </Text>
            )}
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default CreatePost;
