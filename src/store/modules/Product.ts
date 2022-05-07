import store from '../index'
import { IProductInfo } from '@/services/interfaces/IProduct'

export interface ProductsState {
    products: Array<IProductInfo>  // products to be displayed
    allProducts: Array<IProductInfo>  // all products received from API
    searchKeyword: string
    productThumbnailIndex: number  // index of product thumbnail to display in produc detail screen
}

import { Module, VuexModule, Mutation, getModule } from 'vuex-module-decorators'

@Module({ dynamic: true, store: store, name: 'ProductModule' })
class ProductModule extends VuexModule {
  private _products: Array<IProductInfo> = []
  private _allProducts: Array<IProductInfo> = []
  private _searchKeyword = ""
  private _productThumbnailIndex = 0

  @Mutation
  setProductsList(productsList: Array<IProductInfo>) {
    this._products = productsList
  }
  @Mutation
  setAllProductsList(productsList: Array<IProductInfo>) {
    this._allProducts = productsList
  }
  @Mutation
  addProduct(product: IProductInfo) {
    this._products.push(product)
  }
  @Mutation
  setSearchKeyWord(keyword: string) {
    this._searchKeyword = keyword
  }
  @Mutation
  setProductThumbnailIndex(index: number) {
    this._productThumbnailIndex = index
  }

  get productsList() {
    return this._products
  }
  get allProductsList() {
    return this._allProducts
  }
  get searchKeyword() {
    return this._searchKeyword
  }
  get productThumbnailIndex() {
    return this._productThumbnailIndex
  }
}

export default getModule(ProductModule)