import React, { useEffect, useState } from 'react';
import './Home.css';
import Header from '../Header/Header';
import ticket from '../../Data.folder/MOCK_DATA.json';
import Ticket from '../Ticket/Ticket';


const Home = () => {
    const [tickets, setTickets] = useState([]);
    useEffect(()=>{
        setTickets(ticket);
    },[])
    return (
        <div className="home">
            <Header></Header>
            <ul className="list">
                {
                    tickets.map(ticket => <Ticket ticket={ticket} key={ticket.id}></Ticket>)
                }
            </ul>
        </div>
    );
};

export default Home;