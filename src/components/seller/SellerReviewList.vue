<template>
  <div v-if="!isLoading" class="seller-review-list-container">
    <SellerReview
      v-for="(review, index) in reviews"
      :key="index"
      :review="review"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SellerReview from "./SellerReview.vue";
import {
  getSellerReviews,
  getUsersByHashIds,
} from "@/services/vendereApi/VendereApiUser";
import { IReviewInfo } from "@/services/interfaces/ISellerReview";

export default defineComponent({
  props: {
    sellerHashId: {
      type: String,
    },
  },
  data() {
    const isLoading = true;
    const reviews: Array<IReviewInfo> = [];
    return {
      reviews,
      isLoading,
    };
  },
  components: {
    SellerReview,
  },
  watch: {
    sellerHashId(newHashId) {
      getSellerReviews(newHashId).then((reviews) => {
        const reviewUserHashIds = reviews.map(
          (review) => review.reviewUserHashId
        );
        getUsersByHashIds(reviewUserHashIds)
          .then((users) => {
            users.forEach((user) => {
              const reviewContent = reviews.find(
                (review) => review.reviewUserHashId === user.hashId
              )!.content;
              this.reviews.push({
                content: reviewContent,
                reviewUserName: user.name,
                reviewUserImageUrl: user.imageUrl!,
              });
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      });
    },
  },
});
</script>

<style scoped>
.seller-review-list-container {
  display: flex;
  gap: 27px;
}
</style>
