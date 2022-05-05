<template>
    <h2>Product create</h2>
    <div class="create-product-form">
        <label for="product-name">Product Name</label>
        <input type="text" id="product-name" name="product-name" placeholder="..." v-model="product.name">
        <label for="product-price">Product Price</label>
        <input type="text" id="product-price" name="product-price" v-model="product.price">
        <label for="owner-name">Owner Name</label>
        <input type="text" id="owner-name" name="owner-name" placeholder="..." v-model="product.owner.name">
        <div class="submit-button" @click="submitNewProduct">Create</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { IProductInfo } from '@/services/interfaces/IProduct'

export default defineComponent({
    setup() {
        const product: IProductInfo = {
            name: "",
            price: 0,
            owner: {name : ""},
            updatedAt: ""
        }

        return { product }
    },
    methods: {
        submitNewProduct() {
            console.log('Create product: ', this.product)
        }
    }
})
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
