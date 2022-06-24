import { ISellerReview } from '../interfaces/ISellerReview';
import { IUserInfo } from '../interfaces/IUser';
import {
    convertApiResponseSellerReviews, convertApiResponseUser, createFirestoreRequestBody,
    firestoreQueryOperators, IFirestoreFieldFilter
} from '../utils/apiUtils';
import { VendereApiInstance, VendereQueryApiInstance } from './VendereApiBase';

export const getUserByUID = async (uid: string): Promise<IUserInfo> => {
    const fieldFilter: IFirestoreFieldFilter = {
        fieldPath: "uid",
        value: uid,
        op: firestoreQueryOperators.EQUAL
    }
    const getUserRequestBody = createFirestoreRequestBody("users", [fieldFilter])
    const res = await VendereQueryApiInstance.post("", getUserRequestBody)
    return convertApiResponseUser(res.data[0])
}

export const getSellerReviews = async (
    sellerUID: string
): Promise<Array<ISellerReview>> => {
    const fieldFilter: IFirestoreFieldFilter = {
        fieldPath: "targetSellerUID",
        value: sellerUID,
        op: firestoreQueryOperators.EQUAL
    }
    const sellerReviewsRequestBody = createFirestoreRequestBody("seller_review", [fieldFilter])
    const res = await VendereQueryApiInstance.post("", sellerReviewsRequestBody)

    return convertApiResponseSellerReviews(res.data)
}

export const getUserByUIDs = async (UIDs: Array<string>): Promise<Array<IUserInfo>> => {
    const promiseArray = UIDs.map(UID => getUserByUID(UID))
    return await Promise.all(promiseArray)
}

export const createUser = async (userData: IUserInfo): Promise<IUserInfo> => {
    const postParams = {
        fields: {
            uid: { stringValue: userData.uid },
            name: { stringValue: userData.name },
        }
    }
    const response = await VendereApiInstance.post('users', postParams)
    return convertApiResponseUser(response.data)
}
