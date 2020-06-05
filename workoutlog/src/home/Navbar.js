import React,{useState} from "react";
import {Navbar, NavbarBrand, Collapse, NavbarToggler, NavItem, Button,Nav} from "reactstrap";

const SiteBar = (props)=>{
    const [isOpen,setIsOpen] = useState(false);
    const toggle = ()=>{
        let newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
    }
    return(
    <Navbar color = "faded" light expand = "md">
        <NavbarBrand href = "/">Workout Log</NavbarBrand>
        <NavbarToggler onClick = {toggle} />
            <Collapse isOpen = {isOpen} navbar>
                <Nav className = "ml-auto" navbar>
                    <NavItem>
                        <Button onClick = {props.clickLogout}>Logout</Button>
                    </NavItem>
                </Nav>
            </Collapse>

    </Navbar>
    );
}

export default SiteBar;