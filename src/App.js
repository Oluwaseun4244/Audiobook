import "./App.css";
import Audio from "./Screen";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Audio />
    </ChakraProvider>
  );
}

export default App;
