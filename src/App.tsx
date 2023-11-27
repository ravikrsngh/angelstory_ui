import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/header";
import AngelStory from "./routes/angelstory";

function App() {
  return (
    <>
      <Header />
      <AngelStory />
      <Toaster />
    </>
  );
}

export default App;
