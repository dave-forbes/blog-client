import { Text } from "@chakra-ui/react";

interface FetchErrorProps {
  message: string;
}

const FetchError = ({ message }: FetchErrorProps) => {
  return <Text color="red">Error: {message}</Text>;
};

export default FetchError;
