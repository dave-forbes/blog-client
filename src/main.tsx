import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ReactDOM from "react-dom";
import App from "./App";

// Define custom theme
const theme = extendTheme({
  fonts: {
    body: "inter, sans-serif", // Default font for body text
    heading: "Gilda Display, sans-serif", // Default font for headings
  },
  colors: {
    light: "rgb(254 253 251)",
    headerText: "#2e4456",
    borderColor: "#c9c8c8",
  },
});

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
