export interface IProductInfo {
    name: string
    price: number
    description: string
    category: string
    condition: string
    sellerUID: string
    updatedAt: string
    hashId?: string
    imageUrls: string[]
}

export const DefaultProductInfo: IProductInfo = {
    name: "",
    price: 0,
    description: "",
    category: "",
    condition: "",
    sellerUID: "",
    updatedAt: "",
    imageUrls: [""]
}
