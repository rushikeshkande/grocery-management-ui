import {
  REMOVE_INSTANCE,
  SAVE_INSTANCE,
  UPDATE_INSTANCE,
  SAVE_ALL_INSTANCES,
  DELETE_ALL_INSTANCES,
  SAVE_USER_DATA,
  REMOVE_USER_DATA,
  SAVE_CART_COUNT,
  INCREMENT_CART_COUNT,
  DECREMENT_CART_COUNT,
} from "@constants/actions";
import { dispatch } from "@utils/index";
import { BaseModel } from "@models/BaseModel";
import { getCartItems } from "@services/promises/cartService";
import { store } from "@store/index";

/** Used to save multiple instances to the store. */
export function saveAllInstances(instanceMap: any) {
  return dispatch({ type: SAVE_ALL_INSTANCES, instanceMap });
}
export function saveInstance(
  instance: BaseModel<{}>,
  key: string,
  id: string = ""
) {
  return dispatch({ type: SAVE_INSTANCE, instance, key, keyPath: id });
}

export function removeInstance(key: string, id: string = "") {
  return dispatch({ type: REMOVE_INSTANCE, key, keyPath: id });
}

export function updateInstance(key: string, instance: any) {
  return dispatch({
    type: UPDATE_INSTANCE,
    key,
    instance,
  });
}

export function deleteAllInstances(instanceKeys: any) {
  return dispatch({
    type: DELETE_ALL_INSTANCES,
    instances: instanceKeys,
  });
}

export function saveUserData(payload: any) {
  return dispatch({
    type: SAVE_USER_DATA,
    payload: payload,
  });
}

export function deleteUserData() {
  return dispatch({
    type: REMOVE_USER_DATA,
  });
}

export function fetchCartCount(id) {
  getCartItems(id)
    .then((result) => {
      return dispatch({
        type: SAVE_CART_COUNT,
        count: result.length,
      });
    })
    .catch((err) => {
      console.log("err..", err);
      return dispatch({
        type: SAVE_CART_COUNT,
        count: 0,
      });
    });
}

export function incrementCartCount() {
  const { cartInfo } = store.getState();
  let num = cartInfo.cartCount + 1;
  return dispatch({
    type: INCREMENT_CART_COUNT,
    count: num
  });
}

export function decrementCartCount() {
  const { cartInfo } = store.getState();
  let num = cartInfo.cartCount - 1;
  return dispatch({
    type: DECREMENT_CART_COUNT,
    count: num
  });
}
