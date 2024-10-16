// src/utils/api.ts
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = 'http://localhost:8080/api';

interface Gerbang {
    id: number;
    IdCabang: number;
    NamaGerbang: string;
    NamaCabang: string;
}

interface Lalin {
    // Define properties according to the Lalin response structure
    // e.g., property1: type;
}

interface LoginResponse {
    // Define properties according to the login response structure
    // e.g., token: string;
}

// Create a reusable fetch function
const fetchApi = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await axios.get<T>(`${BASE_URL}${url}`, config);
        return response.data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Define specific fetch functions for your endpoints
export const fetchGerbangs = async (): Promise<Gerbang[]> => {
    return await fetchApi<Gerbang[]>('/gerbangs');
};

export const fetchLalin = async (tanggal: string): Promise<any> => {
    return await fetchApi<any>(`/lalins?tanggal=${tanggal}`);
};

export const login = async (username: string, password: string): Promise<any> => {
    try {
        const response = await axios.post<any>(`${BASE_URL}/auth/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

