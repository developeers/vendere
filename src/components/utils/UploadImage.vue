<template>
  <div class="drop-area" ref="dropArea">
    <i class="fa fa-camera" :class="[{ hide: numPreviewImages }]"></i>
    <div class="drop-area-text" :class="[{ hide: numPreviewImages }]">
      <p>Drop image here</p>
      <p>Or</p>
    </div>
    <label for="file-upload" class="file-upload-button"> Upload </label>
    <input id="file-upload" type="file" multiple @change="uploadFiles" />
    <div class="drop-area-image">
      <image-preview
        v-for="(imageUrl, index) in previewImageList"
        :imageUrl="imageUrl"
        :key="index"
        @delete="deletePreviewImage"
      >
      </image-preview>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ImagePreview from "./ImagePreview.vue";

const MAX_NUM_IMAGES = 9;

export default defineComponent({
  props: {
    processImage: {
      type: Function,
      required: true,
    },
  },
  components: {
    ImagePreview,
  },
  data() {
    return {
      numPreviewImages: 0,
      previewImageList: [] as string[],
    };
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
        this.previewImageList.push(fileReader.result as string);
        this.numPreviewImages += 1;
      };
    },
    async handleImage(image: File) {
      await this.processImage(image);
      this.previewImage(image);
    },
    processImagesFromFiles(files: FileList) {
      const uploadedImages = [...files].filter((file: File) => {
        return file.type.startsWith("image");
      });
      const numProcessingImage = Math.min(
        uploadedImages.length,
        MAX_NUM_IMAGES - this.numPreviewImages
      );
      const processedImages = uploadedImages.slice(0, numProcessingImage);
      processedImages.forEach(this.handleImage);
    },
    uploadFiles(event: Event) {
      if (this.numPreviewImages >= MAX_NUM_IMAGES) {
        return;
      }
      const uploadedFiles = (event.target as HTMLInputElement).files;
      if (!uploadedFiles) {
        return;
      }
      this.processImagesFromFiles(uploadedFiles);
    },
    dropFiles(event: DragEvent) {
      if (this.numPreviewImages >= MAX_NUM_IMAGES) {
        return;
      }
      if (!event.dataTransfer) {
        return;
      }
      if (!event.dataTransfer.files.length) {
        return;
      }
      this.processImagesFromFiles(event.dataTransfer.files);
    },
    deletePreviewImage() {
      this.numPreviewImages -= 1;
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
        this.customPreventDefault
      );
    });

    (this.$refs.dropArea as HTMLElement).addEventListener(
      "drop",
      this.dropFiles
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 240px;
  background: #f7f7f7;
  border-radius: 4px;
  border: 1px dashed grey;
  max-width: 300px;
  margin: 0 auto;
}
.drop-area-image {
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  justify-items: center;
  align-items: center;
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
  position: absolute;
  bottom: 10px;
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
.hide {
  display: none;
}
</style>
