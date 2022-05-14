import VendereApiInstance from './VendereApiBase'
import { IUserInfo } from "../interfaces/IUser"
import { convertApiResponseUser } from '../utils/apiUtils'

export const getUserByHashId = async (hashId: string): Promise<IUserInfo> => {
    const res = await VendereApiInstance.get(`users/${hashId}`)
    return convertApiResponseUser(res.data)
}
