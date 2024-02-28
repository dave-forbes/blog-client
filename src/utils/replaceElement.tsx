import { Text, Heading, Box } from "@chakra-ui/react";

const replaceElement = (node: any) => {
  if (typeof node === "string") {
    return node; // Not a html element, return plain text
  }

  const { children, type, attribs } = node;

  switch (type) {
    case "tag":
      switch (node.name) {
        case "p":
          return (
            <Text>{children.map((child: any) => replaceElement(child))}</Text>
          );
        case "h1":
          return (
            <Heading as="h2" size="2xl">
              {children.map((child: any) => replaceElement(child))}
            </Heading>
          );
        case "h2":
          return (
            <Heading as="h2" size="xl">
              {children.map((child: any) => replaceElement(child))}
            </Heading>
          );
        case "h3":
          return (
            <Heading as="h3" size="lg">
              {children.map((child: any) => replaceElement(child))}
            </Heading>
          );
        case "h4":
          return (
            <Heading as="h4" size="md">
              {children.map((child: any) => replaceElement(child))}
            </Heading>
          );
        case "h5":
          return (
            <Heading as="h5" size="sm">
              {children.map((child: any) => replaceElement(child))}
            </Heading>
          );
        case "h6":
          return (
            <Heading as="h6" size="xs">
              {children.map((child: any) => replaceElement(child))}
            </Heading>
          );
        default:
          // If it's a non-standard HTML element, render it with a Box
          return (
            <Box as={node.name} {...attribs}>
              {children.map((child: any) => replaceElement(child))}
            </Box>
          );
      }
    case "text":
      return node.data; // Return text nodes
    default:
      return null; // Ignore other types of nodes
  }
};

export default replaceElement;
