import store from '../index'
import { ISellerInfo } from '@/services/interfaces/ISeller'

export interface SellerState {
    name: string
    hashId?: string
    averageReview: number
    numOfReviews: number
    imageUrl?: string
}

import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'

@Module({ dynamic: true, store: store, name: 'SellerModule' })
class SellerModule extends VuexModule {
  private _sellerInfoList: Array<ISellerInfo> = []

  @Mutation
  addSellerInfo(sellerInfo: ISellerInfo) {
    this._sellerInfoList.push(sellerInfo)
  }

  get sellerInfo() {
    return (hashId: string) => this._sellerInfoList.find((sellInfo) => sellInfo.hashId == hashId)
  }
}

export default getModule(SellerModule)