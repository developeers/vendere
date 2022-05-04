import { IProductInfo } from '@/services/interfaces/IProduct'

interface ProductsState {
    products: Array<IProductInfo>
}

export const products = {
    state: {
        products: []
    },
    mutations: {
        addProduct(state: ProductsState, product: IProductInfo) {
            state.products.push(product)
        }
    },
    getters: {
        productsList (state: ProductsState) {
            return state.products
        }
    },
    actions: {
    }
}
