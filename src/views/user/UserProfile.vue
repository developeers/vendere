<template>
  <div v-if="userInfo" class="user-profile-container">
    <div class="user-detail">
      <div class="user-basic-info">
        <img :src="userInfo.imageUrl" alt="" />
        <div class="user-name">
          <h2>{{ userInfo.name }}</h2>
          <p>
            {{ userInfo.averageReview }} points ({{ userInfo.numOfReviews }}
            reviews)
          </p>
        </div>
      </div>
      <div class="user-statistics">
        <p class="sold-product"><span>0</span> Sold items</p>
        |
        <p class="followers"><span>0</span> Followers</p>
        |
        <p class="following"><span>0</span> Following</p>
      </div>
    </div>
    <div class="user-product-list">
      <h3>Products you have sold</h3>
      <div class="empty-product">
        <img src="@/assets/app_logo.png" alt="" />
        <p>There are no items listed.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import UserModule from "@/store/modules/User";

export default defineComponent({
  setup() {
    const userInfo = computed(() => UserModule.loginUser);
    return { userInfo };
  },
});
</script>

<style scoped>
.user-profile-container {
  max-width: 660px;
  height: calc(100vh - 365px);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
.user-profile-container .user-detail {
  padding-bottom: 20px;
  border-bottom: 1px solid #d5d5d5;
  margin-bottom: 20px;
}
.user-profile-container .user-basic-info {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  text-align: left;
}
.user-profile-container .user-basic-info > img {
  width: 86px;
  height: 82px;
  border-radius: 50%;
}
.user-profile-container .user-name > p {
  font-size: 15px;
  margin-top: 8px;
}
.user-profile-container .user-statistics {
  display: flex;
  gap: 10px;
  font-size: 15px;
}
.user-profile-container .user-statistics > p > span {
  font-weight: bold;
}
.user-product-list {
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-bottom: 50px;
}
.user-product-list .empty-product {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.user-product-list > h3 {
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
}
.user-product-list .empty-product > img {
  width: 80px;
  height: 80px;
}
</style>
