// axiosSecure.js (global Axios instance)
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // Replace with your API base URL
});

export default axiosSecure;
