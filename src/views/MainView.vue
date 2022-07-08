<template>
  <navigation-bar></navigation-bar>
  <div class="body-container">
    <router-view />
  </div>
  <footer-component></footer-component>
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
.body-container {
  width: 90vw;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 90px;
  margin-bottom: 50px;
}
</style>