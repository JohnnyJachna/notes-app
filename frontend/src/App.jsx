import { Routes, Route } from "react-router";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SetsPage from "./pages/SetsPage";
import EditorPage from "./pages/EditorPage";
import DndPage from "./pages/DndPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/sets" element={<SetsPage />} />
        <Route path="/sets/:setID" element={<EditorPage />} />
        <Route path="/sets/:setID/dnd" element={<DndPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
