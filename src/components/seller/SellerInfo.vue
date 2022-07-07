<template>
  <h3 class="meet-seller-text">Meet the seller</h3>
  <div class="seller-info-container">
    <div class="seller-profile-image">
      <img :src="seller.imageUrl" alt="Profile image" />
    </div>
    <div class="seller-info">
      <h3>{{ seller.name }}</h3>
      <p>
        {{ seller.averageReview }} points ({{ seller.numOfReviews }} reviews)
      </p>
      <div
        class="view-profile-button center-element"
        @click="navToSellerProfile"
      >
        View Profile
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserModule from "@/store/modules/User";

export default defineComponent({
  setup(props) {
    const seller = UserModule.userInfo(props.uid);
    return { seller };
  },
  props: {
    uid: {
      type: String,
      required: true,
    },
  },
  methods: {
    navToSellerProfile() {
      this.$router.push({
        name: "SellerDetail",
        params: { uid: this.uid },
      });
    },
  },
});
</script>


<style scoped>
.meet-seller-text {
  text-align: left;
  margin-top: 50px;
  color: cadetblue;
}
.seller-info-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 50px;
}
.seller-profile-image {
  display: flex;
}
.seller-profile-image > img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.view-profile-button {
  background: cadetblue;
  color: whitesmoke;
  font-size: 14px;
  font-weight: bold;
  width: 90px;
  height: 25px;
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
