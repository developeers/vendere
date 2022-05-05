import VendereApiInstance from './VendereApiBase'

import { IApiResponse } from './vendereApiResponse/IApiResponse'
import { IProductInfo } from '@/services/interfaces/IProduct'
import { convertApiResponseProduct } from '../utils/apiUtils'

export const getProductsList = async (): Promise<Array<IProductInfo>> => {
    const res = await VendereApiInstance.get(`products`)
    return res?.data.documents.map((product: IApiResponse) => convertApiResponseProduct(product))
}

export const getProductById = async (productId: number): Promise<IProductInfo> => {
    const res = await VendereApiInstance.get(`products/${productId}`)
    return convertApiResponseProduct(res?.data)
}
