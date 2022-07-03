<template>
  <img :src="imageUrl" alt="Preview" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imageUrl: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
img {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid grey;
  border-radius: 3px;
}
</style>
