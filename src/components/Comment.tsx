import { Flex, Text } from "@chakra-ui/react";
import { AtSignIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { CommentI } from "../utils/interfaces";
import { useEffect, useState } from "react";

interface CommentProps {
  comment: CommentI;
}

const Comment = ({ comment }: CommentProps) => {
  const [user, setUser] = useState("");
  const date = new Date(comment.createdAt);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setUser(userId);
  });

  return (
    <Flex p={5} direction="column" gap={2}>
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
          {user == comment.user._id && (
            <Flex gap={3}>
              <DeleteIcon boxSize={6} />
              <EditIcon boxSize={6} />
            </Flex>
          )}
        </Flex>
      </Flex>
      <Text>{comment.text}</Text>
    </Flex>
  );
};

export default Comment;
