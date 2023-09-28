import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { Link, useLocation } from "react-router-dom";
import AddProfiles from "./AddProfiles";
import ExportProfiles from "./ExportProfiles";
import internaltools from "../assets/internaltools.svg";

export default function NavbarComp() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="-mb-[65.23px]">
      <Navbar isBordered>
        <NavbarBrand>
          <Link to="/">
            <img
            src={internaltools}
            alt="BPPR Internal Tools"
            width="200"
            height="200"
             />
          </Link>
        </NavbarBrand>
        {isLoggedIn && (
          <>
            <NavbarContent className="hidden sm:flex gap-8">
              <NavbarItem isActive={isActive("/")}>
            <Link to="/">Home</Link>
          </NavbarItem>
          <NavbarItem isActive={isActive("/search")}>
            <Link to="/search">Search</Link>
          </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Button
                  className=""
                  as={Link}
                  color="primary"
                  href="/"
                  variant="flat"
                  onClick={logOutUser}
                >
                  Log Out
                </Button>
              </NavbarItem>
            </NavbarContent>
          </>
        )}
      </Navbar>
    </div>
  );
}
