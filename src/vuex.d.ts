// vuex.d.ts
import { Store } from 'vuex'

import { ProductsState } from '@/store/modules/Product'
import { UserState } from '@/store/modules/User'

declare module '@vue/runtime-core' {
  // declare your own store states
  interface State {
    ProductModule: ProductsState
    UserModule: UserState
  }

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}
