import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.kemifilani.ng/api/v1/",
    withCredentials: true
});

export default axiosInstance;