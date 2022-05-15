import { IProductInfo } from '@/services/interfaces/IProduct'
import { ISellerReview } from '../interfaces/ISellerReview'
import { IUserInfo } from '../interfaces/IUser'
import { IApiResponse, IApiResponseDocument } from '../vendereApi/vendereApiResponse/IApiResponse'

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

export const convertApiResponseUser = (response: IApiResponse): IUserInfo => {
    const user: IUserInfo = {
        name: response.fields.name.stringValue,
        averageReview: +response.fields.averageReview.doubleValue,
        numOfReviews: +response.fields.numOfReviews.integerValue,
        imageUrl: response.fields.imageUrl.stringValue,
        hashId: response.name.split('/').slice(-1)[0]
    }
    return user
}

export const convertApiResponseSellerReviews = (response: Array<IApiResponseDocument>): Array<ISellerReview> => {
    const sellerReviews = response.map((review: IApiResponseDocument): ISellerReview => {
        const sellerReview: ISellerReview = {
            targetSellerHashId: review.document.fields.targetSellerHashId.stringValue,
            reviewUserHashId: review.document.fields.reviewUserHashId.stringValue,
            content: review.document.fields.content.stringValue
        }
        return sellerReview
    })
    return sellerReviews
}
