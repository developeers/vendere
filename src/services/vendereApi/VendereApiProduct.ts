import VendereApiInstance from './VendereApiBase'

import { IApiResponse } from './vendereApiResponse/IApiResponse'

export const getProductsList = async (): Promise<Array<IApiResponse>> => {
    const res = await VendereApiInstance.get(`products`)
    console.log(`Products list ${res}`)
    return res?.data.documents
}

export const getProductById = async (productId: number): Promise<IApiResponse> => {
    const res = await VendereApiInstance.get(`products/${productId}`)
    console.log(`Product ${res}`)
    return res?.data
}