import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:5044',
    paramsSerializer: {
        indexes: null
    }
});

export default apiClient;