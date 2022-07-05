<template>
  <div class="product-detail-container">
    <div class="product-image-carousel">
      <ProductImageOverview
        v-for="(imageUrl, index) in productDetail.imageUrls"
        :key="index"
        :thumbnailIndex="index"
        :imageUrl="imageUrl"
      />
    </div>
    <div class="product-description">
      <h2>{{ productDetail.name }}</h2>
      <h5 class="product-price">{{ productDetail.price }} ¥</h5>
      <p v-if="sellerInfo.name">
        Uploaded by {{ sellerInfo.name }} at {{ productDetail.updatedAt }}
      </p>
      <div class="custom-button add-to-cart-button">Add to cart</div>
      <div class="custom-button order-button">Buy now</div>
    </div>
  </div>
  <SellerInfo :uid="sellerInfo.uid" />
  <SellerReviewList :sellerUID="sellerInfo.uid" />
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

export default defineComponent({
  components: {
    ProductImageOverview,
    SellerInfo,
    SellerReviewList,
  },
  setup() {
    ProductModule.setProductThumbnailIndex(0);
  },
  data() {
    const productDetail = DefaultProductInfo;
    const sellerInfo = reactive({});
    return {
      productDetail,
      sellerInfo,
    };
  },
  mounted() {
    const productHashId = this.$route.params.hashId as string;
    getProductByHashId(productHashId).then((product) => {
      this.productDetail = product;
      const sellerInfo = UserModule.userInfo(product.sellerUID);
      if (sellerInfo) {
        this.sellerInfo = sellerInfo;
      } else {
        getUserByUID(product.sellerUID).then((sellerInfo) => {
          UserModule.addUserInfo(sellerInfo);
          this.sellerInfo = sellerInfo;
        });
      }
    });
  },
});
</script>

<style scoped>
.product-detail-container {
  display: flex;
  height: 450px;
  gap: 30px;
}
.product-image-carousel {
  width: 60%;
  height: fit-content;
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
  top: 400px;
}
.product-image-carousel > img {
  width: 100%;
}
.product-description {
  margin: 0 auto;
  width: calc(40% - 30px);
}
.product-price {
  color: brown;
  font-style: italic;
}
.product-description .custom-button {
  width: 50%;
  height: 33px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 5px;
  background: whitesmoke;
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
</style>
