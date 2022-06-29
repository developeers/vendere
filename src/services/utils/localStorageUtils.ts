import { get, set, rm } from "lockr";

const getItem = (key: string) => {
    return get(key);
}

const setItem = (key: string, value: unknown): void => {
    set(key, value);
}

const removeItem = (key: string): void => {
    rm(key);
}

export default {
    getItem,
    setItem,
    removeItem
};
