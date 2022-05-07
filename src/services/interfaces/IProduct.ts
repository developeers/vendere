export interface IProductInfo {
    name: string
    price: number
    owner: Record<string, unknown>
    updatedAt: string
    hashId?: string
}

export const DefaultProductInfo: IProductInfo = {
    name: "",
    price: 0,
    owner: {name: ""},
    updatedAt: ""
}