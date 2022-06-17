import Lockr from "lockr";

export const getItem = (key: string) => {
    return Lockr.get(key);
}

export const setItem = (key: string, value: any): void => {
    Lockr.set(key, value);
}

export const removeItem = (key: string): void => {
    Lockr.rm(key);
}