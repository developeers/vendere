<template>
  <div class="carousel-item-container">
    <img
      :src="imageUrl"
      :class="{ 'selected-thumbnail': selectedFlag }"
      alt="Product image"
      @mouseover="zoomInProductImage"
    />
    <div
      class="product-image-zoom-in"
      :class="{ show: selectedFlag }"
      ref="zoomInImage"
    >
      <img :src="imageUrl" alt="Product image" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ProductModule from "@/store/modules/Product";
import { getProductImageZoomInHeight } from "@/services/utils/componentUtils";

export default defineComponent({
  props: {
    thumbnailIndex: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const selectedFlag = computed(
      () => ProductModule.productThumbnailIndex === props.thumbnailIndex
    );
    return {
      selectedFlag,
    };
  },
  mounted() {
    this.updateHeightProductImageContainer();
    window.addEventListener("resize", this.updateHeightProductImageContainer);
  },
  methods: {
    updateHeightProductImageContainer() {
      const productImageZoomInHeight = getProductImageZoomInHeight();
      (this.$refs.zoomInImage as HTMLElement).style.top =
        -productImageZoomInHeight - 15 + "px";
    },
    zoomInProductImage() {
      ProductModule.setProductThumbnailIndex(this.thumbnailIndex);
    },
  },
  beforeUnmount() {
    window.removeEventListener(
      "resize",
      this.updateHeightProductImageContainer
    );
  },
});
</script>


<style scoped>
.carousel-item-container {
  width: 60px;
}
.carousel-item-container > img {
  width: 100%;
  height: 42px;
  cursor: pointer;
}
.carousel-item-container > img.selected-thumbnail {
  box-shadow: 0 0 7px 3px cadetblue;
  border-radius: 3px;
}
.product-image-zoom-in {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  top: -400px;
}
.product-image-zoom-in > img {
  width: 100%;
  height: 480px;
  box-shadow: 0 0 7px 3px cadetblue;
  border-radius: 3px;
}
@media screen and (max-width: 1280px) {
  .product-image-zoom-in > img {
    height: 420px;
  }
}
@media screen and (max-width: 992px) {
  .product-image-zoom-in > img {
    height: 360px;
  }
}
@media screen and (max-width: 768px) {
  .product-image-zoom-in > img {
    height: 300px;
  }
}
@media screen and (max-width: 600px) {
  .product-image-zoom-in > img {
    height: 240px;
  }
}
.product-image-zoom-in {
  display: none;
}
</style>