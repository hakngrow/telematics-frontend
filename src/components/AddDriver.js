import React, { useState } from "react";
import DriverDataService from "../services/DriverService";

const AddDriver = () => {
  const initialDriverState = {
    driver_id: "",
    name: "",
    status: "",
    vehicle_no: "",
    phone_no: "",
    phone_model: "",
    smartdrive_login: "",
    smartdrive_password: ""
  };
  const [driver, setDriver] = useState(initialDriverState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setDriver({ ...driver, [name]: value });
  };

  const saveDriver = () => {
    var data = {
      driver_id: driver.driver_id,
      name: driver.name,
      status: driver.status,
      vehicle_no: driver.vehicle_no,
      phone_no: driver.phone_no,
      phone_model: driver.phone_model,
      smartdrive_login: driver.smartdrive_login,
      smartdrive_password: driver.smartdrive_password
    };

    DriverDataService.create(data)
      .then(response => {
        setDriver({
          driver_id: response.data.driver_id,
          name: response.data.name,
          status: response.data.status,
          vehicle_no: response.data.vehicle_no,
          phone_no: response.data.phone_no,
          phone_model: response.data.phone_model,
          smartdrive_login: response.data.smartdrive_login,
          smartdrive_password: response.data.smartdrive_password
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newDriver = () => {
    setDriver(initialDriverState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newDriver}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="driver_id">Driver Id</label>
            <input
              type="text"
              className="form-control"
              id="driver_id"
              required
              value={driver.driver_id}
              onChange={handleInputChange}
              name="driver_id"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={driver.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              required
              value={driver.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicle_no">Vehicle No.</label>
            <input
              type="text"
              className="form-control"
              id="vehicle_no"
              required
              value={driver.vehicle_no}
              onChange={handleInputChange}
              name="vehicle_no"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_no">Phone No.</label>
            <input
              type="text"
              className="form-control"
              id="phone_no"
              required
              value={driver.phone_no}
              onChange={handleInputChange}
              name="phone_no"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_model">Phone Model</label>
            <input
              type="text"
              className="form-control"
              id="phone_model"
              required
              value={driver.phone_model}
              onChange={handleInputChange}
              name="phone_model"
            />
          </div>
          <div className="form-group">
            <label htmlFor="smartdrive_login">SmartDrive Login</label>
            <input
              type="text"
              className="form-control"
              id="smartdrive_login"
              required
              value={driver.smartdrive_login}
              onChange={handleInputChange}
              name="smartdrive_login"
            />
          </div>
          <div className="form-group">
            <label htmlFor="smartdrive_password">SmartDrive Password</label>
            <input
              type="text"
              className="form-control"
              id="smartdrive_password"
              required
              value={driver.smartdrive_password}
              onChange={handleInputChange}
              name="smartdrive_password"
            />
          </div>


          <button onClick={saveDriver} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddDriver;
