<template>
  <nav class="simple-nav-bar">
    <router-link :to="{ name: 'home' }" class="app-name">Vendere</router-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>


<style scoped>
.simple-nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  background: whitesmoke;
  padding: 10px 16px;
  border-bottom: 2px solid mediumvioletred;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100vw;
}
.app-name {
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  text-decoration: none;
  color: mediumvioletred;
  cursor: pointer;
}
</style>