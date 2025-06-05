<template>
  <div class="upload-container">
    <div
      class="custom-upload"
      @dragover.prevent
      @drop.prevent="handleDrop"
    >
      <div class="drag-area">
        <div class="icon">📤</div>
        <div class="upload-text">
          拖拽文件到此处，或
          <label for=inputId class="click-text">点击上传</label>
        </div>
      </div>
      <input
        id=inputId 
        type="file"
        multiple
        @change="handleFileChange"
        style="display: none;"
      />
    </div>

    <ul class="file-list">
      <li v-for="(file, index) in fileList" :key="index" class="file-item">
        {{ file.name }}
        <button class="remove-btn" @click="removeFile(index)">删除</button>
      </li>
    </ul>

    <!-- <button
      class="upload-btn"
      :disabled="fileList.length === 0"
      @click="submitFiles"
    >
      上传文件
    </button> -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import {  processFiles } from "@renderer/utils/request.ts";
const emit = defineEmits(['update:fileList', 'update:form']);
// const props = defineProps({
//   fileList: {
//     type: Array,
//     default: () => [],
//   },
//   formData: {
//     type: Object,
//     default: () => ({
//       datasetName: '',
//       datasetType: 'Option1',
//       labelSpace: '',
//       defaultMetrics: '',
//     }),
//   },
// });
const inputId = ref(`file-input-${Math.random().toString(36).substr(2, 9)}`);
const fileList = ref([]);

const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  fileList.value.push(...files);
  emit('update:fileList', fileList.value);
};

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files);
  fileList.value.push(...files);
  emit('update:fileList', fileList.value);
};

const removeFile = (index) => {
  fileList.value.splice(index, 1);
  emit('update:fileList', fileList.value);
};

const submitFiles = async() => {
  console.log('上传的文件列表:', fileList.value);
  try {
        let res = await processFiles(fileList.value)
        console.log("发送信息，返回的结果是：", res);
        clearFileList();
      } catch (error) {
        console.error("sendMessage error", error);
      }
};
</script>

<style lang="scss" scoped>
.upload-container {
  width: 200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.custom-upload {
  margin:10px 10px;
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  background-color: #f9f9f9;
}

.drag-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 24px;
}

.upload-text {
  font-size: 16px;
}

.click-text {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.tip {
  font-size: 14px;
  color: #666;
}

.file-list {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.file-item:last-child {
  border-bottom: none;
}

.remove-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #d9363e;
}

.upload-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
}

.upload-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.upload-btn:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
