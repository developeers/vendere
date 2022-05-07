<template>
  <div class="container">
    <ProductCard v-for="(product, index) in productsList" :product="product" :key="index"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import ProductCard from '@/components/product/ProductCard.vue'
import { IProductInfo } from '@/services/interfaces/IProduct'
import { getProductsList } from '@/services/vendereApi/VendereApiProduct'
import ProductModule from '@/store/modules/Product'

export default defineComponent({
  name: 'HomeView',
  components: {
    ProductCard,
  },
  setup() {
    const productsList = computed(() => {
      const filteredProductsList = ProductModule.productsList
      if (filteredProductsList.length > 0 || ProductModule.searchKeyword.length > 0) {
        return filteredProductsList
      }
      return ProductModule.allProductsList
    })
    return {
      productsList
    }
  },
  mounted() {
    getProductsList().then((productsList: Array<IProductInfo>) => {
      console.log('Get products list: ', productsList)
      ProductModule.setProductsList(productsList)
      ProductModule.setAllProductsList(productsList)
    })
  }
});
</script>

<style scoped>
.container {
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
</style>