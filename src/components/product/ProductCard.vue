<template>
    <div class="product-card-container" @click="navToDetailPage">
        <img :src="product.imageUrl" alt="Product image">
        <div class="product-info">
            <div class="product-name"> {{ product.name }} </div>
            <div class="product-price"> {{product.price}}¥</div>
            <i class="product-update-info"> Updated at {{ product.updatedAt }} by <span style="font-weight: bold"> Michael Scott </span> </i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IProductInfo } from '@/services/interfaces/IProduct'

export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProductInfo>,
            required: true
        }
    },
    methods: {
        navToDetailPage() {
            this.$router.push({name: 'ProductDetail', params: {hashId: this.product.hashId}})
        }
    }
})
</script>

<style scoped>
.product-card-container {
    max-width: 300px;
    border: 1px solid #b8b8b8;
    border-radius: 5px;
    margin: 0 auto;
    cursor: pointer;
}
img {
    width: 95%;
}
.product-info {
    min-width: 180px;
    max-width: 300px;
    border-top: solid 1px #b8b8b8;
}
.product-name {
    font-weight: bold;
}
.product-price {
    font-style: italic;
    font-size: 14px;
}
.product-update-info {
    font-size: 15px;
}
</style>
