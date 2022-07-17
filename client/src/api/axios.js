import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const baseAxios = axios.create({
    baseURL: SERVER_URL,
    withCredentials: false
});

export const privateAxios = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true
});