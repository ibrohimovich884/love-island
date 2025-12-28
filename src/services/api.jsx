import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend portingiz
});

// Har safar so'rov ketganda tokenni tekshirib, Headerga qo'shadi
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;