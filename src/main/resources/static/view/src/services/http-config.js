import axios from "axios";

const API = 'http://localhost:8080/api';
//const API = 'http://129.158.59.187:8000/';

export default axios.create({
    baseURL: API,
    headers: {
        "Content-type": "application/json"
    }
});