import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import './Search.css';
import vehicle from '../../Data.folder/MOCK_DATA.json';
import { useParams } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import GoogleMap from '../GoogleMap/GoogleMap';
import DatePicker from 'react-date-picker'




const Search = () => {
    const { key } = useParams()
    const [value, onChange] = useState(new Date());
    const [newDataInfo, setNewDataInfo] = useState({})
    const [data, setData] = useState([]);
    const [submit, setSubmit] = useState(true)
    const [location, setLocation] = useState({
        place: '',
        destination: ''
    })
    useEffect(() => {
        setData(vehicle);
    }, [])

    const handleBlur = (e) => {
        const newLocationInfo = { ...location };
        newLocationInfo[e.target.name] = e.target.value;
        setLocation(newLocationInfo)
    }
    const handleClick = () => {
        if (location.place && location.destination) {
            setSubmit(false);
            // console.log(key, data[key])
            const newData = { ...data[key] }
            setNewDataInfo(newData);
        }
    }
    return (
        <div>
            <Header></Header>
            <hr />
            <div className='google-div'>
                <form className="search-form">
                    {submit ? <div>
                        <label htmlFor="">Pick From</label>
                        <br />
                        <input onBlur={handleBlur} className="search-text" type="text" name="place" required placeholder="Dhaka" />

                        <label className="label" htmlFor="">Pick To</label>
                        <br />
                        <input onBlur={handleBlur} className="search-text" type="text" name="destination" required placeholder="Mirpur" />
                        <br />
                        <div className="date">
                            <DatePicker
                                className="date-picker"
                                onChange={onChange}
                                value={value}
                            />
                        </div>
                        <input onClick={handleClick} className="search-btn" type="submit" value="Search" />
                    </div>
                        :
                        <div>
                            <h5>{location.place.toUpperCase()}</h5>
                            <p>To</p>
                            <h5>{location.destination.toUpperCase()}</h5>
                            <div className="vehicle-search">
                                <img src={newDataInfo.image} alt="" />
                                <p className='item'>{newDataInfo.vehicle}</p>
                                <p className='item'><FontAwesomeIcon icon={faUserFriends} /> {newDataInfo.passengerTwo}</p>
                                <p className='item'>${newDataInfo.priceForTwo}</p>
                            </div>
                            <div className="vehicle-search">
                                <img src={newDataInfo.image} alt="" />
                                <p className='item'>{newDataInfo.vehicle}</p>
                                <p className='item'><FontAwesomeIcon icon={faUserFriends} /> {newDataInfo.passengerFour}</p>
                                <p className='item'>${newDataInfo.priceForFour}</p>
                            </div>
                            <div className="vehicle-search">
                                <img src={newDataInfo.image} alt="" />
                                <p className='item'>{newDataInfo.vehicle}</p>
                                <p className='item'><FontAwesomeIcon icon={faUserFriends} /> {newDataInfo.passengerSix}</p>
                                <p className='item'>${newDataInfo.priceForSix}</p>
                            </div>
                        </div>}
                </form>
                <div className='google-map'>
                    <h5>GooGle Map</h5>
                    <GoogleMap />

                </div>
            </div>
        </div>
    );
};

export default Search;