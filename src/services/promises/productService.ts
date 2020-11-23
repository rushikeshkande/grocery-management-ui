import { DEV_URL } from "@constants/urls";
import { get, post } from "@services/service";

export function getProducts() {
    return get(`${DEV_URL}product/products`);
}

export function addProductToCart(payload: object) {
    return post(`${DEV_URL}cart/add`,payload);
}

export function getGlobalSearchResult(value:string) {
    return get(`${DEV_URL}product/search?name=${value}`);
}

export function getProductDetails(id:string) {
    return get(`${DEV_URL}product/${id}/getDetails`);
}