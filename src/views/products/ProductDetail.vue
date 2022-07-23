<template>
  <div
    v-if="!isLoading"
    class="product-detail-container"
    ref="productDetailContainer"
  >
    <div class="product-image-carousel" ref="productImageCarousel">
      <ProductImageOverview
        v-for="(imageUrl, index) in productDetail.imageUrls"
        :key="index"
        :thumbnailIndex="index"
        :imageUrl="imageUrl"
      />
    </div>
    <div class="product-description" ref="productDescription">
      <div class="product-summary">
        <h2>{{ productDetail.name }}</h2>
        <router-link
          :to="{
            name: routeNames.SELLER_DETAIL,
            params: { uid: sellerInfo.uid },
          }"
          >{{ sellerInfo.name }}</router-link
        >
        <h2 class="product-price">¥{{ productDetail.price }}</h2>
        <div class="custom-button add-to-cart-button">Add to cart</div>
        <div class="custom-button order-button">Buy now</div>
      </div>

      <div class="product-overview">
        <h4>Overview</h4>
        <div class="overview-info-container">
          <p>Condition</p>
          <p>{{ convertProductCondition(productDetail.condition) }}</p>
        </div>
        <div class="overview-info-container">
          <p>Category</p>
          <p>{{ convertProductCategory(productDetail.category) }}</p>
        </div>
        <h4>Details</h4>
        <div class="overview-info-container">
          <p>Posted</p>
          <p>{{ convertedDate }}</p>
        </div>
        <h4>Description</h4>
        <p>{{ productDetail.description }}</p>
      </div>
    </div>
  </div>
  <div v-if="!isLoading">
    <SellerInfo :uid="sellerInfo.uid" />
    <SellerReviewList :sellerUID="sellerInfo.uid" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

import ProductImageOverview from "@/components/product/ProductImageOverview.vue";
import SellerInfo from "@/components/seller/SellerInfo.vue";
import SellerReviewList from "@/components/seller/SellerReviewList.vue";
import { getProductByHashId } from "@/services/vendereApi/VendereApiProduct";
import { DefaultProductInfo } from "@/services/interfaces/IProduct";
import { getUserByUID } from "@/services/vendereApi/VendereApiUser";
import UserModule from "@/store/modules/User";
import ProductModule from "@/store/modules/Product";
import { routeNames } from "@/router/index";
import {
  convertProductCategory,
  convertProductCondition,
  getProductImageZoomInHeight,
} from "@/services/utils/componentUtils";

export default defineComponent({
  components: {
    ProductImageOverview,
    SellerInfo,
    SellerReviewList,
  },
  setup() {
    ProductModule.setProductThumbnailIndex(0);
    return {
      routeNames,
      convertProductCondition,
      convertProductCategory,
    };
  },
  data() {
    const productDetail = DefaultProductInfo;
    const sellerInfo = reactive({});
    const isLoading = true;
    return {
      productDetail,
      sellerInfo,
      isLoading,
    };
  },
  watch: {
    isLoading(newValue) {
      if (!newValue) {
        setTimeout(() => {
          this.updateContainerHeight();
        }, 0);
      }
    },
  },
  computed: {
    convertedDate(): string {
      return this.productDetail.updatedAt.slice(0, 10);
    },
  },
  created() {
    const productHashId = this.$route.params.hashId as string;
    getProductByHashId(productHashId).then((product) => {
      if (!product) {
        return;
      }
      this.productDetail = product;
      const sellerInfo = UserModule.userInfo(product.sellerUID);
      if (sellerInfo) {
        this.sellerInfo = sellerInfo;
        this.isLoading = false;
      } else {
        getUserByUID(product.sellerUID).then((sellerInfo) => {
          if (sellerInfo) {
            UserModule.addUserInfo(sellerInfo);
            this.sellerInfo = sellerInfo;
            this.isLoading = false;
          }
        });
      }
    });
  },
  methods: {
    updateContainerHeight() {
      if (this.isLoading) {
        return;
      }
      const productImageZoomInHeight = getProductImageZoomInHeight();

      (this.$refs.productDetailContainer as HTMLElement).style.minHeight =
        productImageZoomInHeight + 50 + "px";
      (this.$refs.productImageCarousel as HTMLElement).style.top =
        productImageZoomInHeight + 10 + "px";
      (this.$refs.productImageCarousel as HTMLElement).style.visibility =
        "initial";

      if (window.innerWidth <= 768) {
        (this.$refs.productDescription as HTMLElement).style.top =
          productImageZoomInHeight + 30 + "px";
        (this.$refs.productDescription as HTMLElement).style.marginBottom =
          productImageZoomInHeight + 70 + "px";
      } else {
        (this.$refs.productDescription as HTMLElement).style.top = "";
        (this.$refs.productDescription as HTMLElement).style.marginBottom = "";
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.updateContainerHeight);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateContainerHeight);
  },
});
</script>

<style scoped>
.product-detail-container {
  display: flex;
  min-height: 450px;
  gap: 50px;
}
.product-image-carousel {
  width: 60%;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
  top: 400px;
  visibility: hidden;
}
.product-image-carousel > img {
  width: 100%;
}
.product-description {
  position: relative;
  margin: 0 auto;
  text-align: left;
  width: calc(40% - 50px);
}
.product-summary {
  padding-bottom: 20px;
  border-bottom: 1px solid #e4e4e4;
}
.product-summary > h2 {
  font-size: 28px;
}
.product-summary > a {
  text-decoration: none;
  font-weight: bold;
  color: cadetblue;
}
.product-price {
  color: brown;
  margin-top: 20px;
}
.product-description .custom-button {
  width: 100%;
  height: 36px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 5px;
  background: whitesmoke;
  box-sizing: border-box;
}
.product-overview > h4,
.product-overview > p:last-child {
  margin-top: 10px;
}
.overview-info-container {
  display: flex;
  margin: 10px 0;
}
.overview-info-container > p:first-child {
  width: 140px;
  color: grey;
}
.add-to-cart-button {
  color: cadetblue;
  border: 2px solid cadetblue;
}
.add-to-cart-button:hover {
  color: whitesmoke;
  background: cadetblue;
}
.order-button {
  color: mediumvioletred;
  border: 2px solid mediumvioletred;
}
.order-button:hover {
  color: whitesmoke;
  background: mediumvioletred;
}
@media screen and (max-width: 768px) {
  .product-detail-container {
    display: block;
  }
  .product-image-carousel {
    width: 100%;
  }
  .product-description {
    width: 100%;
  }
}
</style>
