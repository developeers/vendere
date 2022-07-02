<template>
  <div class="drop-area">
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

export default defineComponent({});
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
