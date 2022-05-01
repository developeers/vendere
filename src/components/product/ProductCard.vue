<template>
    <div class="container">
        <img src="../../assets/bike.png" alt="Product image">
        <div class="product-info">
            <div class="product-name"> {{ product.name }} </div>
            <div class="product-price"> {{product.price}}¥</div>
            <i class="product-update-info"> Updated at {{ product.updatedAt }} by <span style="font-weight: bold"> {{product.owner.name}} </span> </i>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { PropType } from '@vue/composition-api'

import { IProductInfo } from '@/services/interfaces/IProduct'

export default defineComponent({
    props: {
        product: {
            type: Object as PropType<IProductInfo>,
            required: true
        }
    }
})
</script>

<style scoped>
.container {
    width: 25vw;
    max-width: 300px;
    border: 1px solid #b8b8b8;
    border-radius: 5px;
}
img {
    width: 95%;
}
.product-info {
    width: 25vw;
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
