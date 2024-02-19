import { Box, Flex, Text } from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";
import { CommentI } from "../interfaces";

interface CommentProps {
  comment: CommentI;
}

const Comment = ({ comment }: CommentProps) => {
  const date = new Date(comment.createdAt);

  return (
    <Box>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <AtSignIcon />
          <Text>
            <strong>{comment.user.username}</strong> -
          </Text>
        </Flex>
        <Text fontSize="xs">
          {date.toLocaleString("en-gb", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </Flex>
      <Text>{comment.text}</Text>
    </Box>
  );
};

export default Comment;
