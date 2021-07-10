import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const DriverCard = (props) => {
    const driver = props.driver;

    return(
        <div className="card-container">
            <div className="desc">
                <h2>
                    <Link to={`/show-driver/${driver._id}`}>
                        { driver.name }
                    </Link>
                </h2>
                <h3>{driver.driver_id}</h3>
                <p>{driver.vehicle_no}</p>
            </div>
        </div>
    )
};

export default DriverCard;