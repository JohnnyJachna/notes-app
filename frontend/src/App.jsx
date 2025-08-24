import { Routes, Route } from "react-router";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import SetsPage from "./pages/SetsPage";
import EditorPage from "./pages/EditorPage";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-in/*" element={<AuthPage />} />
        <Route path="/sign-up" element={<AuthPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/sets" element={<SetsPage />} />
          <Route path="/sets/:setID" element={<EditorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
