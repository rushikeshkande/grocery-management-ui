/* eslint no-console:off */
import { DEV_URL } from "@constants/urls";
import axios from "axios";

export const LOCALSTORAGE_AUTH_KEY = "authorization";
export const HEADER_AUTH_KEY = "authorization";

const axiosInstance = axios.create({
  baseURL: (process.env.NODE_ENV === "production" && DEV_URL) || DEV_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8081",
    [HEADER_AUTH_KEY]: localStorage.getItem(LOCALSTORAGE_AUTH_KEY),
  },
});

export function get(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    axiosInstance.interceptors.request.use((config) => {
      config.headers[HEADER_AUTH_KEY] =
        "Bearer " + localStorage.getItem(LOCALSTORAGE_AUTH_KEY) || "";
      return config;
    });
    axiosInstance
      .get(url)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
}

export function post(url: string, body?: any, headers = {}): any {
  return new Promise((resolve, reject) => {
    axiosInstance.interceptors.request.use((config) => {
      config.headers[HEADER_AUTH_KEY] =
        "Bearer " + localStorage.getItem(LOCALSTORAGE_AUTH_KEY) || "";
      return { ...config, headers: { ...config.headers, ...headers } };
    });
    axiosInstance
      .post(url, body)
      .then((response) => {
        console.log(response);
        if (response.data.status === "invalid") {
          reject(response.data.error);
        }
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          reject(error.response.data);
          return;
        }
        reject(error);
      });
  });
}

export function put(url: string, body?: any): any {
  return new Promise((resolve, reject) => {
    axiosInstance.interceptors.request.use((config) => {
      config.headers[HEADER_AUTH_KEY] =
        "Bearer " + localStorage.getItem(LOCALSTORAGE_AUTH_KEY) || "";
      return config;
    });
    axiosInstance
      .put(url, body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data);
          return;
        }
        reject(error);
      });
  });
}

export function del(url: string): any {
  return new Promise((resolve, reject) => {
    axiosInstance.interceptors.request.use((config) => {
      config.headers[HEADER_AUTH_KEY] =
        "Bearer " + localStorage.getItem(LOCALSTORAGE_AUTH_KEY) || "";
      return config;
    });
    axiosInstance
      .delete(url)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function saveToken(response) {
  localStorage.setItem(LOCALSTORAGE_AUTH_KEY, response);
}

export function removeToken() {
  localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
}
