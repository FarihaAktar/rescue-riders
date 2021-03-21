import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css'


const Header = () => {
    const id = 1;
    const [loggedInUser] = useContext(UserContext);
    return (
        <Navbar collapseOnSelect expand="lg">
            <Navbar.Brand className='logo' href="#home">Rescue Riders</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="mr-auto">
                    <Link className="link" to="/home">Home</Link>
                    <Link className="link" to={"/vehicle/" + id}>Destination</Link>
                    <Link className="link" to="/home">Blog</Link>
                    <Link className="link" to="/home">Contact</Link>

                </Nav>
                <Nav>
                    {loggedInUser.email ? <p className='user-name'>{loggedInUser.displayName || loggedInUser.name}</p> : <Link to='/login'><button className="header-btn">Login</button></Link>}
                </Nav>
            </Navbar.Collapse>
        </Navbar>

    );
};

export default Header;