import { Outlet, Link, Navigate } from "react-router";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import Header from "../components/Header";
import AppFooter from "../components/AppFooter";

import { Button, createTheme, ThemeProvider } from "flowbite-react";

const theme = createTheme({
  button: {
    color: {
      editor:
        "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700",
      editorActive:
        "bg-indigo-600 dark:bg-indigo-500 text-white border border-indigo-600 dark:border-indigo-500",
    },
    size: {
      xs: "px-2 py-1 text-xs",
    },
  },
});

const MainLayout = () => {
  return (
    // <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    //   <ThemeProvider theme={theme}>
    //     <Header />
    //     <main className="flex-1">
    //       <Outlet />
    //     </main>
    //     <AppFooter />
    //   </ThemeProvider>
    // </div>
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <ThemeProvider theme={theme}>
        <main className="flex-1">
          <SignedOut>
            <div className="flex min-h-[70vh] items-center justify-center p-4">
              <SignIn fallbackRedirectUrl="/sets" />
            </div>
          </SignedOut>
          <SignedIn>
            <Header />
            <Outlet />
          </SignedIn>
        </main>
        <AppFooter />
      </ThemeProvider>
    </div>
  );
};

export default MainLayout;
