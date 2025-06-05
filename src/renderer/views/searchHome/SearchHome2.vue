<template>
  <div class="search-container">
    <!-- CAS 搜索 -->
    <div v-if="searchMode === 'cas'" class="searchByCAS">
      <div class="searchBtn">
        <button class="search-button" @click="searchResult">Search</button>
      </div>

      <input
        type="text"
        placeholder="Enter CAS "
        v-model="searchQuery"
        class="search-input"
      />
      <!-- 通过化合物名称搜索 -->
      <div class="searchBtn">
        <button class="search-button" @click="searchNameResult">Search</button>
      </div>
      <input
        type="text"
        placeholder="Enter compound name"
        v-model="searchNameQuery"
        class="search-input"
      />
      
      <!-- 切换到 RNX 和文献搜索的按钮 -->
      <div class="mode-toggle-buttons">
        <button class="toggle-button" @click="searchMode = 'rnx'">
          切换到 RNX 搜索
        </button>
        <button class="toggle-button" @click="searchMode = 'literature'">
          切换到 文献搜索
        </button>
      </div>
    </div>

    <!-- RNX 搜索 -->
    <div v-else-if="searchMode === 'rnx'" class="searchByRnx">
      <div class="upload-section">
        <div class="upload-item-container">
          <div class="upload-item">
            <div class="select-all-container">
              <label>
                <input type="checkbox" v-model="isAllSubstrate" />
                是否是全部底物
              </label>
            </div>
            <UploadSubstrate
              @update:substrateFileList="handleFileListUpdate1"
              @update:substrateForm="handleFormUpdate1"
            />
          </div>
          <div class="upload-item">
            <span>产物</span>
            <Upload
              @update:fileList="handleFileListUpdate2"
              @update:form="handleFormUpdate2"
            />
          </div>
        </div>
      </div>
      <button class="search-button" @click="searchResultbyRnx">Search</button>

      <!-- 切换到 CAS 和文献搜索的按钮 -->
      <div class="mode-toggle-buttons">
        <button class="toggle-button" @click="searchMode = 'cas'">
          切换到 CAS 搜索
        </button>
        <button class="toggle-button" @click="searchMode = 'literature'">
          切换到 文献搜索
        </button>
      </div>
    </div>

    <!-- 文献搜索 -->
    <div v-else-if="searchMode === 'literature'" class="searchByLiterature">
      <div class="upload-section">
        <div class="upload-item-container">
          <div class="upload-item">
            <span>文献</span>
            <Upload
              @update:fileList="handleLiteratureFileUpdate"
              @update:form="handleLiteratureFormUpdate"
            />
          </div>
        </div>
      </div>
      <button class="search-button" @click="_searchLiterature">Search</button>

      <!-- 切换到 CAS 和 RNX 搜索的按钮 -->
      <div class="mode-toggle-buttons">
        <button class="toggle-button" @click="searchMode = 'cas'">
          切换到 CAS 搜索
        </button>
        <button class="toggle-button" @click="searchMode = 'rnx'">
          切换到 RNX 搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Upload from '@renderer/components/upload/Upload.vue'
import UploadSubstrate from '@renderer/components/upload/UploadSubstrate.vue'
import {
  processFiles,
  searchByCAS,
  searchLiterature,
  searchByName
} from '@renderer/utils/request.ts'
import { v4 as uuidv4 } from 'uuid'
const searchQuery = ref('')
const searchNameQuery = ref('')  //化合物名称的搜索 searchNameQuery
const searchMode = ref('cas') // 当前搜索模式：'cas' 或 'rnx' 或 'literature'
const fileList1 = ref([])
const fileList2 = ref([])
const literatureFileList = ref([]) // 文献文件列表
const formData1 = ref({})
const formData2 = ref({})
const literatureFormData = ref({}) // 文献表单数据
const isAllSubstrate = ref(false)

const router = useRouter()

// CAS 搜索
const searchResult = async () => {
  if (!searchQuery.value.trim()) {
    alert('请输入搜索内容！')
    return
  }
  const queryData = searchQuery.value.trim()
  console.log('Navigating to search with query:', queryData)
  try {
    const id = uuidv4()
    let res = await searchByCAS(queryData, id)
    console.log('发送信息，返回的结果是：', res)
    router.push({
      path: '/search',
      query: { q: queryData, id },
    })
  } catch (error) {
    console.error('sendMessage error', error)
  }
}

const searchNameResult = async () => {
  if (!searchNameQuery.value.trim()) {
    alert('请输入搜索内容！')
    return
  }
  const queryData = searchNameQuery.value.trim()
  console.log('Navigating to search with query:', queryData)
  try {
    const id = uuidv4()
    let res = await searchByName(queryData, id)
    console.log('发送信息，返回的结果是：', res)
    router.push({
      path: '/search',
      query: { q: queryData, id },
    })
  } catch (error) {
    console.error('sendMessage error', error)
  }
}



// 更新底物和产物的文件列表和表单数据
const handleFileListUpdate1 = (files) => {
  fileList1.value = files
  console.log('文件选择变化1:', files)
}
const handleFormUpdate1 = (form) => {
  formData1.value = form
  console.log('文件选择变化1:', form)
}
const handleFileListUpdate2 = (files) => {
  fileList2.value = files
  console.log('文件选择变化2:', files)
}
const handleFormUpdate2 = (type, form) => {
  formData2.value = form
  console.log('文件选择变化2:', form)
}

// 更新文献文件列表和表单数据
const handleLiteratureFileUpdate = (files) => {
  literatureFileList.value = files
  console.log('文献文件选择变化:', files)
}
const handleLiteratureFormUpdate = (form) => {
  literatureFormData.value = form
  console.log('文献表单数据变化:', form)
}

// RNX 搜索
const searchResultbyRnx = async () => {
  console.log(
    '上传的文件列表:',
    fileList1.value,
    fileList2.value,
    isAllSubstrate.value,
  )
  try {
    let id = uuidv4()
    let res = await processFiles(
      fileList1.value,
      fileList2.value,
      id,
      isAllSubstrate.value,
    )
    console.log('发送信息，返回的结果是：', res)
    router.push({
      path: '/searchbyrnx',
      query: { q: '', id: id },
    })
  } catch (error) {
    console.error('sendMessage error', error)
  }
}

// 文献搜索
const _searchLiterature = async () => {
  console.log('文献文件列表:', literatureFileList.value)
  try {
    const id = uuidv4()
    // 这里可以调用文献搜索的 API
    const res = await searchLiterature(literatureFileList.value, id)
    console.log('res_file', res)
    router.push({
      path: '/searchLiterature',
      query: { id: id },
    })
  } catch (error) {
    console.error('文献搜索错误', error)
  }
}
</script>

<style scoped lang="scss">
.search-container {
  background-image: url('@renderer/assets/background2.jpg');
  background-position: center bottom 20%;  /* 关键修改：将背景图片下移20% */
  background-size: 100% auto;  /* 保持宽度100%，高度自适应 */
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100vw;
  height: 100vh;
}

/* CAS 搜索模式样式 */
.searchByCAS {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* 统一对齐的搜索行容器 */
.search-rows-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 15px;
}

/* 搜索行样式 */
.search-row {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
}

/* 输入框样式（固定宽度） */
.search-input {
  width: 250px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: inset 0px 0px 1px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  border-color: #007bff;
  outline: none;
}

/* 按钮样式（固定宽度） */
.search-button {
  width: 150px;
  margin-left: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.search-button:hover {
  background-color: #0056b3;
}

/* 切换按钮样式 */
.toggle-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
}

.toggle-button:hover {
  background-color: #0056b3;
}

.mode-toggle-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

/* RNX 搜索模式样式 */
.searchByRnx {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.upload-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.upload-item-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
}

.upload-item {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}


.select-all-container {
  margin-bottom: 0px;
}

/* 文献搜索模式样式 */
.searchByLiterature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}
</style>