<template>
  <div class="container">
    <h2>Notifications</h2>
    <div class="notification-container">
      <notification-item v-for="index in 10" :key="index"></notification-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotificationItem from "./NotificationItem.vue";

export default defineComponent({
  components: {
    NotificationItem,
  },
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 50vw;
  max-width: 480px;
  min-width: 360px;
  margin: 0 auto;
  text-align: left;
}
.container > h2 {
  color: mediumvioletred;
}
.notification-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
