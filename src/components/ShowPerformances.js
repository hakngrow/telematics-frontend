import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import DriverCard from './DriverCard'

const uri = process.env.REACT_APP_BACKEND_URI

class ShowPerformances extends Component {
  constructor(props) {
    super(props)
    this.state = {
      performances: [],
    }
  }

  componentDidMount() {
    axios
      .get(`http://${uri}/api/performances`)
      .then((res) => {
        this.setState({
          performances: res.data,
        })
      })
      .catch((err) => {
        console.log('Error from ShowPerformances')
      })
  }

  render() {
    const performances = this.state.performances
    console.log('PrintPerformances: ' + performances)

    let performanceList

    if (!performances) {
      performanceList = 'There are no performance records!'
    } else {
      performanceList = performances.map((performance, k) => (
        <DriverCard driver={performance} key={k} />
      ))
    }

    return (
      <div className="ShowPerformances">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Performance Records</h2>
            </div>

            <div className="col-md-11">
              <br />
              <br />
              <hr />
            </div>
          </div>

          <div className="list">{performanceList}</div>
        </div>
      </div>
    )
  }
}

export default ShowPerformances
