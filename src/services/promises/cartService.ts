import { DEV_URL } from "@constants/urls";
import { get, del } from "@services/service";

export function getCartItems(id) {
    return get(`${DEV_URL}cart/${id}/all`);
}

export function deleteCartItem(userId,productId) {
    return del(`${DEV_URL}cart/delete?userId=${userId}&productId=${productId}`);
}