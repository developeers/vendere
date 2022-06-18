import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import UserModule from '@/store/modules/User'

const config: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_SERVER_URL
}
const queryApiConfig: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_SERVER_QUERY_URL
}

const interceptAxiosRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const authToken = UserModule.authToken;
    if (authToken.length) {
        config.headers!.Authorization = `Bearer ${authToken}`;
    }
    return config;
}

const VendereApiInstance: AxiosInstance = axios.create(config)
const VendereQueryApiInstance: AxiosInstance = axios.create(queryApiConfig)

VendereApiInstance.interceptors.request.use(interceptAxiosRequest);
VendereQueryApiInstance.interceptors.request.use(interceptAxiosRequest);

export { VendereApiInstance, VendereQueryApiInstance };
