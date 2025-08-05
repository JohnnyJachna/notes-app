import { Routes, Route } from "react-router";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/HomePage";
import Sets from "./pages/SetsPage";
import About from "./pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/sets" element={<Sets />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
