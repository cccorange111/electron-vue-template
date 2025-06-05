<template>
  <div>
    <div class="container">
      <div class="content">
        <div class="group-sort">
          <button class="show-more" @click="toHome">Back home</button>
        </div>
        <div
          v-for="(item, index) in data.data"
          :key="index"
          class="reaction-search-item"
        >
          <div class="reaction-details">
            <!-- Reaction Temperature Section -->
            <div class="details-section">
              <h4>Reaction Temperature</h4>
              <div class="details-content">
                <p>
                  <strong>Initial Temperature:</strong>
                  {{
                    item.reaction_temperature?.initial_temperature ||
                    'Not Provided'
                  }}
                </p>
                <p>
                  <strong>Reaction Temperature:</strong>
                  {{
                    item.reaction_temperature?.reaction_temperature ||
                    'Not Provided'
                  }}
                </p>
              </div>
            </div>

            <!-- Reaction Duration Section -->
            <div class="details-section">
              <h4>Reaction Duration</h4>
              <div class="details-content">
                <p>
                  {{ item.reaction_duration || 'Not Provided' }}
                </p>
              </div>
            </div>

            <!-- Yield Section -->
            <div class="details-section">
              <h4>Yield</h4>
              <div class="details-content">
                <p>
                  {{ item.yield || 'Not Provided' }}
                </p>
              </div>
            </div>

            <!-- Reaction Steps Section -->
            <div class="details-section">
              <h4>Reaction Steps</h4>
              <div class="details-content">
                <ol>
                  <li
                    v-for="(step, stepIndex) in item.reaction_steps"
                    :key="stepIndex"
                  >
                    {{ step }}
                  </li>
                </ol>
              </div>
            </div>

            <!-- Starting Materials Section -->
            <div class="details-section">
              <h4>Starting Materials</h4>
              <div class="details-content">
                <ul>
                  <li
                    v-for="(material, materialIndex) in item.starting_materials"
                    :key="materialIndex"
                  >
                    {{ material }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Reagents Section -->
            <div class="details-section">
              <h4>Reagents</h4>
              <div class="details-content">
                <ul>
                  <li
                    v-for="(reagent, reagentIndex) in item.reagents"
                    :key="reagentIndex"
                  >
                    {{ reagent }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Reaction Equation Section -->
            <div class="details-section">
              <h4>Reaction Equation</h4>
              <div class="details-content">
                <p>
                  <strong>Explicit Equation:</strong>
                  {{
                    item.reaction_equation?.explicit_equation || 'Not Provided'
                  }}
                </p>
                <p>
                  <strong>Inferred Equation:</strong>
                  {{
                    item.reaction_equation?.inferred_equation || 'Not Provided'
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import Upload from '@renderer/components/upload/Upload.vue'
import { useRouter, useRoute } from 'vue-router'
import { getdetailData } from '@renderer/utils/request.ts'
const router = useRouter()
const route = useRoute()
const state = reactive({
  activeTab: 'analyze',
  selectedMethod: 'methodsNow',
  methodsNowCount: 25,
  groupBy: 'none',
  sortBy: 'accessionNumber',
})
const formData = ref({
  datasetName: '',
  datasetType: '',
  labelSpace: '',
  defaultMetrics: '',
})

const data = reactive({
  data: [
    {},
    // {
    //   img_url: [],
    //   smiles: [
    //     {
    //       reactions: ['O=[N+]([O-])C([N+](=O)[O-])([N+](=O)[O-])[N+](=O)[O-]'],
    //       products: [
    //         'O=[N+]([O-])C([N+](=O)[O-])([N+](=O)[O-])S(=O)(=O)O[Na]',
    //         'O=NO[Na]',
    //       ],
    //     },
    //   ],
    //   Reagent: ['W', 'X'],
    //   Reaction_temperature: '',
    //   Reaction_time: '',
    //   Yield: '',
    //   description_cn: {
    //     Reaction_steps:
    //       '(1)将甲苯与浓硝酸和浓硫酸的混合酸反应，生成一硝基甲苯（MONO）。<br>反应条件：温度控制在0-5℃，反应时间约1-2小时。<br>(2)将一硝基甲苯与浓硝酸和浓硫酸的混合酸反应，生成二硝基甲苯（DNT）。<br>反应条件：温度控制在30-40℃，反应时间约2-3小时。<br>(3)将二硝基甲苯与浓硝酸和浓硫酸的混合酸反应，生成三硝基甲苯（TNT）。<br>反应条件：温度控制在80-90℃ ，反应时间约3-4小时。',
    //     Reaction_type: '',
    //     Available_Experimental_Data: '1H-NMR、13C-NMR、红外光谱、XRD',
    //   },
    //   description_en: {
    //     Reaction_steps:
    //       '(1) React Toluene with a mixture of W and X to produce mononitroToluene (MONO).<br>Reaction conditions: Temperature controlled at 0-5°C, reaction time approximately 1-2 hours.<br>(2) React mononitroToluene with a mixture of W and X to produce dinitroToluene (DNT).<br>Reaction conditions: Temperature controlled at 30-40°C, reaction time approximately 2-3 hours.<br>(3) React dinitroToluene with a mixture of W and X to produce trinitroToluene (TNT).<br>Reaction conditions: Temperature controlled at 80-90°C, reaction time approximately 3-4 hours.',
    //     Reaction_type: '',
    //     Available_Experimental_Data: '1H-NMR、13C-NMR、IR、XRD',
    //   },
    // },
    // {
    //   img_url: ['C:/Users/cc/Desktop/1.png', 'C:/Users/cc/Desktop/1.png'],
    //   smiles: [
    //     {
    //       reactions: [
    //         'O=[N+]([O-])C([N+](=O)[O-])([N+](=O)[O-])[N+](=O)[O-]',
    //         'O=S(=O)([Na])O[Na]',
    //       ],
    //       products: [
    //         'O=[N+]([O-])C([N+](=O)[O-])([N+](=O)[O-])S(=O)(=O)O[Na]',
    //         'O=NO[Na]',
    //       ],
    //     },
    //   ],
    //   Reagent: ['W', 'X'],
    //   Reaction_temperature: '',
    //   Reaction_time: '',
    //   Yield: '',
    //   description_cn: {
    //     Reaction_steps:
    //       '(1)将甲苯与浓硝酸和浓硫酸的混合酸反应，生成一硝基甲苯（MONO）。<br>反应条件：温度控制在0-5℃，反应时间约1-2小时。<br>(2)将一硝基甲苯与浓硝酸和浓硫酸的混合酸反应，生成二硝基甲苯（DNT）。<br>反应条件：温度控制在30-40℃，反应时间约2-3小时。<br>(3)将二硝基甲苯与浓硝酸和浓硫酸的混合酸反应，生成三硝基甲苯（TNT）。<br>反应条件：温度控制在80-90℃ ，反应时间约3-4小时。',
    //     Reaction_type: '',
    //     Available_Experimental_Data: '1H-NMR、13C-NMR、红外光谱、XRD',
    //   },
    //   description_en: {
    //     Reaction_steps:
    //       '(1) React Toluene with a mixture of W and X to produce mononitroToluene (MONO).<br>Reaction conditions: Temperature controlled at 0-5°C, reaction time approximately 1-2 hours.<br>(2) React mononitroToluene with a mixture of W and X to produce dinitroToluene (DNT).<br>Reaction conditions: Temperature controlled at 30-40°C, reaction time approximately 2-3 hours.<br>(3) React dinitroToluene with a mixture of W and X to produce trinitroToluene (TNT).<br>Reaction conditions: Temperature controlled at 80-90°C, reaction time approximately 3-4 hours.',
    //     Reaction_type: '',
    //     Available_Experimental_Data: '1H-NMR、13C-NMR、IR、XRD',
    //   },
    // },
  ],
})

const fileList = ref([])
const sections = reactive({
  overview: {
    open: true,
    content: '1.1 R:H2SO4, S:C5H5N, 0°C → 60°C',
  },
  methodsNow: {
    open: false,
    steps: [
      'Add 2-hydroxybenzoic acid (0.01 mol) in 100 mL of solvent.',
      'Keep the mixture on ice bath.',
    ],
  },
})

const selectedLanguage = reactive(data.data.map(() => 'cn')) // 默认显示中文

// 用来存储反应图渲染的容器
const container = ref(null)

// 加载文件并显示
const loadFromPath = async () => {
  const filePath = '/path/to/your/file.rnx' // 这里是你本地服务器的路径
  await fetchRnxFile(filePath)
}

// 从指定路径加载 .rnx 文件
const fetchRnxFile = async (filePath) => {
  try {
    // 发送请求获取 .rnx 文件
    const response = await fetch(filePath)
    if (!response.ok) {
      throw new Error('文件加载失败')
    }

    // 获取文件内容
    const rnxContent = await response.text()

    // 渲染反应图
    renderReaction(rnxContent)
  } catch (error) {
    alert(`文件加载失败: ${error.message}`)
  }
}

// 渲染反应图
const renderReaction = (rnxContent) => {
  if (!container.value) return

  // 创建 ChemDoodle ReactionViewer 实例
  const viewer = new ChemDoodle.ReactionViewer(container.value, 500, 200)

  // 加载 rnx 内容
  viewer.loadRDX(rnxContent)

  // 缩放适应显示
  viewer.zoomToFit()
}

const toggleLanguage = (index) => {
  selectedLanguage[index] = selectedLanguage[index] === 'cn' ? 'en' : 'cn'
}
const progressBarWidth = computed(
  () => `${(state.methodsNowCount / 100) * 100}%`,
)

const handleFileListUpdate = (updatedFileList) => {
  fileList.value = updatedFileList
}
const handleFormUpdate = (updatedForm) => {
  formData.value = { ...updatedForm }
}

function setActiveTab(tab) {
  state.activeTab = tab
}

function toggleSection(sectionKey) {
  sections[sectionKey].open = !sections[sectionKey].open
}

const getData = async () => {
  try {
    console.log('route.query.id', route.query.id)
    let res = await getdetailData(route.query.id)
    console.log('rnx搜索data,res', res.msg)
    if (res.code === 200) {
      data.data = res.msg.data
      console.log('data.data', data.data)
      console.log('发送信息，返回的结果是：', res)
    }
  } catch (error) {
    console.error('sendMessage error', error)
  }
}
onMounted(() => {
  console.log('路由:', route.query.q, route.query.id)
  const script = document.createElement('script')
  script.src = 'public/RDKit_minimal.js'
  script.onload = () => {
    getData()
    console.log('RDKit_minimal.js 加载成功')
    window
      .initRDKitModule({
        locateFile: (file) => {
          if (file === 'RDKit_minimal.wasm') {
            return 'public/RDKit_minimal.wasm'
          }
        },
      })
      .then((RDKit) => {
        console.log('RDKit 加载成功！版本:', RDKit.version())
        var width = 100
        var height = 100
        // data.data.forEach((item, index) => {
        //   item.smiles.forEach((smile, smileIndex) => {
        //     const mol = RDKit.get_mol(smile)
        //     const svg = mol.get_svg(100, 100)
        //     document.getElementById(
        //       `reactant${index}_${smileIndex}`,
        //     ).innerHTML = svg
        //   })
        // })

        // data.data.forEach((item, index) => {
        //   let len=item.smiles.reactions.length;
        //   item.smiles.reactions.forEach((smile, smileIndex) => {
        //     const mol = RDKit.get_mol(smile)
        //     const svg = mol.get_svg(100, 100)
        //     document.getElementById(
        //       `reactant${index}_${smileIndex}`,
        //     ).innerHTML = svg
        //   })
        //   item.smiles.products.forEach((smile, smileIndex) => {
        //     const mol = RDKit.get_mol(smile)
        //     const svg = mol.get_svg(100, 100)
        //     document.getElementById(
        //       `reactant${index}_${len+smileIndex}`,
        //     ).innerHTML = svg
        //   })
        // })
      })
      .catch((error) => {
        console.error('RDKit 加载失败: ', error)
      })
  }

  script.onerror = () => {
    console.error('RDKit_minimal.js 加载失败')
  }

  document.head.appendChild(script)
})

const toHome = () => {
  router.push({
    path: '/home',
  })
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.sidebar {
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  .tabs {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;

    .tab {
      padding: 5px 15px;
      cursor: pointer;
      font-size: 14px;

      &.active {
        font-weight: bold;
        border-bottom: 2px solid #003366;
        color: #003366;
      }
    }
  }

  .analyze-section {
    margin-top: 20px;

    h4 {
      font-size: 16px;
      margin-bottom: 10px;
    }

    .analyze-dropdown {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      select {
        flex: 1;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }

      .info-tooltip {
        margin-left: 5px;
        background-color: #0073e6;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        cursor: pointer;
      }
    }

    p {
      margin: 10px 0;
      font-size: 14px;
      font-weight: bold;
    }

    .progress-bar-container {
      background-color: #e0e0e0;
      border: 1px solid #ccc;
      height: 20px;
      margin: 10px 0;
      position: relative;

      .progress-bar {
        background-color: #003366;
        height: 100%;
        transition: width 0.3s ease;
      }
    }

    .show-more {
      margin-top: 10px;
      margin-left: 5px;
      padding: 6px 12px;
      background-color: #0073e6;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: #005bb5;
      }
    }
  }

  .upload-section {
    margin-top: 10px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
}

.content {
  flex: 1;
  padding: 20px;

  .group-sort {
    display: flex;
    align-items: center;
    margin: 10px 0 20px;

    label {
      margin-right: 8px;
      font-size: 14px;
      font-weight: bold;
    }

    select {
      margin-right: 20px;
      padding: 5px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
  }
  .reaction-search-item {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;

    .instruction {
      margin-bottom: 20px;
      font-size: 14px;
      font-style: italic;
      color: #666;
    }

    .reaction-box {
      display: flex;
      flex-direction: column; /* 垂直排列 */
      gap: 10px; /* 图片之间的间距 */
      width: 100%; /* 父容器宽度占满 */
    }

    .reaction-container {
      display: flex;
      flex-direction: column; /* 图片上下排列 */
      width: 100%; /* 父容器宽度占满 */
      align-items: center; /* 图片居中对齐 */
    }

    .reaction-item {
      width: 100%; /* 图片宽度占满父容器 */
      height: 80px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center; /* 图片水平居中 */
    }

    .molecule-container {
      position: relative;
      width: 100%; /* 设置宽度为父容器的 100% */
      height: 100%; /* 设置高度为父容器的 100% */
    }

    .reaction-image {
      width: 100%; /* 图片宽度占满父容器 */
      height: 100%; /* 图片高度占满父容器 */
      object-fit: contain; /* 保持宽高比例 */
    }
    .reaction-details {
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .details-section {
        background-color: white;
        padding: 10px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        .description-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          h4 {
            margin: 0;
          }

          button {
            padding: 5px;
            font-size: 12px;
            font-weight: bold;
            color: black;
            background-color: #f8f9fa;
            border: 1px solid #ccc;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
        }
        h4 {
          margin: 0 0 10px 0;
          font-size: 16px;
          color: #003366;
          font-weight: bold;
          cursor: pointer;
        }

        .details-content {
          margin-top: 10px;
          font-size: 14px;
          color: #555;

          ol {
            padding-left: 20px;
          }

          a {
            color: #0073e6;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
}
</style>
