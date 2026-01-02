import axios from 'axios';

const api = axios.create({
    baseURL: 'https://love-island-server.onrender.com/api', 
    // baseURL: 'http://localhost:5000/api',
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