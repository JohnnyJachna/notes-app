import { Link, useLocation } from "react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarLink,
  NavbarCollapse,
  NavbarToggle,
  DarkThemeToggle,
} from "flowbite-react";

const Header = () => {
  const location = useLocation();

  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} to="/">
        <span>Notes App</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} to="/" active={location.pathname === "/"}>
          Home
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/sets"
          active={location.pathname.startsWith("/sets")}
        >
          Sets
        </NavbarLink>
        <NavbarLink
          as={Link}
          to="/about"
          active={location.pathname === "/about"}
        >
          About
        </NavbarLink>
      </NavbarCollapse>

      <DarkThemeToggle />
    </Navbar>
  );
};

export default Header;
