import { Box, Flex, Text } from "@chakra-ui/react";
import { AtSignIcon } from "@chakra-ui/icons";

interface CommentProps {
  commentText: string;
}

const Comment = ({ commentText }: CommentProps) => {
  return (
    <Box>
      <Flex justify="space-between">
        <Flex align="center">
          <AtSignIcon />
          <Text>
            <strong>Username</strong>
          </Text>
        </Flex>
        <Text>Date</Text>
      </Flex>
      <Text>{commentText}</Text>
    </Box>
  );
};

export default Comment;
