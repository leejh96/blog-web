import axios from "axios";

const Axios = axios.create();

Axios.defaults.baseURL = "http://localhost:5000";
Axios.defaults.withCredentials = true;

export default Axios;
