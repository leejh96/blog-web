import axios from "axios";

const Axios = axios.create();

Axios.defaults.baseURL = "https://julogpage.herokuapp.com";
Axios.defaults.withCredentials = true;

export default Axios;
