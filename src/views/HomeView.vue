<template>
  <div class="container">
    <!-- <ProductCard v-for="index in 5" :product="sampleProduct" :key="index"/> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import ProductCard from '@/components/product/ProductCard.vue'
import { IProductInfo } from '@/services/interfaces/IProduct'
import { getProductsList } from '@/services/vendereApi/VendereApiProduct'
import ProductModule from '@/store/modules/Product'

export default defineComponent({
  name: 'HomeView',
  components: {
    // ProductCard,
  },
  mounted() {
    getProductsList().then((productsList: Array<IProductInfo>) => {
      console.log('Get products list: ', productsList)
      ProductModule.setProductsList(productsList)
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