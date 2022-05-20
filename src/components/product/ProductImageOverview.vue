<template>
  <div class="carousel-item-container">
    <img
      :src="imageUrl"
      :id="thumbnailElementId"
      :class="{ 'selected-thumbnail': selectedFlag }"
      alt="Product image"
    />
    <div
      class="product-image-zoom-in"
      :class="{ show: selectedFlag }"
      :id="productImageZoomInId"
    >
      <img :src="imageUrl" alt="Product image" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import ProductModule from "@/store/modules/Product";

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
    const thumbnailElementId = "product-thumbnail-" + props.thumbnailIndex;
    const productImageZoomInId =
      "product-image-zoom-in-" + props.thumbnailIndex;
    const selectedFlag = computed(
      () => ProductModule.productThumbnailIndex === props.thumbnailIndex
    );
    return {
      thumbnailElementId,
      selectedFlag,
      productImageZoomInId,
    };
  },
  mounted() {
    document
      .getElementById(this.thumbnailElementId)!
      .addEventListener("mouseover", () => {
        ProductModule.setProductThumbnailIndex(this.thumbnailIndex);
      });
    const updateHeightProductImageContainer = (): void => {
      const productImageZoomIn = document.getElementById(
        this.productImageZoomInId
      ); //as HTMLElement
      const productImageZoomInHeight = productImageZoomIn!.offsetHeight;
      if (!productImageZoomInHeight) return;

      const productDetailContainer = document.querySelector(
        ".product-detail-container"
      ) as HTMLElement;
      const productImageCarousel = document.querySelector(
        ".product-image-carousel"
      ) as HTMLElement;

      productImageCarousel.style.top = productImageZoomInHeight + 10 + "px";
      const productImageZoomIns = document.getElementsByClassName(
        "product-image-zoom-in"
        // eslint-disable-next-line no-undef
      ) as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < productImageZoomIns.length; i++) {
        productImageZoomIns[i].style.top =
          -productImageZoomInHeight - 10 + "px";
      }
      productDetailContainer.style.height =
        productImageZoomInHeight + 50 + "px";
    };
    updateHeightProductImageContainer();
    window.addEventListener("resize", updateHeightProductImageContainer);
  },
});
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
  box-shadow: 0 0 7px 3px cadetblue;
  border-radius: 3px;
}
.product-image-zoom-in {
  display: none;
}
</style>