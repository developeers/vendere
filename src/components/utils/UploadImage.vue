<template>
  <div :class="dropAreaClasses" ref="dropArea">
    <i class="fa fa-camera"></i>
    <div class="drop-area-text">
      <p>Drop image here</p>
      <p>Or</p>
      <label for="file-upload" class="file-upload-button"> Upload </label>
      <input id="file-upload" type="file" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      numUploadedImages: 0,
    };
  },
  computed: {
    dropAreaClasses() {
      if (this.numUploadedImages) {
        return "drop-area drop-area-with-image";
      }
      return "drop-area";
    },
  },
  methods: {
    customPreventDefault(event: Event) {
      event.preventDefault();
      event.stopPropagation();
    },
    previewImage(image: File) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      fileReader.onloadend = () => {
        const img = document.createElement("img");
        img.src = fileReader.result as string;
        (this.$refs.dropArea as HTMLElement).appendChild(img);
        this.numUploadedImages += 1;
      };
    },
  },
  created() {
    ["dragover", "drop"].forEach((eventName) => {
      document.addEventListener(eventName, this.customPreventDefault);
    });
  },
  mounted() {
    // Prevent browser from opening dragged images in a new tab
    // and the drop event can be handled by our callback
    ["dragover", "drop"].forEach((eventName) => {
      (this.$refs.dropArea as HTMLElement).addEventListener(
        eventName,
        (event) => {
          event.preventDefault();
          event.stopPropagation();
        }
      );
    });

    (this.$refs.dropArea as HTMLElement).addEventListener(
      "drop",
      (event: DragEvent) => {
        if (!event.dataTransfer) {
          return;
        }
        const draggedFiles = [...event.dataTransfer.files];
        if (!draggedFiles.length) {
          return;
        }
        const draggedImages = draggedFiles.filter((file: File) => {
          return file.type.startsWith("image");
        });
        draggedImages.forEach((image) => this.previewImage(image));
      }
    );
  },
  beforeUnmount() {
    ["dragover", "drop"].forEach((eventName) => {
      document.removeEventListener(eventName, this.customPreventDefault);
    });
  },
});
</script>

<style scoped>
.drop-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 240px;
  background: #f7f7f7;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px dashed grey;
}
.drop-area.drop-area-with-image {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
.drop-area > .fa-camera {
  font-size: 30px;
  color: #c2c2c2;
}
.drop-area-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  position: relative;
  top: 7px;
  font-size: 15px;
  color: grey;
}
.drop-area-text > p:nth-child(2) {
  font-size: 14px;
}
.drop-area-text > label {
  font-size: 16px;
}
.file-upload-button {
  display: block;
  width: 100px;
  background: white;
  cursor: pointer;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 3px;
  color: grey;
}
input[type="file"] {
  display: none;
}
</style>

<style>
/* Image elements are created based on user actions, and those elements
will not be given attributes that bind them to scoped CSS. 
Therefore, it's neccessary to style image elements in non-scoped CSS.
*/
.drop-area img {
  width: 40px;
  height: 36px;
}
</style>
