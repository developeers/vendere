import store from '../index'
import { IProductInfo } from '@/services/interfaces/IProduct'

export interface ProductsState {
    products: Array<IProductInfo>
}

import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'

@Module({ dynamic: true, store: store, name: 'ProductModule' })
class ProductModule extends VuexModule {
  private _products: Array<IProductInfo> = []

  @Mutation
  setProductsList(productsList: Array<IProductInfo>) {
    this._products = productsList
  }
  @Mutation
  addProduct(product: IProductInfo) {
    this._products.push(product)
  }

  get productsList() {
      return this._products
  }
}

export default getModule(ProductModule)