export interface IProductInfo {
    name: string
    price: number
    sellerUID: string
    updatedAt: string
    hashId?: string
    imageUrl: string
}

export const DefaultProductInfo: IProductInfo = {
    name: "",
    price: 0,
    sellerUID: "",
    updatedAt: "",
    imageUrl: ""
}
