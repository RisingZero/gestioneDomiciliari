import React from 'react';
import { Navbar } from 'react-bootstrap';
import {
    UncontrolledCollapse,
    UncontrolledDropdown,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    Badge
} from 'reactstrap';

export default function Navigation(props) {

    const { handleLogout, setPage } = props;

    return (
        <div className="navigation-wrapper">
          <Navbar bg="default" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand>Software gestione domiciliari</Navbar.Brand>
                <button
                    aria-controls="navbar-default"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-default"
                    data-toggle="collapse"
                    id="navbar-default"
                    type="button"
                    >
                    <span className="navbar-toggler-icon" />
                </button>
              <UncontrolledCollapse navbar toggler="#navbar-default">
                <div className="navbar-collapse-header">
                  <Row>
                    <Col className="collapse-brand" xs="6">
                      Gestione domiciliari
                    </Col>
                    <Col className="collapse-close" xs="6">
                      <button
                        aria-controls="navbar-default"
                        aria-expanded={false}
                        aria-label="Toggle navigation"
                        className="navbar-toggler"
                        data-target="#navbar-default"
                        data-toggle="collapse"
                        id="navbar-default"
                        type="button"
                      >
                        <span />
                        <span />
                      </button>
                    </Col>
                  </Row>
                </div>
                <Nav className="ml-lg-auto" navbar>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      onClick={e => {
                        e.preventDefault();
                        setPage('pazienti');
                      }}
                    >
                      <i className="fa fa-medkit" />
                      <span className="nav-link-inner--text d-lg-none pl-2">
                        Pazienti
                      </span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className="nav-link-icon"
                      onClick={e => {
                        e.preventDefault();
                        setPage('medici');
                      }}
                    >
                      <i className="fa fa-user-md" />
                      <span className="nav-link-inner--text d-lg-none pl-2">
                        Medici
                      </span>
                    </NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav>
                    <NavLink
                      aria-expanded={false}
                      aria-haspopup={true}
                      className="nav-link-icon"
                      onClick={handleLogout}
                      role="button"
                    >
                      <Badge
                        className="badge-warning"
                        onClick={handleLogout}
                      > Logout </Badge>
                    </NavLink>
                  </UncontrolledDropdown>
                </Nav>
              </UncontrolledCollapse>
            </Container>      
          </Navbar>
        </div>
    );
}