import store from '../index'
import { IUserInfo } from '@/services/interfaces/IUser'

export interface UserState {
    name: string
    hashId?: string
    averageReview: number
    numOfReviews: number
    imageUrl?: string
}

import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'

@Module({ dynamic: true, store: store, name: 'UserModule' })
class UserModule extends VuexModule {
  private _userInfoList: Array<IUserInfo> = []

  @Mutation
  addUserInfo(userInfo: IUserInfo) {
    this._userInfoList.push(userInfo)
  }

  get userInfo() {
    return (hashId: string) => this._userInfoList.find((userInfo) => userInfo.hashId == hashId)
  }
}

export default getModule(UserModule)
