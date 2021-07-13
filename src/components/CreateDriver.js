import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

class CreateDriver extends Component {
    constructor() {
      super();
      this.state = {
        driver_id: '',
        name: '',
        status: '',
        vehicle_no: '',
        phone_no: '',
        phone_model: '',
        smartdrive_login: '',
        smartdrive_password: ''
      };
    }
  
    onChange = e => {
      console.log( e.target.name, e.target.value);
      this.setState({ [e.target.name]: e.target.value });
    };
  
    onSubmit = e => {
      e.preventDefault();
  
      const data = {
        driver_id: this.state.driver_id,
        name: this.state.name,
        status: this.state.status,
        vehicle_no: this.state.vehicle_no,
        phone_no: this.state.phone_no,
        phone_model: this.state.phone_model,
        smartdrive_login: this.state.smartdrive_login,
        smartdrive_password: this.state.smartdrive_password
      };
  
      axios
        .post('http://hakngrow-telematics-backend.herokuapp.com/api/drivers', data)
        .then(res => {
          this.setState({
            driver_id: '',
            name: '',
            status: '',
            vehicle_no: '',
            phone_no: '',
            phone_model: '',
            smartdrive_login: '',
            smartdrive_password: ''
          })
          this.props.history.push('/');
        })
        .catch(err => {
          console.log("Error in CreateDriver!");
        })
    };
  
    render() {
      return (
        <div className="CreateDriver">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <br />
                <Link to="/" className="btn btn-outline-warning float-left">
                    Show Driver List
                </Link>
              </div>
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Add Driver</h1>
                <p className="lead text-center">
                    Create new driver
                </p>
  
                <form noValidate onSubmit={this.onSubmit}>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Driver Id'
                      name='driver_id'
                      className='form-control'
                      value={this.state.driver_id}
                      onChange={this.onChange}
                    />
                  </div>
                  <br />
  
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Name'
                      name='name'
                      className='form-control'
                      value={this.state.name}
                      onChange={this.onChange}
                    />
                  </div>
  
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Status'
                      name='status'
                      className='form-control'
                      value={this.state.status}
                      onChange={this.onChange}
                    />
                  </div>
  
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Vehicle No.'
                      name='vehicle_no'
                      className='form-control'
                      value={this.state.vehicle_no}
                      onChange={this.onChange}
                    />
                  </div>
  
                  <div className='form-group'>
                    <input
                      type='txt'
                      placeholder='Phone No.'
                      name='phone_no'
                      className='form-control'
                      value={this.state.phone_no}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='Phone Model'
                      name='phone_model'
                      className='form-control'
                      value={this.state.phone_model}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='SmartDrive Login'
                      name='smartdrive_login'
                      className='form-control'
                      value={this.state.smartdrive_login}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      placeholder='SmartDrive Password'
                      name='smartdrive_password'
                      className='form-control'
                      value={this.state.smartdrive_password}
                      onChange={this.onChange}
                    />
                  </div>
  
                  <input
                      type="submit"
                      className="btn btn-outline-warning btn-block mt-4"
                  />
                </form>
            </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default CreateDriver;
