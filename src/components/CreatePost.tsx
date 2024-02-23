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
  Link,
  Button,
  Center,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Divider from "./Divider";
import placeholderImage from "../assets/ondra.jpeg";

const CreatePost = () => {
  const [postTitle, setpostTitle] = useState("Title");
  const [postText, setpostText] = useState(
    "Beta dyno mantle, crux campus jug sloper. Smearing heelhook gaston, arete friction edging. Stemjam crimp bouldering, jumar gneiss crux heelhook. Dyno crux sloper, mantle heelhook beta dyno. Friction jug campus, sloper crimp dyno mantle. Stemjam smearing jug, dyno heelhook bouldering gneiss. Mantle campus crimp, sloper heelhook jug dyno. Edging friction bouldering, crux mantle gaston jug. Dyno heelhook smearing, gneiss sloper bouldering crimp. Beta crux jug, campus mantle dyno smearing. Heelhook sloper crimp, jug edging gaston mantle. Bouldering friction dyno, heelhook sloper crux jug. Smearing mantle campus, crimp gaston dyno edging..."
  );
  const [previewImage, setPreviewImage] = useState(`${placeholderImage}`);
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setAuthor(userName);
    }
  });

  useEffect(() => {
    const newDate = new Date();
    const dateString = newDate.toLocaleString("en-gb", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDate(dateString);
  });

  const generatePreviewImage = (e: any) => {
    const input = e.target;
    if (input) {
      if (input.files && input.files[0]) {
        console.log(input.files);
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

  return (
    <>
      <Box maxW="60%" mx="auto">
        <Heading my={10}>Create post</Heading>
        <Divider />
        <form>
          <Flex direction="column" mt={10} gap={5}>
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
            <FormControl id="image" isRequired>
              <FormLabel>Image</FormLabel>
              <Input type="file" p={1} onChange={generatePreviewImage} />
            </FormControl>
          </Flex>
        </form>
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
          m={5}
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
      <Flex direction="column" maxW="1200px" mx="auto" gap={5}>
        <Divider />
        <Center>
          <Link href="/posts/post-manager">
            <Button colorScheme="green">Create Post</Button>
          </Link>
        </Center>
      </Flex>
    </>
  );
};

export default CreatePost;
