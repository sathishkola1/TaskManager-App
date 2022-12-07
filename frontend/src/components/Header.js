import { Col,Form , Navbar, Nav, Container, Row, NavDropdown, Spinner } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
function Header(){
    return(
        <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container fluid>
                <LinkContainer to='/'>
                    <Navbar.Brand>Task Manager</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">                                
                                <Nav className="ml-auto">
                                    <LinkContainer to='/register'>
                                    <Nav.Link >Register</Nav.Link>
                                    </LinkContainer>
                                    <LinkContainer to='/login'>
                                    <Nav.Link >Login</Nav.Link>
                                    </LinkContainer>
                                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    )
}
export default Header