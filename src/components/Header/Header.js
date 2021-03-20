import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand href="#home">Rescue Riders</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                    <Link className="link" to="/home">Home</Link>
                    <Link className="link" to="/search">Destination</Link>
                    <Link className="link" to="/home">Blog</Link>
                    <Link className="link" to="/home">Contact</Link>

                </Nav>
                <Nav>
                    {loggedInUser.email ? <p>{loggedInUser.displayName}</p> :<button className="header-btn">Login</button>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
};

export default Header;