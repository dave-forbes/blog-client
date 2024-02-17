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

interface HeaderProps {
  isLoggedIn: boolean;
  logout: () => void;
}

function Header({ isLoggedIn, logout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const showBurgerMenu = useBreakpointValue({ base: true, md: false });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
                <p>Logged In!</p>
                <Button onClick={logout} colorScheme="blue">
                  Logout
                </Button>
              </Flex>
            ) : (
              <>
                <Link href="/register" mr={4}>
                  Sign Up
                </Link>
                <Link href="/log-in">
                  <Button colorScheme="blue">Login</Button>
                </Link>
              </>
            )}
          </Box>
        )}
        {/* Render menu items */}
        {isOpen && (
          <Flex align="center" w="100%" gap={5} direction="column" m={5}>
            <Link w="50%" href="#" mr={4} textAlign="center">
              Sign Up
            </Link>
            <Button w="50%" colorScheme="blue">
              Login
            </Button>
          </Flex>
        )}
      </Flex>
      <Divider />
    </Box>
  );
}

export default Header;
