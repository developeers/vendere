<template>
  <simple-nav-bar></simple-nav-bar>
  <h3>Provide information about your product</h3>
  <div class="create-product-form">
    <label for="product-name">Product Name</label>
    <input
      type="text"
      id="product-name"
      name="product-name"
      placeholder="..."
      v-model="product.name"
    />
    <label for="product-price">Product Price</label>
    <input
      type="text"
      id="product-price"
      name="product-price"
      v-model="product.price"
    />
    <div class="submit-button" @click="submitNewProduct">Create</div>
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
.create-product-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 40vw;
  max-width: 300px;
  margin: 0 auto;
  margin-top: 20px;
}
.create-product-form > label {
  margin-right: auto;
}
.create-product-form > input {
  border: none;
  outline: none;
  border-bottom: 2px solid cadetblue;
  height: 22px;
}
.create-product-form > .submit-button {
  width: 40%;
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 4px;
  background: cadetblue;
  font-weight: bold;
  color: whitesmoke;
}
</style>
