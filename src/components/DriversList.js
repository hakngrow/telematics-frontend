import React, { useState, useEffect, useMemo, useRef } from "react";
import DriverDataService from "../services/DriverService";
import { useTable } from "react-table";

const DriversList = (props) => {
  const [drivers, setDrivers] = useState([]);
  const [searchName, setSearchName] = useState("");
  const driversRef = useRef();

  driversRef.current = drivers;

  useEffect(() => {
    retrieveDrivers();
  }, []);

  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveDrivers = () => {
    DriverDataService.getAll()
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveDrivers();
  };

  const removeAllDrivers = () => {
    DriverDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    DriverDataService.findByName(searchName)
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openDriver = (rowIndex) => {

    const id = driversRef.current[rowIndex]._id;

    props.history.push("/drivers/" + id);
  };

  const deleteDriver = (rowIndex) => {
    const id = driversRef.current[rowIndex]._id;

    DriverDataService.remove(id)
      .then((response) => {
        props.history.push("/drivers");

        let newDrivers = [...driversRef.current];
        newDrivers.splice(rowIndex, 1);

        setDrivers(newDrivers);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "Driver Id",
        accessor: "driver_id",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Vehicle No.",
        accessor: "vehicle_no",
      },
      {
        Header: "Phone No.",
        accessor: "phone_no",
      },
      {
        Header: "Phone Model",
        accessor: "phone_model",
      },
      {
        Header: "SD Login",
        accessor: "smartdrive_login",
      },
      {
        Header: "SD Pwd",
        accessor: "smartdrive_password",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openDriver(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>
              <span onClick={() => deleteDriver(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: drivers,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllDrivers}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default DriversList;
