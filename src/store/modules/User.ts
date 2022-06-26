import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { IUserInfo } from '@/services/interfaces/IUser';
import localStorageUtils from '@/services/utils/localStorageUtils';
import { User } from '@firebase/auth';

import store from '../index';

export interface UserState {
  name: string
  hashId?: string
  averageReview: number
  numOfReviews: number
  imageUrl?: string
}

const accessTokenLocalStorageKey = "vendere_access-token"
const refreshTokenLocalStorageKey = "vendere_refresh-token"

@Module({ dynamic: true, store: store, name: 'UserModule' })
class UserModule extends VuexModule {
  private _userInfoList: Array<IUserInfo> = []
  private _firebaseUser: User | null = null
  private _accessToken: string | undefined = localStorageUtils.getItem(accessTokenLocalStorageKey)
  private _refreshToken: string | undefined = localStorageUtils.getItem(refreshTokenLocalStorageKey)
  private _loginUser: IUserInfo | null = null
  private _isUserBeingCreated = false

  @Mutation
  addUserInfo(userInfo: IUserInfo) {
    this._userInfoList.push(userInfo)
  }
  @Mutation
  setFirebaseUser(user: User) {
    this._firebaseUser = user
  }
  @Mutation
  setLoginUser(user: IUserInfo) {
    this._loginUser = user
  }
  @Mutation
  setAccessToken(accessToken?: string) {
    if (accessToken) {
      this._accessToken = accessToken
      localStorageUtils.setItem(accessTokenLocalStorageKey, accessToken)
    } else {
      this._accessToken = undefined
      localStorageUtils.removeItem(accessTokenLocalStorageKey)
    }
  }
  @Mutation
  setRefreshToken(refreshToken?: string) {
    if (refreshToken) {
      this._refreshToken = refreshToken
      localStorageUtils.setItem(refreshTokenLocalStorageKey, refreshToken)
    } else {
      this._refreshToken = undefined
      localStorageUtils.removeItem(refreshTokenLocalStorageKey)
    }
  }
  @Mutation
  setIsUserBeingCreated(status: boolean) {
    this._isUserBeingCreated = status
  }

  get userInfo() {
    return (uid: string) => this._userInfoList.find((userInfo) => userInfo.uid == uid)
  }
  get firebaseUser() {
    return this._firebaseUser
  }
  get loginUser() {
    return this._loginUser
  }
  get accessToken() {
    return this._accessToken
  }
  get refreshToken() {
    return this._refreshToken
  }
  get isLogin() {
    return !!this._accessToken
  }
  get isUserBeingCreated() {
    return this._isUserBeingCreated
  }
}

export default getModule(UserModule)
