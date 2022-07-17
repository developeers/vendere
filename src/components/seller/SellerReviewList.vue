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
  getUserByUIDs,
} from "@/services/vendereApi/VendereApiUser";
import { IReviewInfo } from "@/services/interfaces/ISellerReview";
import { getNumOfDisplayReviews } from "@/services/utils/componentUtils";

export default defineComponent({
  props: {
    sellerUID: {
      type: String,
      required: true,
    },
  },
  data() {
    const isLoading = true;
    const reviews: Array<IReviewInfo> = [];
    const numDisplayReviews = 5;
    return {
      reviews,
      isLoading,
      numDisplayReviews,
    };
  },
  components: {
    SellerReview,
  },
  methods: {
    updateNumOfDisplayReviews() {
      this.numDisplayReviews = getNumOfDisplayReviews();
    },
  },
  created() {
    window.addEventListener("resize", this.updateNumOfDisplayReviews);
    getSellerReviews(this.sellerUID).then((reviews) => {
      const reviewUserUIDs = reviews.map((review) => review.reviewUserUID);
      getUserByUIDs(reviewUserUIDs)
        .then((users) => {
          users.forEach((user) => {
            const reviewContent = reviews.find(
              (review) => review.reviewUserUID === user.uid
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
          this.numDisplayReviews = getNumOfDisplayReviews();
          // Invoke setTimeOut with timer value is 0 to run the callback function after
          // other operations on the main thread have finished (e.g., updating templates)
          setTimeout(() => {
            if (this.reviews.length <= this.numDisplayReviews) {
              return;
            }
            const prevButton = document.querySelector(
              "#prev-button"
            ) as HTMLElement;
            const nextButton = document.querySelector(
              "#next-button"
            ) as HTMLElement;
            const sellerReviewListElement = document.querySelector(
              ".seller-review-list"
            ) as HTMLElement;

            const reviewItemWidth = 136;
            const reviewItemGap = 27;
            const scrollDistance = reviewItemWidth + reviewItemGap;
            const scrollTime = 300; // ms

            let prevClickTime = Date.now();
            nextButton.style.display = "block";

            prevButton.addEventListener("click", () => {
              const clickTime = Date.now();
              if (clickTime < prevClickTime + scrollTime) {
                return;
              }
              sellerReviewListElement.scrollBy(-scrollDistance, 0);
              prevClickTime = clickTime;
              nextButton.style.display = "block";
              setTimeout(() => {
                if (sellerReviewListElement.scrollLeft <= 0) {
                  prevButton.style.display = "none";
                }
              }, scrollTime);
            });

            nextButton.addEventListener("click", () => {
              const clickTime = Date.now();
              if (clickTime < prevClickTime + scrollTime) {
                return;
              }
              sellerReviewListElement.scrollBy(scrollDistance, 0);
              prevClickTime = clickTime;
              prevButton.style.display = "block";
              setTimeout(() => {
                const numScrolledLeftItems =
                  sellerReviewListElement.scrollLeft / scrollDistance;
                if (
                  numScrolledLeftItems >=
                  this.reviews.length - this.numDisplayReviews
                ) {
                  nextButton.style.display = "none";
                }
              }, scrollTime);
            });
          }, 0);
        });
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateNumOfDisplayReviews);
  },
});
</script>

<style scoped>
.seller-review-list-container {
  position: relative;
  width: fit-content;
}
.seller-review-list {
  max-width: 788px; /* reviewItemWidth x 5 + gap x 4 */
  display: flex;
  gap: 27px;
  overflow-x: hidden;
  scroll-behavior: smooth;
  padding: 7px;
}
#prev-button,
#next-button {
  display: none;
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-top: 5px solid cadetblue;
  border-right: 5px solid cadetblue;
  border-top-right-radius: 5px;
  cursor: pointer;
}
#prev-button {
  left: -30px;
  transform: rotate(-135deg);
}
#next-button {
  right: -30px;
  transform: rotate(45deg);
}
@media screen and (max-width: 900px) {
  .seller-review-list {
    max-width: 625px; /* reviewItemWidth x 4 + gap x 3 */
  }
}
@media screen and (max-width: 715px) {
  .seller-review-list {
    max-width: 462px; /* reviewItemWidth x 3 + gap x 2 */
  }
  .seller-review-list-container {
    margin: 0 auto;
  }
}
@media screen and (max-width: 500px) {
  .seller-review-list-container {
    display: none;
  }
}
</style>
