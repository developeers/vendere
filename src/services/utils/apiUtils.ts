import { IProductInfo } from '@/services/interfaces/IProduct'
import { IApiResponse } from '../vendereApi/vendereApiResponse/IApiResponse'

export const convertApiResponseProduct = (response: IApiResponse): IProductInfo => {
    const product: IProductInfo = {
        name: response.fields.name?.stringValue,
        price: +response.fields.price?.integerValue,
        ownerHashId: response.fields.ownerHashId?.stringValue,
        updatedAt: response.updateTime,
        hashId: response.name.split('/').slice(-1)[0]
    }
    return product
}