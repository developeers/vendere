<template>
  <div>
    <ProductCard :product="sampleProduct" />
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
