<template>
  <img :src="imageUrl" alt="Preview" ref="image" :class="[{ hide: removed }]" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    imageId: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    removeImage: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      removed: false,
    };
  },
  mounted() {
    (this.$refs.image as HTMLElement).addEventListener("dblclick", async () => {
      this.$emit("remove");
      await this.removeImage(this.imageId);
      this.removed = true;
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
  cursor: pointer;
}
.hide {
  display: none;
}
</style>
