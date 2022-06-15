import { VendereApiInstance } from './VendereApiBase'
import { IApiResponse } from './vendereApiResponse/IApiResponse'
import { IProductInfo } from '@/services/interfaces/IProduct'
import { convertApiResponseProduct } from '../utils/apiUtils'

export const getProductsList = async (): Promise<Array<IProductInfo>> => {
    const res = await VendereApiInstance.get(`products`)
    return res?.data.documents.map((product: IApiResponse) => convertApiResponseProduct(product))
}

export const getProductByHashId = async (productHashId: string): Promise<IProductInfo> => {
    const res = await VendereApiInstance.get(`products/${productHashId}`)
    return convertApiResponseProduct(res?.data)
}

export const submitProduct = async (product: IProductInfo): Promise<void> => {
    const postParams = {
        fields: {
            name: { stringValue: product.name },
            price: { integerValue: product.price },
        }
    }
    VendereApiInstance.post(`products`, postParams).then(res => {
        if (res.status === 200) {
            // To-do: Save new product at Vuex store
        }
    }).catch(error => console.log(error))
}