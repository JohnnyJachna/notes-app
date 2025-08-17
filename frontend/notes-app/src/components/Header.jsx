import { Link } from "react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarLink,
  DarkThemeToggle,
} from "flowbite-react";

const Header = () => {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} to="/">
        <span>Notes App</span>
      </NavbarBrand>
      <Link to="/">
        <NavbarLink active={location.pathname === "/"} as="div">
          Home
        </NavbarLink>
      </Link>
      <Link to="/sets">
        <NavbarLink active={location.pathname === "/sets"} as="div">
          Sets
        </NavbarLink>
      </Link>
      <Link to="/about">
        <NavbarLink active={location.pathname === "/about"} as="div">
          About
        </NavbarLink>
      </Link>
      <DarkThemeToggle />
    </Navbar>
  );
};

export default Header;
