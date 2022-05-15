import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_SERVER_URL
}
const queryApiConfig: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_SERVER_QUERY_URL
}

export const VendereApiInstance: AxiosInstance = axios.create(config)
export const VendereQueryApiInstance: AxiosInstance = axios.create(queryApiConfig)
