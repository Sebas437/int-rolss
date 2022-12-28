import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

import './Navbar.css'

//Ponemos navbar1 porque navbar ya existe y asi no nos da problemas
const Navbar1 = () => {  
  
  return (
    <>
        <Navbar className='navBg' style={{backgroundColor: "#0575ED"}} expand="lg">
            <Container>
                <Navbar.Brand as={Link} to='/' className='brand'>CONTROL INGRESO</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1">
                        <Nav.Link className='a' as={Link} to='/'>Main</Nav.Link>
                        <Nav.Link className='a' as={Link} to='/empresas'>Empresas</Nav.Link>
                        <Nav.Link className='a' as={Link} to='/colaboradores'>Colaboradores</Nav.Link>
                        <Nav.Link className='a' as={Link} to='/ValidateColaborador'>ValidarCola</Nav.Link>
                        <Nav.Link className='a' as={Link} to='/validaok'>Validar</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        
    </>
  )
}

export default Navbar1