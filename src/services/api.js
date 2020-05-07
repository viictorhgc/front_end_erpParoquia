// Axios intercepta requisições antes dela acontecer.

import axios from "axios";
import { getToken } from "./auth";
import { environment } from '../commom/environment'

const api = axios.create({
    baseURL: `http://${environment.api.host}:${environment.api.port}`
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;