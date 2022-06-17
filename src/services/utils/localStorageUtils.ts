import Lockr from "lockr";

const getItem = (key: string) => {
    return Lockr.get(key);
}

const setItem = (key: string, value: unknown): void => {
    Lockr.set(key, value);
}

const removeItem = (key: string): void => {
    Lockr.rm(key);
}

export default {
    getItem,
    setItem,
    removeItem
};
