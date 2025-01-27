// axiosSecure.js (global Axios instance)
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://task-perks-server.vercel.app", // Replace with your API base URL
});

export default axiosSecure;
