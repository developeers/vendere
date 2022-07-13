<template>
  <div class="order-history-container">
    <h2>Your Orders</h2>
    <order-item v-for="index in 10" :key="index"></order-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderItem from "./OrderItem.vue";

export default defineComponent({
  components: {
    OrderItem,
  },
});
</script>


<style scoped>
.order-history-container {
  width: 80%;
  max-width: 900px;
  min-width: 600px;
  text-align: left;
  margin: 0 auto;
}
.order-history-container > h2 {
  color: mediumvioletred;
  padding-bottom: 18px;
  border-bottom: 1px solid #dadada;
}
</style>
