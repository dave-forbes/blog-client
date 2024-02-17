import { ChakraProvider, extendTheme } from "@chakra-ui/react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
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

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  );
}

// ReactDOM.render(
//   <ChakraProvider theme={theme}>
//     <Router />
//   </ChakraProvider>,
//   document.getElementById("root")
// );
