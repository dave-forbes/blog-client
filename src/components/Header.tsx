import { useState } from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  useBreakpointValue,
  Heading,
  Link,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Divider from "./Divider";
import { useAuth } from "../authContext";

interface HeaderProps {
  logout: () => void;
}

function Header({ logout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const showBurgerMenu = useBreakpointValue({ base: true, md: false });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const username = localStorage.getItem("userName");

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
        pt={4}
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
                <Button onClick={logout} colorScheme="blue">
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
        {isOpen && (
          <Flex align="center" w="100%" gap={5} direction="column" m={5}>
            {isLoggedIn ? (
              <Flex align="center" direction="column" gap={5}>
                <p>Logged In!</p>
                {/* You can also display an icon here if you prefer */}
                <Button onClick={logout} colorScheme="blue">
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
        )}
      </Flex>
      <Divider />
    </Box>
  );
}

export default Header;
