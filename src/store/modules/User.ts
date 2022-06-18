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

const authTokenLocalStorageKey = "auth_token";

@Module({ dynamic: true, store: store, name: 'UserModule' })
class UserModule extends VuexModule {
  private _userInfoList: Array<IUserInfo> = []
  private _authToken: string = localStorageUtils.getItem(authTokenLocalStorageKey) ?? "";

  @Mutation
  addUserInfo(userInfo: IUserInfo) {
    this._userInfoList.push(userInfo)
  }
  @Mutation
  setAuthToken(authToken: string | null) {
    if (authToken) {
      localStorageUtils.setItem(authTokenLocalStorageKey, authToken);
      this._authToken = authToken;
    } else {
      localStorageUtils.removeItem(authTokenLocalStorageKey);
      this._authToken = "";
    }
  }

  get userInfo() {
    return (hashId: string) => this._userInfoList.find((userInfo) => userInfo.hashId == hashId)
  }
  get authToken() {
    return this._authToken;
  }
}

export default getModule(UserModule)
