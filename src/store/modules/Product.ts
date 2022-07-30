import { getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators';

import { IProductInfo } from '@/services/interfaces/IProduct';

import store from '../index';

export interface ProductsState {
  allProducts: Array<IProductInfo>; // all products received from API
  productThumbnailIndex: number; // index of product thumbnail to display in produc detail screen
}

@Module({ dynamic: true, store: store, name: "ProductModule" })
class ProductModule extends VuexModule {
  private _allProducts: Array<IProductInfo> = [];
  private _productThumbnailIndex = 0;

  @Mutation
  setAllProductsList(productsList: Array<IProductInfo>) {
    this._allProducts = productsList;
  }
  @Mutation
  setProductThumbnailIndex(index: number) {
    this._productThumbnailIndex = index;
  }

  get allProductsList() {
    return this._allProducts;
  }
  get filteredProductsList() {
    return (keyword: string) => {
      keyword = keyword.toLowerCase();
      return this._allProducts
        .filter((product) => product.name.toLowerCase().includes(keyword))
        .slice(0, 7);
    };
  }
  get productThumbnailIndex() {
    return this._productThumbnailIndex;
  }
}

export default getModule(ProductModule);
