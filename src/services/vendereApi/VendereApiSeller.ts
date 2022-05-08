import VendereApiInstance from './VendereApiBase'
import { ISellerInfo } from "../interfaces/ISeller"
import { convertApiResponseSeller } from '../utils/apiUtils'

export const getSellerByHashId = async (hashId: string): Promise<ISellerInfo> => {
    const res = await VendereApiInstance.get(`sellers/${hashId}`)
    return convertApiResponseSeller(res.data)
}