<template>
  <div
    class="carousel-item-container"
    :class="{ 'selected-thumbnail': selectedFlag }"
  >
    <img :src="imageUrl" alt="Product image" @mouseover="zoomInProductImage" />
    <div
      class="product-image-zoom-in"
      :class="{ displayImage: selectedFlag }"
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
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dddddd;
  border-radius: 3px;
  cursor: pointer;
}
.carousel-item-container > img {
  max-width: 100%;
  max-height: 100%;
}
.carousel-item-container.selected-thumbnail {
  box-shadow: 0 0 7px 3px cadetblue;
}
.product-image-zoom-in {
  display: none;
  position: absolute;
  left: 0;
  right: 0;
  top: -400px;
  width: 100%;
  height: 480px;
  box-shadow: 0 0 7px 3px cadetblue;
  border-radius: 3px;
}
.product-image-zoom-in > img {
  max-width: 100%;
  max-height: 100%;
}
@media screen and (max-width: 1280px) {
  .product-image-zoom-in {
    height: 420px;
  }
}
@media screen and (max-width: 992px) {
  .product-image-zoom-in {
    height: 360px;
  }
}
@media screen and (max-width: 768px) {
  .product-image-zoom-in {
    height: 450px;
  }
}
@media screen and (max-width: 600px) {
  .product-image-zoom-in {
    height: 300px;
  }
}
.displayImage {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
