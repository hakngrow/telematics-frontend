import React, { useState, useEffect, useMemo, useRef } from "react";
import PerformanceDataService from "../services/PerformanceService";
import { useTable } from "react-table";

const PerformancesList = (props) => {
  const [performances, setPerformances] = useState([]);
  const [searchDriverId, setSearchDriverId] = useState("");
  const performancesRef = useRef();

  performancesRef.current = performances;

  useEffect(() => {
    retrievePerformances();
  }, []);

  const onChangeSearchDriverId = (e) => {
    const searchDriverId = e.target.value;
    setSearchDriverId(searchDriverId);
  };

  const retrievePerformances = () => {
    PerformanceDataService.getAll()
      .then((response) => {
        setPerformances(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrievePerformances();
  };

  const removeAllPerformances = () => {
    PerformanceDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByDriverId = () => {
    PerformanceDataService.findByDriverId(searchDriverId)
      .then((response) => {
        setPerformances(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openPerformance = (rowIndex) => {

    const id = performancesRef.current[rowIndex]._id;

    props.history.push("/performances/" + id);
  };

  const sendTelegram = (performance) => {
    
  }

  const sendPerformance = (rowIndex) => {

    const id = performancesRef.current[rowIndex]._id;

    console.log(performancesRef.current[rowIndex]);

    props.history.push("/performances/" + id);
  };

  const deletePerformance = (rowIndex) => {
    const id = performancesRef.current[rowIndex]._id;

    PerformanceDataService.remove(id)
      .then((response) => {
        props.history.push("/performances");

        let newPerformances = [...performancesRef.current];
        newPerformances.splice(rowIndex, 1);

        setPerformances(newPerformances);
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
        Header: "From",
        accessor: "start_date",
      },
      {
        Header: "To",
        accessor: "end_date",
      },
      {
        Header: "Distance",
        accessor: "distance",
      },
      {
        Header: "Duration",
        accessor: "duration",
      },
      {
        Header: "Speeding",
        accessor: "speeding",
      },
      {
        Header: "Distraction",
        accessor: "distraction",
      },
      {
        Header: "Braking",
        accessor: "braking",
      },
      {
        Header: "Cornering",
        accessor: "cornering",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openPerformance(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>
              <span onClick={() => sendPerformance(rowIdx)}>
                <i className="fab fa-telegram action"></i>
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
    data: performances,
  });

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Driver Id"
            value={searchDriverId}
            onChange={onChangeSearchDriverId}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByDriverId}
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
        <button className="btn btn-sm btn-danger" onClick={removeAllPerformances}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default PerformancesList;
