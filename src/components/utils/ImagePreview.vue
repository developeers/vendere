<template>
  <img :src="imageUrl" alt="Preview" ref="image" :class="[{ hide: deleted }]" />
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
  data() {
    return {
      deleted: false,
    };
  },
  mounted() {
    (this.$refs.image as HTMLElement).addEventListener("dblclick", () => {
      this.deleted = true;
      this.$emit("delete");
    });
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
.hide {
  display: none;
}
</style>
