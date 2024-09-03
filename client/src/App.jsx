import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Login from "./pages/auth/Login";
import GenerateImage from "./pages/tools/GenerateIMage";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  return (

    <div className="flex flex-col">
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/image-generate" element={<GenerateImage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
