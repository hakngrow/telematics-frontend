import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DriverCard from './DriverCard';

class ShowDriverList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: []
    };
  }

  componentDidMount() {
    axios
      .get('http://hakngrow-telematics-backend.herokuapp.com/api/drivers')
      .then(res => {
        this.setState({
          drivers: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowDriverList');
      })
  };


  render() {
    const drivers = this.state.drivers;
    console.log("PrintDriver: " + drivers);
    let driverList;

    if(!drivers) {
      driverList = "There is no driver record!";
    } else {
      driverList = drivers.map((driver, k) =>
        <DriverCard driver= {driver} key={k}/>
      );
    }

    return (
      <div className="ShowDriverList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Drivers List</h2>
            </div>

            <div className="col-md-11">
              <Link to="/create-driver" className="btn btn-outline-warning float-right">
                + Add New Driver
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {driverList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowDriverList;
