import { VendereApiInstance, VendereQueryApiInstance } from "./VendereApiBase"
import { IUserInfo } from "../interfaces/IUser"
import { ISellerReview } from "../interfaces/ISellerReview"
import {
    convertApiResponseUser,
    convertApiResponseSellerReviews,
    IFirestoreFieldFilter,
    firestoreQueryOperators,
    createFirestoreRequestBody,
} from "../utils/apiUtils"

export const getUserByHashId = async (hashId: string): Promise<IUserInfo> => {
    const res = await VendereApiInstance.get(`users/${hashId}`)
    return convertApiResponseUser(res.data)
}

export const getSellerReviews = async (
    sellerHashId: string
): Promise<Array<ISellerReview>> => {
    const fieldFilter: IFirestoreFieldFilter = {
        fieldPath: "targetSellerHashId",
        value: sellerHashId,
        op: firestoreQueryOperators.EQUAL
    }
    const sellerReviewsRequestBody = createFirestoreRequestBody("seller_review", [fieldFilter])
    const res = await VendereQueryApiInstance.post("", sellerReviewsRequestBody)

    return convertApiResponseSellerReviews(res.data)
}
