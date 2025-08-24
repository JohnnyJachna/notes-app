import { Link, useLocation } from "react-router";
import {
  SignedIn,
  SignInButton,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import {
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarCollapse,
  NavbarToggle,
  DarkThemeToggle,
} from "flowbite-react";
import { CgNotes } from "react-icons/cg";

const Header = () => {
  const location = useLocation();

  return (
    <Navbar fluid rounded>
      <NavbarBrand>
        <CgNotes size="20" />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink
          as={Link}
          to="/sets"
          active={location.pathname.startsWith("/sets")}
        >
          <span className="text-base font-semibold text-gray-200 transition-colors hover:text-gray-50">
            Sets
          </span>
        </NavbarLink>
      </NavbarCollapse>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </Navbar>
  );
};

export default Header;
