import React from 'react';
import './Home.css';
import frame1 from '../../images/frame-1.png';
import frame2 from '../../images/Frame-2.png';
import frame from '../../images/frame.png';
import group from '../../images/Group.png';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';


const Home = () => {
    return (
        <div className="home">
            <Header></Header>
            <ul className="list">
                <li>
                    <Link to={"/vehicle/" + 0}>
                        <img className="image-tag" src={frame} alt="" />
                        <h4>Bike</h4>
                    </Link>

                </li>
                <li>
                    <Link to={"/vehicle/" + 1}>
                        <img className="image-tag" src={frame2} alt="" />
                        <h4>Car</h4>
                    </Link>
                </li>
                <li>
                    <Link to={"/vehicle/" + 2}>
                        <img className="image-tag" src={frame1} alt="" />
                        <h4>Bus</h4>
                    </Link>
                </li>
                <li>
                    <Link to={"/vehicle/" + 3}>
                        <img className="image-tag" src={group} alt="" />
                        <h4>Train</h4>
                    </Link>
                </li>
            </ul>





        </div>
    );
};

export default Home;