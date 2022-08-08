<template>
  <div class="footer-container">
    <div class="footer-container-column">
      <a href="#">SHOP</a>
      <a href="#">Categories</a>
      <a href="#">Brands</a>
      <a href="#">Keywords</a>
    </div>
    <div class="footer-container-column">
      <a href="#">SERVICES</a>
      <a href="#">Buy Now, Pay Later</a>
      <a href="#">Shipping</a>
      <a href="#">Instant Pay</a>
      <a href="#">Sell from Home</a>
    </div>
    <div class="footer-container-column">
      <a href="#">SUPPORT</a>
      <a href="#">Contact us</a>
      <a href="#">Help Center</a>
      <a href="#">Seller Protection</a>
      <a href="#">Buyer Protection</a>
    </div>
    <div class="footer-container-column">
      <a href="#">COMPANY</a>
      <a href="#">About us</a>
      <a href="#">Blog</a>
      <a href="#">Career</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>


<style scoped>
.footer-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  gap: 12px;
  padding: 20px;
  background: whitesmoke;
  border-top: 2px solid mediumvioletred;
  box-sizing: border-box;
}
.footer-container-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.footer-container-column > a {
  text-decoration: none;
  color: mediumvioletred;
  cursor: not-allowed;
}
.footer-container-column > a:first-child {
  font-weight: bold;
  font-size: 18px;
}
@media screen and (max-width: 500px) {
  .footer-container-column:nth-child(3) {
    display: none;
  }
}
</style>
