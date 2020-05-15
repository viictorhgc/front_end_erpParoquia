import { Navbar, Button, Container, Nav } from 'react-bootstrap';
import React from 'react';
import { isAuthenticated, getEmail } from "../../services/auth";
import { Link } from 'react-router-dom'

export default function Menu() {

    return (

        <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg" >>
            <Container>
                <Link to="/"><Navbar.Brand >ERP - Paroquia</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="pessoa">Pessoa</Nav.Link>
                        <Nav.Link as={Link} to="dizimo">Dizimo</Nav.Link>
                        <Nav.Link as={Link} to="tipofluxo">Tipos de Fluxo</Nav.Link>
                        <Nav.Link as={Link} to="formapagamento">Formas de Pagamento</Nav.Link>
                        <Nav.Link as={Link} to="pastoral">Pastorais</Nav.Link>
                        <Nav.Link as={Link} to="Campanha">Campanhas</Nav.Link>
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
                </Navbar.Collapse>
            </Container>
        </Navbar >

    );

}

