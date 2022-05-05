// vuex.d.ts
import { Store } from 'vuex'

import { ProductsState } from '@/store/modules/Product'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    ProductModule: ProductsState
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
