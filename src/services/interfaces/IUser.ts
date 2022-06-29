export interface IUserInfo {
    uid: string // Firebase Auth's uid
    name: string
    averageReview?: number
    numOfReviews?: number
    imageUrl?: string
}
