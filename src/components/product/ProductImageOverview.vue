<template>
<div class="carousel-item-container">
    <img :src="imageUrl" :id="thumbnailElementId" :class="{'selected-thumbnail': selectedFlag}" alt="Product image">
    <div class="product-image-zoom-in" :class="{ 'show': selectedFlag}">
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
        const selectedFlag = computed(() => ProductModule.productThumbnailIndex === props.thumbnailIndex)
        return {
            thumbnailElementId,
            selectedFlag
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
    cursor: pointer;
}
.carousel-item-container > img.selected-thumbnail {
    box-shadow: 0 0 5px 4px grey;
}
.product-image-zoom-in {
    display: none;
    position: absolute;
    left: 0;
    top: -400px;
}
.product-image-zoom-in > img {
    width: 590px;
    height: 390px;
}
.show {
    display: block !important;
}
.product-image-zoom-in {
    display: none;
}
</style>