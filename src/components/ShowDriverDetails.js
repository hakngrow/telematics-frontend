import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class showDriverDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: {}
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://hakngrow-telematics-backend.herokuapp.com/api/drivers/'+this.props.match.params.id)
      .then(res => {
        // console.log("Print-showDriverDetails-API-response: " + res.data);
        this.setState({
          driver: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowDriverDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/driversd/' + id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowDriverDetails_deleteClick");
      })
  };


  render() {

    const driver = this.state.driver;
    let DriverItem = <div>
      <table className="table table-hover table-dark">
        {/* <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead> */}
        <tbody>
        <tr>
            <th scope="row">1</th>
            <td>Driver Id</td>
            <td>{ driver.driver_id }</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Name</td>
            <td>{ driver.name }</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Vehicle No.</td>
            <td>{ driver.vehicle_no }</td>
          </tr>
          <tr>
            <th scope="row">4</th>
            <td>Status</td>
            <td>{ driver.status }</td>
          </tr>
          <tr>
            <th scope="row">5</th>
            <td>Phone  No.</td>
            <td>{ driver.phone_no }</td>
          </tr>
          <tr>
            <th scope="row">6</th>
            <td>Phone Model</td>
            <td>{ driver.phone_model }</td>
          </tr>
          <tr>
            <th scope="row">7</th>
            <td>SmartDrive Login</td>
            <td>{ driver.smartdrive_login }</td>
          </tr>
          <tr>
            <th scope="row">8</th>
            <td>SmartDrive Password</td>
            <td>{ driver.smartdrive_password }</td>
          </tr>
          <tr>
            <th scope="row">9</th>
            <td>Updated</td>
            <td>{ driver.updated_date }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowDriverDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Show Driver List
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Driver's Record</h1>
              <p className="lead text-center">
                  View Driver's Info
              </p>
              <hr /> <br />
            </div>
          </div>
          <div>
            { DriverItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this, driver._id)}>Delete Driver</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/edit-driver/${driver._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit Driver
              </Link>
              <br />
            </div>

          </div>
            {/* <br />
            <button type="button" class="btn btn-outline-info btn-lg btn-block">Edit Driver</button>
            <button type="button" class="btn btn-outline-danger btn-lg btn-block">Delete Driver</button> */}

        </div>
      </div>
    );
  }
}

export default showDriverDetails;
