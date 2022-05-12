import { IProductInfo } from '@/services/interfaces/IProduct'
import { ISellerInfo } from '../interfaces/ISeller'
import { IApiResponse } from '../vendereApi/vendereApiResponse/IApiResponse'

export const convertApiResponseProduct = (response: IApiResponse): IProductInfo => {
    const product: IProductInfo = {
        name: response.fields.name.stringValue,
        price: +response.fields.price.integerValue,
        sellerHashId: response.fields.sellerHashId.stringValue,
        updatedAt: response.updateTime,
        imageUrl: response.fields.imageUrl.stringValue,
        hashId: response.name.split('/').slice(-1)[0]
    }
    return product
}

export const convertApiResponseSeller = (response: IApiResponse): ISellerInfo => {
    const seller: ISellerInfo = {
        name: response.fields.name.stringValue,
        averageReview: +response.fields.averageReview.doubleValue,
        numOfReviews: +response.fields.numOfReviews.integerValue,
        imageUrl: response.fields.imageUrl.stringValue,
        hashId: response.name.split('/').slice(-1)[0]
    }
    return seller
}