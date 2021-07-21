import React, { useState, useEffect } from "react";
import DriverDataService from "../services/DriverService";

const Driver = props => {
  const initialDriverState = {
    _id: "",
    driver_id: "",
    name: "",
    status: "",
    vehicle_no: "",
    phone_no: "",
    phone_model: "",
    smartdrive_login: "",
    smartdrive_password: ""
  };
  const [currentDriver, setCurrentDriver] = useState(initialDriverState);
  const [message, setMessage] = useState("");

  const getDriver = id => {
    DriverDataService.get(id)
      .then(response => {
        setCurrentDriver(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getDriver(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDriver({ ...currentDriver, [name]: value });
  };

  const updateDriver = () => {

    DriverDataService.update(currentDriver._id, currentDriver)
      .then(response => {
        setMessage("The driver was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteDriver = () => {
    DriverDataService.remove(currentDriver._id)
      .then(response => {
        console.log(response.data);
        props.history.push("/drivers");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentDriver ? (
        <div className="edit-form">
          <h4>Driver</h4>
          <form>
            <div className="form-group">
              <label htmlFor="driver_id">Driver Id</label>
              <input
                type="text"
                className="form-control"
                id="driver_id"
                name="driver_id"
                value={currentDriver.driver_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentDriver.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <input
                type="text"
                className="form-control"
                id="status"
                name="status"
                value={currentDriver.status}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="vehicle_no">Vehicle No.</label>
              <input
                type="text"
                className="form-control"
                id="vehicle_no"
                name="vehicle_no"
                value={currentDriver.vehicle_no}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_no">Phone No.</label>
              <input
                type="text"
                className="form-control"
                id="phone_no"
                name="phone_no"
                value={currentDriver.phone_no}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone_model">Phone Model</label>
              <input
                type="text"
                className="form-control"
                id="phone_model"
                name="phone_model"
                value={currentDriver.phone_model}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="smartdrive_login">SmartDrive Login</label>
              <input
                type="text"
                className="form-control"
                id="smartdrive_login"
                name="smartdrive_login"
                value={currentDriver.smartdrive_login}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="smartdrive_password">SmartDrive Password</label>
              <input
                type="text"
                className="form-control"
                id="smartdrive_password"
                name="smartdrive_password"
                value={currentDriver.smartdrive_password}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="btn btn-danger mr-2" onClick={deleteDriver}>
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-success"
            onClick={updateDriver}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a driver...</p>
        </div>
      )}
    </div>
  );
};

export default Driver;
