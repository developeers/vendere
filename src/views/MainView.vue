<template>
  <navigation-bar></navigation-bar>
  <div class="body-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationBar from "@/components/navigation/NavigationBar.vue";

export default defineComponent({
  components: {
    NavigationBar,
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