<template>
  <div class="product-list-container">
    <ProductCard
      v-for="(product, index) in productsList"
      :product="product"
      :key="index"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import ProductCard from "@/components/product/ProductCard.vue";
import ProductModule from "@/store/modules/Product";

export default defineComponent({
  name: "HomeView",
  components: {
    ProductCard,
  },
  setup() {
    const productsList = computed(() => ProductModule.allProductsList);
    return {
      productsList,
    };
  },
});
</script>

<style scoped>
.product-list-container {
  margin: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
@media screen and (max-width: 1096px) {
  .product-list-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 850px) {
  .product-list-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media screen and (max-width: 480px) {
  .product-list-container {
    margin: 0;
    gap: 15px;
  }
}
</style>
