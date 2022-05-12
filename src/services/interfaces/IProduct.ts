export interface IProductInfo {
    name: string
    price: number
    sellerHashId: string
    updatedAt: string
    hashId?: string
    imageUrl: string
}

export const DefaultProductInfo: IProductInfo = {
    name: "",
    price: 0,
    sellerHashId: "",
    updatedAt: "",
    imageUrl: ""
}