import { Toaster } from "react-hot-toast";
import "./App.css";
import AngelStory from "./routes/angelstory";

function App() {
  return (
    <>
      <AngelStory />
      <Toaster />
    </>
  );
}

export default App;
