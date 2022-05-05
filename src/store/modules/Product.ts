import { IProductInfo } from '@/services/interfaces/IProduct'

export interface ProductsState {
    products: Array<IProductInfo>
}

const ProductModule = {
    state: {
        products: [] as Array<IProductInfo>
    },
    mutations: {
        setProductsList(state: ProductsState, productsList: Array<IProductInfo>) {
            state.products = productsList
        },
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

export default ProductModule