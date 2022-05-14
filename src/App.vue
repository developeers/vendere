<template>
  <navigation-bar></navigation-bar>
  <div class="body-container">
    <router-view/>
  </div>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
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
    width: 90vw;
    max-width: 1280px;
    margin: 0 auto;
    margin-top: 90px;
}
</style>
