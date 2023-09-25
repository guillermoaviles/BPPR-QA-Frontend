import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from '@nextui-org/react'
import { Link } from 'react-router-dom';

export default function NavbarComp() {
    return (
        <div>
            <Navbar isBlurred>
                <NavbarBrand>
                    <p>BPPR</p>
                </NavbarBrand>
                <NavbarItem>
                    <Button className="" as={Link} color="primary" href="/" variant="flat">Log Out</Button>
                </NavbarItem>
            </Navbar>
        </div>
    )
}