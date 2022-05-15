import VendereApiInstance from './VendereApiBase'
import { IUserInfo } from "../interfaces/IUser"
import { ISellerReview } from '../interfaces/ISellerReview'
import { convertApiResponseUser, convertApiResponseSellerReviews } from '../utils/apiUtils'
import axios from 'axios'

export const getUserByHashId = async (hashId: string): Promise<IUserInfo> => {
    const res = await VendereApiInstance.get(`users/${hashId}`)
    return convertApiResponseUser(res.data)
}

export const getSellerReviews = async (sellerHashId: string): Promise<Array<ISellerReview>> => {
    const res = await axios.post('https://firestore.googleapis.com/v1/projects/vendere-23f76/databases/(default)/documents:runQuery', {
        structuredQuery: {
            from: [
                { collectionId: 'seller_review' }
            ],
            where: {
                compositeFilter: {
                    filters: [{
                        fieldFilter: {
                            field: {
                                fieldPath: 'targetSellerHashId'
                            },
                            op: 'EQUAL',
                            value: {
                                stringValue: sellerHashId
                            }
                        }
                    }],
                    op: 'AND'
                }
            }
        }
    })
    return convertApiResponseSellerReviews(res.data)
}
