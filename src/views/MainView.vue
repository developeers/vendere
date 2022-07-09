<template>
  <navigation-bar></navigation-bar>
  <div class="main-container">
    <div class="body-container">
      <router-view />
    </div>
    <footer-component></footer-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationBar from "@/components/navigation/NavigationBar.vue";
import FooterComponent from "@/components/footer/FooterComponent.vue";

export default defineComponent({
  components: {
    NavigationBar,
    FooterComponent,
  },
});
</script>

<style scoped>
.main-container {
  min-height: calc(100vh - 90px);
  position: relative;
  padding-bottom: 215px;
  box-sizing: border-box;
}
.body-container {
  width: 90vw;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 90px;
  margin-bottom: 50px;
}
</style>