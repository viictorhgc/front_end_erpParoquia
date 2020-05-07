import { Navbar, Button, Container, Nav } from 'react-bootstrap';
import React from 'react';
import { isAuthenticated, getEmail } from "../../services/auth";
import { Link } from 'react-router-dom'

export default function Menu() {

    return (

        <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Container>
                <Link to="/"><Navbar.Brand href="#home">ERP - Paroquia</Navbar.Brand></Link>
                <Navbar.Toggle />
                <Nav className="mr-auto">
                    <Link to="pessoa"><Navbar.Text >Pessoa</Navbar.Text></Link>
                </Nav>
                {isAuthenticated() &&

                    <React.Fragment>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav>
                                <Nav.Link href="#home">Logado como: {getEmail()} </Nav.Link>
                                <Link to="/Logout" variant="outline-light"><Button variant="outline-light">Sair</Button></Link>
                            </Nav>
                        </Navbar.Collapse>
                    </React.Fragment>

                }

            </Container>
        </Navbar >

    );

}

