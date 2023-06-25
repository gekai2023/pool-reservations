import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <Navbar bg="info" expand="lg" className="ml-auto">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-left" >
        {
          <Nav variant="underline" className="mr-auto" activeKey={window.location.pathname}>
            <Nav.Link href="/">דף ראשי</Nav.Link>
            <Nav.Link href="/request">בקשת אירוח</Nav.Link>
            <Nav.Link href="/reservations">מצב בקשות</Nav.Link>
            <Nav.Link href="/contact">צור קשר</Nav.Link>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
