import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL ,
    headers: {
    "Content-Type": "application/json",
  },
    withCredentials: true, // Enable sending cookies with requests
}); 

export default apiInstance;