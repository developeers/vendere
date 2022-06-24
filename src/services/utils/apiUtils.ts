import { IProductInfo } from '@/services/interfaces/IProduct';

import { ISellerReview } from '../interfaces/ISellerReview';
import { IUserInfo } from '../interfaces/IUser';
import { IApiResponse, IApiResponseDocument } from '../vendereApi/vendereApiResponse/IApiResponse';

export const firestoreQueryOperators = {
    EQUAL: "EQUAL"
}

export interface IFirestoreFieldFilter {
    fieldPath: string
    value: string
    op: string
}

export const convertApiResponseProduct = (
    response: IApiResponse
): IProductInfo => {
    const product: IProductInfo = {
        name: response.fields.name.stringValue,
        price: +response.fields.price.integerValue,
        sellerUID: response.fields.sellerUID.stringValue,
        updatedAt: response.updateTime,
        imageUrl: response.fields.imageUrl.stringValue,
        hashId: response.name.split("/").slice(-1)[0],
    }
    return product
}

export const convertApiResponseSellerReviews = (
    response: Array<IApiResponseDocument>
): Array<ISellerReview> => {
    const sellerReviews = response.map(
        (review: IApiResponseDocument): ISellerReview => {
            const sellerReview: ISellerReview = {
                targetSellerUID:
                    review.document.fields.targetSellerUID.stringValue,
                reviewUserUID: review.document.fields.reviewUserUID.stringValue,
                content: review.document.fields.content.stringValue,
            };
            return sellerReview
        }
    )
    return sellerReviews
}

export const convertApiResponseUser = (response: IApiResponseDocument): IUserInfo => {
    const user: IUserInfo = {
        uid: response.document.fields.uid.stringValue,
        name: response.document.fields.name.stringValue,
        averageReview: +response.document.fields.averageReview.doubleValue,
        numOfReviews: +response.document.fields.numOfReviews.integerValue,
        imageUrl: response.document.fields.imageUrl.stringValue,
    }
    return user
}

const createFirestoreFieldFilter = (fieldFilter: IFirestoreFieldFilter) => {
    return {
        fieldFilter: {
            field: {
                fieldPath: fieldFilter.fieldPath,
            },
            op: fieldFilter.op,
            value: {
                stringValue: fieldFilter.value,
            },
        },
    }
}

type FirestoreFormattedFieldFilter = ReturnType<typeof createFirestoreFieldFilter>

export const createFirestoreRequestBody = (collectionName: string, fieldFilters: Array<IFirestoreFieldFilter>) => {
    const firestoreRequestBody = {
        structuredQuery: {
            from: [{ collectionId: collectionName }],
            where: {
                compositeFilter: {
                    filters: [] as Array<FirestoreFormattedFieldFilter>,
                    op: "AND",
                },
            },
        },
    }
    fieldFilters.forEach(fieldFilter => {
        const formattedFieldFilter = createFirestoreFieldFilter(fieldFilter)
        firestoreRequestBody.structuredQuery.where.compositeFilter.filters.push(formattedFieldFilter)
    })
    return firestoreRequestBody
}
// Reference: https://www.jeansnyman.com/posts/google-firestore-rest-api-examples/
