<template>
  <pseudo-flag></pseudo-flag>
  <div class="container">
    <h2>Notifications</h2>
    <div class="notification-container">
      <notification-item
        v-for="(item, index) in notificationItems"
        :title="item.title"
        :date="item.date"
        :key="index"
      ></notification-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotificationItem from "./NotificationItem.vue";
import PseudoFlag from "@/components/utils/PseudoFlag.vue";

export default defineComponent({
  components: {
    NotificationItem,
    PseudoFlag,
  },
  setup() {
    const notificationItems = [];
    let dayGap = 2;
    const numOfNotificationItems = Math.floor(Math.random() * 7) + 3;
    for (let i = 1; i <= numOfNotificationItems; i++) {
      notificationItems.push({
        title: "Notification number #" + i,
        date: dayGap + " days ago",
      });
      dayGap += Math.floor(Math.random() * 3);
    }
    return {
      notificationItems,
    };
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
