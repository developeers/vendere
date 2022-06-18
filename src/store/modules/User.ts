import { User } from "@firebase/auth"

import store from '../index'
import { IUserInfo } from '@/services/interfaces/IUser'
import localStorageUtils from '@/services/utils/localStorageUtils'

export interface UserState {
  name: string
  hashId?: string
  averageReview: number
  numOfReviews: number
  imageUrl?: string
}

import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'

const firebaseUserLocalStorageKey = "vendere_firebase-user"

@Module({ dynamic: true, store: store, name: 'UserModule' })
class UserModule extends VuexModule {
  private _userInfoList: Array<IUserInfo> = []
  private _firebaseUser: User | undefined = localStorageUtils.getItem(firebaseUserLocalStorageKey)

  @Mutation
  addUserInfo(userInfo: IUserInfo) {
    this._userInfoList.push(userInfo)
  }
  @Mutation
  setFirebaseUser(firebaseUser?: User) {
    if (firebaseUser) {
      this._firebaseUser = firebaseUser
      localStorageUtils.setItem(firebaseUserLocalStorageKey, firebaseUser)
    } else {
      this._firebaseUser = undefined
      localStorageUtils.removeItem(firebaseUserLocalStorageKey)
    }
  }

  get userInfo() {
    return (hashId: string) => this._userInfoList.find((userInfo) => userInfo.hashId == hashId)
  }
  get firebaseUser() {
    return this._firebaseUser
  }
}

export default getModule(UserModule)
