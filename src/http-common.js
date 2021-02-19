import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin":  "http://127.0.0.1:8080",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  }
});