import axios from "axios";
import { DEV_URL } from "@constants/urls";


export function loginUser(payload:any) {
    return axios.post(`${DEV_URL}auth/login`,payload);
}

export function registerUser(payload: any) {
    return axios.post(`${DEV_URL}auth/register`,payload);
}

export function forgotUser(payload:any) {
    return axios.post(`${DEV_URL}auth/forgot`,payload);
}