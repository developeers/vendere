<template>
  <div class="container">
    <ProductCard v-for="index in 5" :product="sampleProduct" :key="index"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import ProductCard from '@/components/product/ProductCard.vue'
import { IProductInfo } from '@/services/interfaces/IProduct'

export default defineComponent({
  name: 'HomeView',
  components: {
    ProductCard,
  },
  setup() {
    const sampleProduct: IProductInfo = {
      name: 'Old bicycle',
      price: 9000,
      owner: {
        name: 'Josephs'
      },
      updatedAt: '2021-05-01'
    }

    return {
      sampleProduct
    }
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