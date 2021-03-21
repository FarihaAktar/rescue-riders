import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import ticket from '../../Data.folder/MOCK_DATA.json';
import Ticket from '../Ticket/Ticket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiking } from '@fortawesome/free-solid-svg-icons'


const Home = () => {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        setTickets(ticket);
    }, [])
    return (
        <div className="home">
            <Header></Header>
            <div className='head-line'>
                <h4>Choose Your Preferred Ri <FontAwesomeIcon  icon={faBiking} /> de</h4>
                <p>We are always here for your rescue</p>
            </div>
            <ul className="list">
                {
                    tickets.map(ticket => <Ticket ticket={ticket} key={ticket.id}></Ticket>)
                }
            </ul>
        </div>
    );
};

export default Home;