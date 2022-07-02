<template>
  <simple-nav-bar></simple-nav-bar>
  <div class="product-create-container">
    <h3>Sell your item</h3>
    <div class="create-product-form">
      <h4>Description</h4>
      <div class="product-input-container">
        <label for="product-name">What are you selling?</label>
        <input
          type="text"
          id="product-name"
          name="product-name"
          v-model="product.name"
        />
        <label for="product-price">What is the price of your item?</label>
        <input
          type="text"
          id="product-price"
          name="product-price"
          v-model="product.price"
        />
        <label for="roduct-description">Tell us about your item</label>
        <input
          type="text"
          id="product-description"
          name="product-description"
          v-model="product.price"
        />
      </div>

      <h4>Details</h4>
      <div class="product-input-container">
        <div class="select-input">
          <label for="product-category">Category</label>
          <select name="product-category" id="product-category">
            <option value="">Select a category</option>
            <option value="computerAccessories">Computer Accessories</option>
            <option value="housewares">Housewares</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
          </select>
        </div>

        <div class="select-input">
          <label for="product-condition">Condition</label>
          <select name="product-condition" id="product-condition">
            <option value="">Select condition</option>
            <option value="likeNew">Like New</option>
            <option value="good">Good</option>
            <option value="acceptable">Acceptable</option>
            <option value="poorCondition">Poor Condition</option>
          </select>
        </div>
      </div>

      <div class="submit-button" @click="submitNewProduct">Submit</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { DefaultProductInfo } from "@/services/interfaces/IProduct";
import { submitProduct } from "@/services/vendereApi/VendereApiProduct";

import SimpleNavBar from "@/components/navigation/SimpleNavBar.vue";

export default defineComponent({
  setup() {
    const product = DefaultProductInfo;

    return { product };
  },
  components: {
    SimpleNavBar,
  },
  methods: {
    submitNewProduct() {
      console.log("Create product: ", this.product);
      submitProduct(this.product);
      this.$router.push({ name: "home" });
    },
  },
});
</script>

<style scoped>
.product-create-container {
  margin-top: 80px;
}

.create-product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 40vw;
  max-width: 300px;
  margin: 0 auto;
}
.product-input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
}
.product-input-container > *:nth-child(even):not(:last-child) {
  margin-bottom: 25px;
}
.create-product-form > h4 {
  text-align: left;
  border-bottom: 2px solid mediumvioletred;
  padding-bottom: 10px;
  margin-top: 20px;
}
.create-product-form label {
  margin-right: auto;
}
.create-product-form input {
  border: none;
  outline: none;
  border-bottom: 1px solid cadetblue;
  height: 22px;
}
.select-input {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #d5d5d5;
}
.select-input > select {
  height: 30px;
  border: none;
  outline: none;
  width: 60%;
  font-size: 14px;
  color: #676767;
}
.create-product-form > .submit-button {
  width: 100%;
  margin-top: 25px;
  border-radius: 4px;
  background: cadetblue;
  font-weight: bold;
  color: whitesmoke;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
}
.create-product-form > .submit-button:hover {
  opacity: 0.9;
}
</style>
