import store from '../index'
import { IUserInfo } from '@/services/interfaces/IUser'

import { User } from '@firebase/auth'

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
  private _currentUser: User | null = null

  @Mutation
  addUserInfo(userInfo: IUserInfo) {
    this._userInfoList.push(userInfo)
  }
  @Mutation
  setCurrentUser(user: User) {
    this._currentUser = user
  }

  get userInfo() {
    return (hashId: string) => this._userInfoList.find((userInfo) => userInfo.hashId == hashId)
  }
  get currentUser() {
    return this._currentUser
  }
}

export default getModule(UserModule)
