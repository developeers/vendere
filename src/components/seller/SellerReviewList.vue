<template>
  <div v-if="!isLoading" class="seller-review-list-container">
    <div id="prev-button"></div>
    <div id="next-button"></div>
    <div class="seller-review-list">
      <SellerReview
        v-for="(review, index) in reviews"
        :key="index"
        :review="review"
      />
    </div>
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
  position: relative;
  width: fit-content;
  margin: 0 auto;
}
.seller-review-list {
  width: 788px; /* reviewItemWidth x 5 + gap x 4 */
  display: flex;
  gap: 27px;
  overflow-x: hidden;
  padding: 7px;
}
#prev-button,
#next-button {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-top: 5px solid cadetblue;
  border-right: 5px solid cadetblue;
  border-top-right-radius: 5px;
  cursor: pointer;
}
#prev-button {
  left: -50px;
  transform: rotate(-135deg);
}
#next-button {
  right: -50px;
  transform: rotate(45deg);
}
</style>
