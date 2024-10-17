// src/utils/api.ts
import axios, { AxiosRequestConfig } from "axios";
import { Gerbang, lanlinResponse } from "./utils/types";

const BASE_URL = "http://localhost:8080/api";


const fetchApi = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axios.get<T>(`${BASE_URL}${url}`, config);
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};

export const fetchGerbangs = async (): Promise<Gerbang[]> => {
  return await fetchApi<Gerbang[]>("/gerbangs");
};

export const fetchLalin = async (tanggal: string): Promise<lanlinResponse> => {
  return await fetchApi<lanlinResponse>(`/lalins?tanggal=${tanggal}`);
};

export const login = async (
  username: string,
  password: string
): Promise<any> => {
  try {
    const response = await axios.post<any>(`${BASE_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
