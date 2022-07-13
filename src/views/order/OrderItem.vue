<template>
  <div class="order-item-container">
    <div class="order-meta-data">
      <div class="order-date">
        ORDER PLACED <br />
        {{ order.date }}
      </div>
      <div class="order-total">
        TOTAL <br />
        ¥{{ order.total }}
      </div>
      <div class="order-id">ORDER #{{ order.orderId }}</div>
    </div>
    <div class="order-detail-container">
      <div class="order-item-detail">
        <img src="@/assets/app_logo.png" alt="" />
        <div class="order-item-name">
          <p>{{ order.itemName }}</p>
          <div class="buttons-container">
            <button class="buy-again">Buy Again</button>
            <button class="view-item">View your item</button>
          </div>
        </div>
      </div>
      <div class="order-operation">
        <button>Return Item</button>
        <button>Write a Review</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IOrderInfo } from "@/services/interfaces/IOrder";

export default defineComponent({
  props: {
    order: {
      type: Object as PropType<IOrderInfo>,
      required: true,
    },
  },
});
</script>


<style scoped>
.order-item-container {
  border: 1px solid #cecece;
  border-radius: 5px;
  margin-top: 30px;
}
.order-meta-data {
  background: #f1f1f1;
  display: flex;
  gap: 25px;
  padding: 8px 15px;
  font-size: 15px;
}
.order-id {
  margin-left: auto;
}
.order-detail-container {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}
.order-item-detail {
  display: flex;
  gap: 15px;
}
.order-item-detail > img {
  width: 80px;
  height: 76px;
}
.order-item-name {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.buttons-container {
  display: flex;
  gap: 5px;
}
.buttons-container > button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  border-radius: 7px;
  padding: 7px 10px;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
}
.buttons-container > button:hover {
  opacity: 0.8;
}
.buttons-container > button:first-child {
  background: cadetblue;
  color: whitesmoke;
}
.order-operation {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.order-operation > button {
  width: 180px;
  padding: 7px 15px;
  background: white;
  border: 1px solid rgb(182, 182, 182);
  box-shadow: 0 0 3px silver;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
}
.order-operation > button:hover {
  background: #f6f6f6;
}
@media screen and (max-width: 864px) {
  .buttons-container {
    flex-direction: column;
  }
  .buttons-container > button {
    height: 25px;
  }
}
</style>
