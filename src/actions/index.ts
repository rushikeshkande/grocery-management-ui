import {
  REMOVE_INSTANCE,
  SAVE_INSTANCE,
  UPDATE_INSTANCE,
  SAVE_ALL_INSTANCES,
  DELETE_ALL_INSTANCES
} from "@constants/actions";
import { dispatch } from "@utils/index";
import { BaseModel } from "@models/BaseModel";

/** Used to save multiple instances to the store. */
export function saveAllInstances(instanceMap: any) {
  return dispatch({ type: SAVE_ALL_INSTANCES, instanceMap });
}
export function saveInstance(instance: BaseModel<{}>, key: string, id: string = "") {
  return dispatch({ type: SAVE_INSTANCE, instance, key, keyPath: id });
}

export function removeInstance(key: string, id: string = "") {
  return dispatch({ type: REMOVE_INSTANCE, key, keyPath: id });
}

export function updateInstance(key: string, instance: any) {
  return dispatch({
    type: UPDATE_INSTANCE,
    key,
    instance
  });
}

export function deleteAllInstances(instanceKeys: any) {
  return dispatch({
    type: DELETE_ALL_INSTANCES,
    instances: instanceKeys
  });
}
