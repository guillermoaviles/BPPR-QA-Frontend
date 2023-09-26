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
import { Link } from "react-router-dom";
import AddProfiles from "./AddProfiles";
import ExportProfiles from "./ExportProfiles";

export default function NavbarComp() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div>
      <Navbar isBordered>
        <NavbarBrand>
          <Link to="/">
            <b>
              <p>BPPR</p>
            </b>
          </Link>
        </NavbarBrand>
        {isLoggedIn && (
          <>
            <NavbarContent className="hidden sm:flex gap-8">
              <NavbarItem>
                <Link to="#">Profile</Link>
              </NavbarItem>
              <NavbarItem>
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
