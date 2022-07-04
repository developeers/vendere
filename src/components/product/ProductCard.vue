<template>
  <div class="product-card-container" @click="navToDetailPage">
    <img :src="product.imageUrls[0]" alt="Product image" />
    <div class="product-info">
      <div class="product-name">{{ product.name }}</div>
      <div class="product-price">¥{{ product.price }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import { IProductInfo } from "@/services/interfaces/IProduct";

export default defineComponent({
  props: {
    product: {
      type: Object as PropType<IProductInfo>,
      required: true,
    },
  },
  methods: {
    navToDetailPage() {
      this.$router.push({
        name: "ProductDetail",
        params: { hashId: this.product.hashId },
      });
    },
  },
});
</script>

<style scoped>
.product-card-container {
  max-width: 270px;
  width: 100%;
  border-radius: 5px;
  margin: 0 auto;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
img {
  width: 100%;
  height: 180px;
  border-radius: 4px;
}
.product-info {
  position: relative;
  min-width: 180px;
  max-width: 300px;
}
.product-name {
  text-align: left;
}
.product-price {
  position: absolute;
  top: -52px;
  font-style: italic;
  font-weight: bold;
  color: white;
  background: #7d7d7d;
  opacity: 0.7;
  padding: 6px 15px 6px 10px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.product-update-info {
  font-size: 15px;
}
</style>
