<template>
  <div class="seller-review-container">
    <img :src="review.reviewUserImageUrl" alt="Profile picture" />
    <p>
      "{{ review.content }}" <br />
      <span style="font-weight: bold"> {{ review.reviewUserName }} </span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IReviewInfo } from "@/services/interfaces/ISellerReview";

export default defineComponent({
  props: {
    review: {
      type: Object as PropType<IReviewInfo>,
      required: true,
    },
  },
});
</script>

<style scoped>
.seller-review-container {
  width: 136px;
  min-width: 136px;
}
.seller-review-container > img {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  box-shadow: 0 0 4px 4px grey;
}
.seller-review-container > p {
  font-style: italic;
}
</style>
