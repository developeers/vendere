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
  private _sellerInfo: ISellerInfo | undefined

  @Mutation
  setSellerInfo(sellerInfo: ISellerInfo) {
    this._sellerInfo = sellerInfo
  }

  get sellerInfo() {
    return this._sellerInfo
  }
}

export default getModule(SellerModule)