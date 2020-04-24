import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Form, Button, FormGroup, FormControl, ControlLabel, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styled from 'styled-components'; 
import Switch from "react-switch";

const Styles = styled.div`
  .navbar {
    background: linear-gradient(to right, #191970, #1E90FF 99%);
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }

    .react-switch {
    margin-top:5px;
}
`;

class NavgationBar extends React.Component {

    render() {
        return (
            <Styles>
                <Navbar style={{ minWidth: 960 }}>

                    <Form inline>
                        <FormControl type="text" placeholder="Enter keywords .." className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>

                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/World">World</Nav.Link>
                        <Nav.Link href="/Politics">Politics</Nav.Link>
                        <Nav.Link href="/Business">Business</Nav.Link>
                        <Nav.Link href="/Technology">Technology</Nav.Link>
                        <Nav.Link href="/Sports">Sports</Nav.Link>
                    </Nav>
                </Navbar>
            </Styles>
        )
    }
}

export default NavgationBar;
