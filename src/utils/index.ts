import { store } from "@store/index";
import { IAction, IThunkAction } from "interfaces";

export function dispatch<T extends IAction>(action: T | IThunkAction) {
    if ((action as IAction).type) {
        return store.dispatch(action as IAction);
    }
    return store.dispatch<{ type: string }>(action as IThunkAction);
};

export function isEmpty(obj: Object) {
    if (Object.keys(obj).length <= 0 || !obj) {
        return true;
    }
    return false;
};

export const validNumberInput = (data: any) => {
    const text = data;
    const regex = /^\d{0,}(\.\d{0,6})?$/;
    var test = regex.test(text);
    return test;
};

export const validateEmail = (email: string) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const checkIfEmptyObject = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => (Object.entries(data).length === 0 && data.constructor === Object);


export function handleNoSpaceFirst(event: any, value: any) {
    if (value.length === 0 && event.which === 32) {
        event.preventDefault();
    }
};

export function isValidURL(str: string) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}


export function getDateFormatInDays(date: string) {
    const today = new Date();
    const thatDay = new Date(date);
    const oneDay = 1000*60*60*24;

    const diff = (Math.ceil(today.getTime() - thatDay.getTime())) / oneDay;
    // @ts-ignore
    return parseInt(diff);
}