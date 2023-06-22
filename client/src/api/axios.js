import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:2001/api',
    withCredentials: true
})

export default instance;