import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { AtSignIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { CommentI } from "../utils/interfaces";
import React from "react";

interface CommentProps {
  comment: CommentI;
  onEdit: (comment: CommentI) => void;
  onDelete: (comment: CommentI) => void;
}

const Comment = ({ comment, onEdit, onDelete }: CommentProps) => {
  const [user, setUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  const date = new Date(comment.createdAt);

  const handleEdit = () => {
    onEdit(comment);
  };

  const handleDelete = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) setUser(userId);
  });

  const confirmDelete = () => {
    onDelete(comment);
    setIsOpen(false);
  };

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
      {user === comment.user._id && (
        <Flex justify="flex-end" gap={10}>
          <Button size="xs" colorScheme="teal" onClick={handleEdit}>
            <Flex gap={3} align="center">
              <EditIcon boxSize={4} />
              <Text fontSize="xs">Edit</Text>
            </Flex>
          </Button>
          <Button size="xs" colorScheme="red" onClick={handleDelete}>
            <Flex gap={3} align="center">
              <DeleteIcon boxSize={4} />
              <Text fontSize="xs">Delete</Text>
            </Flex>
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Comment
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Flex>
      )}
    </Flex>
  );
};

export default Comment;
