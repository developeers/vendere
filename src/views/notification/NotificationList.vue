<template>
  <div class="notification-container">
    <h2>Notifications</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.notification-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}
.notification-container > h2 {
  color: mediumvioletred;
}
</style>
