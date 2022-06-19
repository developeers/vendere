import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import { refreshAccessTokenApiUrl } from '@/firebase';
import UserModule from '@/store/modules/User';

import httpStatusCodes from '../utils/httpStatusCodes';

const config: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_SERVER_URL
}
const queryApiConfig: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_SERVER_QUERY_URL
}

interface RefreshAccessTokenResponse {
    id_token: string
    refresh_token: string
}

interface RefreshAccessTokenApiResponse {
    data: RefreshAccessTokenResponse
}

const interceptAxiosRequest = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    const accessToken = UserModule.accessToken
    if (accessToken) {
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

const interceptAxiosResponseError = async (error: AxiosError) => {
    if (error.response?.status == httpStatusCodes.UNAUTHORIZED) {
        // Refresh access token
        const refreshToken = UserModule.refreshToken
        const originalRequest = error.config
        await axios.post<any, RefreshAccessTokenApiResponse>(refreshAccessTokenApiUrl, {
            grant_type: "refresh_token",
            refresh_token: refreshToken
        }).then(res => {
            UserModule.setRefreshToken(res.data.refresh_token)
            UserModule.setAccessToken(res.data.id_token)
        }).catch(() => {
            // To-do: Handle when a new access token can not be issued
        })
        const newAccessToken = UserModule.accessToken
        originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`
        }
        return await axios(originalRequest)
    }
    return error
}

const VendereApiInstance: AxiosInstance = axios.create(config)
const VendereQueryApiInstance: AxiosInstance = axios.create(queryApiConfig)

VendereApiInstance.interceptors.request.use(interceptAxiosRequest);
VendereQueryApiInstance.interceptors.request.use(interceptAxiosRequest);

VendereApiInstance.interceptors.response.use(undefined, interceptAxiosResponseError)
VendereQueryApiInstance.interceptors.response.use(undefined, interceptAxiosResponseError)

export { VendereApiInstance, VendereQueryApiInstance };
