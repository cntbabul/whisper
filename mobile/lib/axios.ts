import axios from "axios";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";


const API_URL = process.env.EXPO_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_URL?.endsWith("/") ? API_URL : `${API_URL}/`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const useApi = () => {
    const { getToken } = useAuth();
    useEffect(() => {
        const requestInterceptor = api.interceptors.request.use(async (config) => {
            const token = await getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        //cleanup function
        return () => {
            api.interceptors.request.eject(requestInterceptor);
        };
    }, [getToken]);
    return api;
}