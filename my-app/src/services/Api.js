import axios from "axios";

const api = axios.create({
    baseURL: 'http://10.50.184.174:3333'
})
export default api;