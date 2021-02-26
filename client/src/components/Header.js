
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../auth/AuthContext'


const Header = (props) => {

    return(
        <AuthContext.Consumer>
            {(context) => (
                <Navbar bg="dark" variant="dark" sticky = "top">
                        <Navbar.Brand href="/rentacar">Rent-A-Car</Navbar.Brand>
                        <Nav className="mr-auto">
                            {!context.authUser && <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
                            {context.authUser && <Nav.Link as={NavLink} to="/login" onClick = {() => context.logoutUser()}>Logout</Nav.Link>}
                            {context.authUser && <Nav.Link as={NavLink} to="/rentBrowser">Your rentals</Nav.Link>}
                        </Nav>
                </Navbar>
            )}
        </AuthContext.Consumer>
);
}

export default Header;