import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getAuth } from "@firebase/auth";

const config: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_SERVER_URL
}
const queryApiConfig: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_SERVER_QUERY_URL
}

const interceptAxiosRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const firebaseUser = getAuth().currentUser

    if (firebaseUser) {
        const accessToken = await firebaseUser.getIdToken()
        return {
            ...config,
            headers: {
                ...config.headers,
                Authorization: `Bearer ${accessToken}`
            }
        }
    }
    return config;
}

const VendereApiInstance: AxiosInstance = axios.create(config)
const VendereQueryApiInstance: AxiosInstance = axios.create(queryApiConfig)

VendereApiInstance.interceptors.request.use(interceptAxiosRequest);
VendereQueryApiInstance.interceptors.request.use(interceptAxiosRequest);

export { VendereApiInstance, VendereQueryApiInstance };
