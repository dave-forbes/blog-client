import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import Router from "./router";

// Define custom theme
const theme = extendTheme({
  fonts: {
    body: "inter, sans-serif", // Default font for body text
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

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <Router />
  </ChakraProvider>,
  document.getElementById("root")
);
