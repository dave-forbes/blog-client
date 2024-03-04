import { Button, Flex, Text } from "@chakra-ui/react";
import { AtSignIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { CommentI } from "../utils/interfaces";
import { useEffect, useState } from "react";

interface CommentProps {
  comment: CommentI;
  onEdit: (comment: CommentI) => void;
}

const Comment = ({ comment, onEdit }: CommentProps) => {
  const [user, setUser] = useState("");
  const date = new Date(comment.createdAt);

  const handleEdit = () => {
    onEdit(comment);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setUser(userId);
  });

  return (
    <Flex p={5} direction="column" gap={3}>
      <Flex justify="space-between" align="center">
        <Flex align="center" gap={1}>
          <AtSignIcon />
          <Text>
            <strong>{comment.user.username}</strong> -
          </Text>
        </Flex>
        <Flex gap={3}>
          <Text fontSize="xs">
            {date.toLocaleString("en-gb", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Flex>
      </Flex>
      <Text>{comment.text}</Text>
      {user == comment.user._id && (
        <Flex justify="flex-end" gap={10}>
          <Button size="xs" colorScheme="teal" onClick={handleEdit}>
            <Flex gap={3} align="center">
              <EditIcon boxSize={4} />
              <Text fontSize="xs">Edit</Text>
            </Flex>
          </Button>
          <Button size="xs" colorScheme="red">
            <Flex gap={3} align="center">
              <DeleteIcon boxSize={4} />
              <Text fontSize="xs">Delete</Text>
            </Flex>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Comment;
