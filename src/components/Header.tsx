import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  useBreakpointValue,
  Heading,
  Link,
  Collapse,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Divider from "./Divider";
import { useAuth } from "../utils/authContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [username, setUsername] = useState<string | null>("");
  const [author, setAuthor] = useState(false);
  const showBurgerMenu = useBreakpointValue({ base: true, md: false });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    localStorage.removeItem("author");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      const username = localStorage.getItem("userName");
      const authorString = localStorage.getItem("author");
      const author = authorString ? JSON.parse(authorString) : false;
      setUsername(username);
      setAuthor(author);
    } else {
      setUsername(null);
      setAuthor(false);
    }
  }, [isLoggedIn]);

  return (
    <Box
      as="header"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={999}
      bg="lightBg"
      maxW="1200px"
      mx="auto"
    >
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        px={6}
        py={4}
        color="headerText"
      >
        <Box>
          <Box>
            <Link href="/" fontSize="xl" fontWeight="bold">
              <Heading>climbtribe</Heading>
            </Link>
          </Box>
        </Box>
        {showBurgerMenu ? (
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={toggleMenu}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Toggle navigation"
            bg="mediumBg"
          />
        ) : (
          <Box>
            {isLoggedIn ? (
              <Flex align="center" gap={5}>
                <p>Welcome back, {username}</p>
                {author && (
                  <>
                    <Link href="/posts/create-post">
                      <Button colorScheme="teal"> Create post </Button>
                    </Link>
                    <Link href="/posts/post-manager">
                      <Button colorScheme="purple"> Post Mananger </Button>
                    </Link>
                  </>
                )}
                <Button onClick={handleLogout} colorScheme="blue">
                  Logout
                </Button>
              </Flex>
            ) : (
              <>
                <Link href="/register" mr={4}>
                  <Button colorScheme="blue" variant="outline">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/log-in">
                  <Button colorScheme="blue">Login</Button>
                </Link>
              </>
            )}
          </Box>
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Flex align="center" w="100%" gap={5} direction="column" py={5}>
          {isLoggedIn ? (
            <Flex align="center" gap={5} direction="column">
              <p>Welcome back, {username}</p>
              {author && (
                <>
                  <Link href="/posts/create-post">
                    <Button colorScheme="teal"> Create post </Button>
                  </Link>
                  <Link href="/posts/post-manager">
                    <Button colorScheme="purple"> Post Mananger </Button>
                  </Link>
                </>
              )}
              <Button onClick={handleLogout} colorScheme="blue">
                Logout
              </Button>
            </Flex>
          ) : (
            <>
              <Link href="/register" textAlign="center">
                <Button colorScheme="blue" variant="outline">
                  Sign Up
                </Button>
              </Link>
              <Link href="/log-in" w="50%" textAlign="center">
                <Button colorScheme="blue">Login</Button>
              </Link>
            </>
          )}
        </Flex>
      </Collapse>

      <Divider />
    </Box>
  );
}

export default Header;
