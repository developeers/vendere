// vuex.d.ts
import { Store } from 'vuex'

import { ProductsState } from '@/store/modules/Product'
import { SellerState } from '@/store/modules/Seller'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    ProductModule: ProductsState
    SellerModule: SellerState
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
