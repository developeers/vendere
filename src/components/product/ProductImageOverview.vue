<template>
<div class="carousel-item-container">
    <img :src="imageUrl" :id="thumbnailElementId" alt="Product image">
    <div class="product-image-zoom-in" :style="{'display':displayFlag}">
        <img :src="imageUrl" alt="Product image">
    </div>
</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import ProductModule from '@/store/modules/Product'

export default defineComponent({
    props: {
        thumbnailIndex: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const thumbnailElementId = "product-thumbnail-" + props.thumbnailIndex
        const displayFlag = computed(() => ProductModule.productThumbnailIndex === props.thumbnailIndex ? "block" : "none")
        return {
            thumbnailElementId , 
            displayFlag
        }
    },
    mounted() {
        document.getElementById(this.thumbnailElementId)!.addEventListener("mouseover", () => {
            ProductModule.setProductThumbnailIndex(this.thumbnailIndex)
        })
    },
})
</script>


<style scoped>
.carousel-item-container {
    width: 60px;
}
.carousel-item-container > img {
    width: 100%;
}
.product-image-zoom-in {
    display: none;
    position: absolute;
    left: 0;
    top: -400px;
}
.product-image-zoom-in > img {
    width: 100%;
    height: 390px;
}
</style>