import axios from "axios";

const uri = process.env.REACT_APP_BACKEND_URI;

export default axios.create({
  baseURL: `https://${uri}/api`,
  headers: {
    "Content-type": "application/json"
  }
});