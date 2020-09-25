/* eslint no-console:off */
import axios from "axios";

// export const BASE_URL = "http://3.7.85.222:3000";
// export const BASE_URL = 'http://dffcaf40.ngrok.io';
export const BASE_URL = "http://localhost:3000";

const SERVICE_URL = `${BASE_URL}/api/`;

export function get(url: string, customHeader?: any) {
  return axios.get(`${SERVICE_URL}${url}`, customHeader);
}

export function del(url: string) {
  return axios.delete(`${SERVICE_URL}${url}`);
}

export function post(url: string, payload?: any, config?: any) {
  return axios.post(`${SERVICE_URL}${url}`, payload, config ? config : "");
}

export function put(url: string, payload?: any) {
  return axios.put(`${SERVICE_URL}${url}`, payload);
}

export function patch(url: string, payload?: any) {
  return axios.patch(`${SERVICE_URL}${url}`, payload);
}
