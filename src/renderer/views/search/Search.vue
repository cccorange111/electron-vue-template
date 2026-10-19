<template>
  <div>
    <div class="container">
      <!-- <div class="sidebar">
        <div class="tabs">
          <div 
            class="tab" 
            :class="{ active: activeTab === 'analyze' }" 
            @click="setActiveTab('analyze')">
            Analyze
          </div>
          <div 
            class="tab" 
            :class="{ active: activeTab === 'refine' }" 
            @click="setActiveTab('refine')">
            Refine
          </div>
        </div>

        <div class="analyze-section">
          <h4>Analyze by:</h4>
          <div class="analyze-dropdown" v-if="state.activeTab == 'analyze'">
            <select v-model="selectedMethod">
              <option value="methodsNow">MethodsNow</option>
              <option value="otherMethod">Other Method</option>
            </select>
            <span class="info-tooltip">?</span>
          </div>
          <p>MethodsNow Available: {{ state.methodsNowCount }}</p>
          <div class="progress-bar-container">
            <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
          </div>
          <button class="show-more">Show More</button>
          <button class="show-more" @click="toHome">Back home</button>
        </div>
      </div> -->

      <div class="content">
        <div class="group-sort">
          <!-- <label for="group-by">Group by:</label>
          <select id="group-by" v-model="groupBy">
            <option value="none">No Grouping</option>
            <option value="reagent">Reagent</option>
            <option value="solvent">Solvent</option>
          </select>

          <label for="sort-by">Sort by:</label>
          <select id="sort-by" v-model="sortBy">
            <option value="accessionNumber">Accession Number</option>
            <option value="yield">Yield</option>
            <option value="steps">Steps</option>
          </select> -->
          <button class="show-more" @click="toHome">Back home</button>
        </div>
        <!-- <div class="reaction-search-item">
            <p class="instruction">Single Step <em>Hover over any structure for more options.</em></p>

            <div class="reaction-box">
            <div class="reaction-container">
                <div class="reaction-item">
                <div id="reactant1" class="molecule-container"></div>
                <div class="yield">~187</div>
                </div>
                <div class="reaction-symbol">+</div>
                <div class="reaction-item">
                <div id="reactant2" class="molecule-container"></div>
                <div class="yield">~85</div>
                </div>
                <div class="reaction-symbol">→</div>
                <div class="reaction-item">
                <div id="reactant3" class="molecule-container"></div>
                <div class="yield">59%</div>
                <div class="yield">~139</div>
                </div>
            </div>
            </div>

            <div class="reaction-details">
            <div class="details-section">
                <h4 @click="toggleSection('overview')">
                <span v-if="!sections.overview.open">&#9654;</span>
                <span v-else>&#9660;</span> Overview
                </h4>
                <div v-if="sections.overview.open" class="details-content">
                <p><strong>Steps/Stages</strong></p>
                <p>{{ sections.overview.content }}</p>
                </div>
            </div>

            <div class="details-section">
                <h4 @click="toggleSection('methodsNow')">
                <span v-if="!sections.methodsNow.open">&#9654;</span>
                <span v-else>&#9660;</span> MethodsNow™
                </h4>
                <div v-if="sections.methodsNow.open" class="details-content">
                <p><strong>Procedure</strong></p>
                <ol>
                    <li v-for="(step, index) in sections.methodsNow.steps" :key="index">
                    {{ step }}
                    </li>
                </ol>
                <a href="#">View more...</a>
                </div>
            </div>
            </div>
        </div> -->
        <div
          v-for="(item, index) in data.data"
          :key="index"
          class="reaction-search-item"
        >
          <!-- Instruction Section -->
          <!-- <p class="instruction">
            <em>化合物</em>
          </p> -->

          <!-- Reaction Box -->
          <div class="reaction-box">
            <div class="reaction-container">
              <!-- Reactant 1 -->
              <div class="reaction-item">
                <div
                  :id="'reactant' + index + '_1'"
                  class="molecule-container"
                ></div>
              </div>
              <!-- Reactant 2 -->
              <div class="reaction-item">
                <div
                  :id="'reactant' + index + '_2'"
                  class="molecule-container"
                ></div>
              </div>
              <!-- Reactant 3 -->
              <div class="reaction-item">
                <div
                  :id="'reactant' + index + '_3'"
                  class="molecule-container"
                ></div>
              </div>
            </div>
          </div>

          <!-- Reaction Details -->
          <div class="reaction-details">
            <div class="details-section">
              <!-- Overview Section -->
              <h4>Overview</h4>
              <div class="details-content">
                <p><strong>Steps/Stages</strong></p>
                <p>Compound Name: {{ item.Compound_name }}</p>
                <p>Abbreviation: {{ item.Abbreviation }}</p>
                <!-- <p>Chemical Formula: {{ item.Chemical_formula }}</p> -->
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
// const res_data = reactive({
//   code: 200,
//   msg: {
//     data: [
//       {
//         smiles: 'C1=CC(=CC=C1C(=O)O)O',
//         Compound_name: 'A',
//         Abbreviation: 'NC',
//         Chemical_formula: '(C6H7N3O11)n',
//       },
//     ],
//   },
// })

const data = reactive({})

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
    console.log('cas搜索data,res', res)
    if (res.code === 200) {
      data.data = res.msg.data
      console.log(data.data)
      console.log('发送信息，返回的结果是：', res)
    }
  } catch (error) {
    console.error('sendMessage error', error)
  }
}
onMounted(() => {
  console.log('search路由:', route.query, route.query.q, route.query.id)

  const script = document.createElement('script')
  script.src = 'public/RDKit_minimal.js'
  script.onload = () => {
    console.log('RDKit_minimal.js 加载成功')
    getData()
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
        var width = 200
        var height = 200
        console.log('debug', data, data.data)
        data.data.forEach((item, index) => {
          const molecule = RDKit.get_mol(item.smiles)
          const svg = molecule.get_svg(width, height)
          // 根据动态生成的 id 插入到对应的容器中
          document.getElementById(`reactant${index}_1`).innerHTML = svg
        })
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
      border: 1px solid #ddd;
      padding: 15px;
      background-color: white;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .reaction-container {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .reaction-item {
        text-align: center;

        svg {
          border: 1px solid #ddd;
          margin: 0 auto;
        }

        .yield {
          margin-top: 10px;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
        }
      }

      .reaction-symbol {
        font-size: 18px;
        font-weight: bold;
      }
    }

    .reaction-details {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .details-section {
        background-color: white;
        padding: 15px;
        border: 1px solid #ddd;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

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
