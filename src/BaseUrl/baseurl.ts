import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.kemifilani.ng/api/v1/",
    // baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true
});

export default axiosInstance;