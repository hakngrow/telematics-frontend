import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

class UpdateDriverInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
        driver_id: '',
        name: '',
        vehicle_no: '',
        status: '',
        phone_no: '',
        phone_model: '',
        smartdrive_login: '',
        smartdrive_password: ''
    }
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://localhost:8082/api/drivers/' + this.props.match.params.id)
      .then((res) => {
        // this.setState({...this.state, book: res.data})
        this.setState({
          driver_id: res.data.driver_id,
          name: res.data.name,
          vehicle_no: res.data.vehicle_no,
          status: res.data.status,
          phone_no: res.data.phone_no,
          phone_model: res.data.phone_model,
          smartdrive_login: res.data.smartdrive_login,
          smartdrive_password: res.data.smartdrive_password
        })
      })
      .catch((err) => {
        console.log('Error from UpdateDriverInfo')
      })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const data = {
      driver_id: this.state.driver_id,
      name: this.state.name,
      vehicle_no: this.state.vehicle_no,
      status: this.state.status,
      phone_no: this.state.phone_no,
      phone_model: this.state.phone_model,
      smartdrive_login: this.state.smartdrive_login,
      smartdrive_password: this.state.smartdrive_password
    }

    axios
      .put(
        'http://localhost:8082/api/drivers/' + this.props.match.params.id,
        data,
      )
      .then((res) => {
        this.props.history.push('/show-driver/' + this.props.match.params.id)
      })
      .catch((err) => {
        console.log('Error in UpdateDriverInfo!')
      })
  }

  render() {
    return (
      <div className="UpdateDriverInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Driver List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Driver</h1>
              <p className="lead text-center">Update Driver's Info</p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="driver_id">Driver Id</label>
                <input
                  type="text"
                  placeholder="Driver Id"
                  name="driver_id"
                  className="form-control"
                  value={this.state.driver_id}
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  className="form-control"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="vehicle_no">Vehicle No.</label>
                <input
                  type="text"
                  placeholder="Vehicle No."
                  name="vehicle_no"
                  className="form-control"
                  value={this.state.vehicle_no}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <input
                  type="text"
                  placeholder="Status"
                  name="status"
                  className="form-control"
                  value={this.state.status}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_no">Phone No.</label>
                <input
                  type="text"
                  placeholder="Phone No."
                  name="phone_no"
                  className="form-control"
                  value={this.state.phone_no}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone_model">Phone Model</label>
                <input
                  type="text"
                  placeholder="Phone Model"
                  name="phone_model"
                  className="form-control"
                  value={this.state.phone_model}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="smartdrive_login">SmartDrive Login</label>
                <input
                  type="text"
                  placeholder="SmartDrive Login"
                  name="smartdrive_login"
                  className="form-control"
                  value={this.state.smartdrive_login}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="smartdrive_password">SmartDrive Password</label>
                <input
                  type="text"
                  placeholder="SmartDrive Password"
                  name="smartdrive_password"
                  className="form-control"
                  value={this.state.smartdrive_password}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-info btn-lg btn-block"
              >
                Update Driver
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default UpdateDriverInfo
