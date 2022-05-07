<template>
  <navigation-bar></navigation-bar>
  <div class="body-container">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationBar from './components/navigation/NavigationBar.vue'

export default defineComponent({
  components: {
    NavigationBar,
  }
})
</script>

<style>
@import '@/assets/css/main.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
* {
  margin: 0px;
}
.body-container {
  padding: 15px;
}
</style>
