import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createRoot } from "react-dom/client";
import Router from "./components/router";
import { AuthProvider } from "./utils/authContext";

// Define custom theme
const theme = extendTheme({
  fonts: {
    body: "Gilda Display, sans-serif", // Default font for body text
    heading: "Gilda Display, sans-serif", // Default font for headings
  },
  colors: {
    lightBg: "rgb(254 253 251)",
    mediumBg: "rgb(250 246 240)",
    headerText: "#2e4456",
    borderColor: "#c9c8c8",
    lightText: "#686868",
  },
});

const root = createRoot(document.getElementById("root") as Element);
root.render(
  <ChakraProvider theme={theme}>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </ChakraProvider>
);
