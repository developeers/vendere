<template>
  <div class="page-not-found-container">
    <p>404 | Page not found</p>
    <img src="@/assets/app_logo.png" alt="" />
    <router-link :to="{ name: routeNames.HOME }">Back to Home</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { routeNames } from "@/router/index";
export default defineComponent({
  setup() {
    return {
      routeNames,
    };
  },
});
</script>


<style scoped>
.page-not-found-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 500px;
  height: 100vh;
  margin: 0 auto;
  margin-top: -70px;
}
.page-not-found-container > img {
  width: 240px;
  height: 230px;
}
.page-not-found-container > p {
  font-size: 22px;
  color: cadetblue;
}
.page-not-found-container > a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: none;
  width: 140px;
  height: 40px;
  border-radius: 5px;
  background: #c93d96;
  color: white;
  font-weight: bold;
  font-size: 17px;
  cursor: pointer;
}
.page-not-found-container > a:hover {
  opacity: 0.9;
}
</style>
