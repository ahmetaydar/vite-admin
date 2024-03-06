import axios from 'axios';
import { getToken } from './get-token';
import { getRefreshToken } from './get-token';
import Cookies from 'js-cookie';

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const http = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1/',
    timeout: 30000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

http.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] =
                            'Bearer ' + token;
                        return axios(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const data = await refreshToken(); // Refresh the token
                if (data.token) {
                    // Set the new tokens in cookies
                    Cookies.set('auth_token', data.token);
                    Cookies.set('refresh_token', data.refreshToken);

                    // Update the original request with the new token
                    originalRequest.headers['Authorization'] =
                        'Bearer ' + data.token;
                    processQueue(null, data.token); // Process the queue with the new token
                    return axios(originalRequest); // Retry the original request with the new token
                }
            } catch (err) {
                processQueue(err, null);
                window.location.href = '/auth/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

async function refreshToken() {
    const refreshToken = getRefreshToken();
    console.log('refreshToken', refreshToken);
    try {
        const response = await http.post('/auth/refresh', {
            refreshToken: refreshToken,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status == 401) {
            window.location.href = '/auth/login';
        }

        throw error;
    }
}
export default http;
