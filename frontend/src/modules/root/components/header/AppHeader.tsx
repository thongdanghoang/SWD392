import styles from "./AppHeader.module.scss";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';  
import Logo from '../../../../assets/img/Logo.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Search } from 'react-bootstrap-icons';
// import { FormControl } from 'react-bootstrap';

export default function AppHeader() {
  return (
    <div>
          <Navbar expand="lg" className={styles.appHeader}>
            <Container>
              {/* Logo */}
              <Navbar.Brand href="#home"><img src={Logo} alt="" /></Navbar.Brand>
              {/*  */}
              {/* Search */}
              <Form className={styles.search}>
                <InputGroup className="mb-2">
                  <InputGroup.Text><Search className="bi bi-search"/></InputGroup.Text>
                  <Form.Control aria-label="Text input with checkbox" size="sm"/>
                </InputGroup>
              </Form>
              {/*  */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
    </div>
  );
}