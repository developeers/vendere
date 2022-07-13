<template>
  <div class="notification-item-container">
    <img src="@/assets/app_logo.png" alt="App Logo" />
    <div class="notification-item-detail">
      <p class="notification-item-title">{{ title }}</p>
      <p class="notification-date">{{ date }}</p>
    </div>
    <div class="notification-item-arrow"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.notification-item-container {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}
.notification-item-container:hover {
  background: #f8f8f8;
}
.notification-item-container:first-child {
  border-top: 1px solid #e0e0e0;
}
.notification-item-container > img {
  width: 42px;
  height: 41px;
  border-radius: 50%;
}
.notification-item-detail {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.notification-item-title {
  font-weight: bold;
}
.notification-date {
  color: grey;
  font-size: 12px;
}
.notification-item-arrow {
  width: 9px;
  height: 9px;
  margin-left: auto;
  margin-right: 5px;
  border-top: 3px solid #b1b1b1;
  border-right: 3px solid #b1b1b1;
  border-top-right-radius: 3px;
  transform: rotate(45deg);
}
</style>
