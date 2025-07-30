import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:5000/api",
    headers: {
    "Content-Type": "application/json",
  },
    withCredentials: true, // Enable sending cookies with requests
}); 

export default apiInstance;