import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
    withCredentials: true, // IMPORTANT: Allows browser to send/receive cookies
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;