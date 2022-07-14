<template>
  <div class="app-motto-container">
    <router-link :to="{ name: routeNames.HOME }"
      ><h3 class="app-name">Vendere</h3></router-link
    >
    <p class="app-motto">
      Create your own <br />
      marketplace.
    </p>
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
.app-motto-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: aliceblue;
  padding: 20px;
  width: 360px;
}

@media screen and (max-width: 768px) {
  .app-motto-container {
    display: none;
  }
}

.app-name {
  color: mediumvioletred;
  font-size: 24px;
  position: absolute;
  top: 20px;
  left: 15px;
}

.app-motto {
  font-size: 25px;
  font-weight: bold;
}
</style>