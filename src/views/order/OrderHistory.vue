<template>
  <div class="order-history-container">
    <h2>Your Orders</h2>
    <order-item
      v-for="(order, index) in orderList"
      :order="order"
      :key="index"
    ></order-item>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderItem from "./OrderItem.vue";
import { IOrderInfo } from "@/services/interfaces/IOrder";

export default defineComponent({
  components: {
    OrderItem,
  },
  setup() {
    const numOfOrders = Math.floor(Math.random() * 5) + 5;
    const orderList: Array<IOrderInfo> = [];
    for (let i = 1; i <= numOfOrders; i++) {
      const randTotal = Math.floor(Math.random() * 100) * 500 + 1000;
      const today = new Date().toISOString().slice(0, 10);
      const order: IOrderInfo = {
        orderId: i + 120,
        total: randTotal,
        date: today,
        itemName: "Item Name #" + i,
      };
      orderList.push(order);
    }
    return {
      orderList,
    };
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
