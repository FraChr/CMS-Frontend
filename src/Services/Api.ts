import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:5044',
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: {
        indexes: null
    }
});

export default apiClient;