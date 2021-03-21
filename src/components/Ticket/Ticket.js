import React from 'react';
import { Link } from 'react-router-dom';


const Ticket = (props) => {
    const {id, vehicle, image} = props.ticket;
    const newId = id - 1;
    return (
        <div>
            <li>
                <Link to={"/vehicle/" + newId}>
                    <img className="image-tag" src={image} alt="" />
                    <h4>{vehicle}</h4>
                </Link>
            </li>
        </div>
    );
};

export default Ticket;