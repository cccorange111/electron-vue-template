<template>
  <div class="fire-monitor" style="overflow-y: hidden">
    <div class="loading" v-show="loading">
      <div class="loadbox">
        <img src="/public/chart/images/loading.gif" alt="loading" />
        页面加载中...
      </div>
    </div>

    <!-- 头部 -->
    <div class="head">
      <div class="weather" style="left: 0.3rem" @click="goToHome">
        <span>返回</span>
      </div>
      <h1>
        <a style="color: white">数据库监控</a>
      </h1>
      <div class="weather">
        <span>{{ timeText }}</span>
      </div>
    </div>

    <!-- 主体 -->
    <div class="mainbox">
      <ul class="clearfix">
        <!-- 左侧 -->
        <li>
          <!-- style="height: 5.2rem"  -->
          <div class="boxall" style="height: 9.5rem">
            <div class="alltitle">物质节点结构</div>

            <div class="sycm">
              <ul class="clearfix">
                <li>
                  <span>CAS号</span>
                </li>
                <li>
                  <span>物质名称</span>
                </li>
                <li>
                  <span>物质简称</span>
                </li>
                <li>
                  <span>smiles格式</span>
                </li>
              </ul>
            </div>

            <div class="addnew">
              <div class="tit02"><span>示例</span></div>
              <!-- <div class="allnav" id="wbzl" style="height: 2.2rem">xxxx</div> -->
              <!-- <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.18rem">
                示例数据加载中...
              </span> -->
              <div class="allnav0">
                <ul
                  style="
                    list-style-type: disc;
                    margin-left: 1.2em;
                    color: rgba(255, 255, 255, 0.6);
                  "
                >
                  <li>
                    <strong>CAS：</strong>
                    <span>9004-70-0　</span>
                    <strong>名称：</strong>
                    <span>A　</span>
                    <strong>简称：</strong>
                    <span>Nc</span>
                    <br />
                    <strong>smiles：</strong>
                    <span>
                      O=[N+]([O-])OC1OC(O[N+](=O)[O-])C(O[N+](=O)[O-])C(O[N+](=O)[O-])C1OC1OC(O[N+](=O)[O-])C(O[N+](=O)[O-])C(O[N+](=O)[O-])C1O
                    </span>
                  </li>
                  <li>
                    <strong>CAS：</strong>
                    <span>121-82-4　</span>
                    <strong>名称：</strong>
                    <span>G　</span>
                    <strong>简称：</strong>
                    <span>RDX</span>
                    <br />
                    <strong>smiles：</strong>
                    <span>
                      O=[N+]([O-])N1CN([N+](=O)[O-])CN([N+](=O)[O-])C1
                    </span>
                  </li>
                  <li>
                    <strong>CAS：</strong>
                    <span>2691-41-0　</span>
                    <strong>名称：</strong>
                    <span>HMX　</span>
                    <strong>简称：</strong>
                    <span>—</span>
                    <br />
                    <strong>smiles：</strong>
                    <span>
                      O=[N+]([O-])N1CN([N+](=O)[O-])CN([N+](=O)[O-])CN([N+](=O)[O-])C1
                    </span>
                  </li>
                  <li>
                    <strong>CAS：</strong>
                    <span>135285-90-4　</span>
                    <strong>名称：</strong>
                    <span>L　</span>
                    <strong>简称：</strong>
                    <span>CL-20</span>
                    <br />
                    <strong>smiles：</strong>
                    <span>
                      O=[N+]([O-])N1C2N([N+](=O)[O-])C3N([N+](=O)[O-])C4N([N+](=O)[O-])C5N([N+](=O)[O-])C6N([N+](=O)[O-])C1C23C564
                    </span>
                  </li>
                  <li>
                    <strong>CAS：</strong>
                    <span>000-00-0　</span>
                    <strong>名称：</strong>
                    <span>N　</span>
                    <strong>简称：</strong>
                    <span>DlANP</span>
                    <br />
                    <strong>smiles：</strong>
                    <span>[N-]=[N+]=NCCN(CN=[N+]=[N-])[N+](=O)[O-]</span>
                  </li>
                  <li>
                    <strong>CAS：</strong>
                    <span>26028-46-6　</span>
                    <strong>名称：</strong>
                    <span>Q　</span>
                    <strong>简称：</strong>
                    <span>TRAT</span>
                    <br />
                    <strong>smiles：</strong>
                    <span>CC(=O)N1CN(C(C)=O)CN(C(C)=O)C1</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- <div class="boxall" style="height: 4.9rem">
            <div class="alltitle">XXX</div>

            <div class="addnew">
              <div class="tit02"><span>xxxx</span></div>
              <div class="allnav" id="wwbzl" style="height: 2rem"></div>
            </div>
          </div> -->
        </li>

        <!-- 中间 -->
        <li>
          <div class="bar">
            <div class="barbox">
              <ul class="clearfix">
                <li class="pulll_left counter">33468</li>
                <li class="pulll_left counter">15</li>
              </ul>
            </div>
            <div class="barbox2">
              <ul class="clearfix">
                <li class="pulll_left">物质节点数量</li>
                <li class="pulll_left">反应节点数量</li>
              </ul>
            </div>
          </div>

          <div class="bar">
            <div class="barbox">
              <ul class="clearfix">
                <li class="pulll_left counter">10000000</li>
                <li class="pulll_left counter">3681</li>
              </ul>
            </div>
            <div class="barbox2">
              <ul class="clearfix">
                <li class="pulll_left">现有配方和比冲</li>
                <li class="pulll_left">文献数量</li>
              </ul>
            </div>
          </div>

          <div class="map">
            <div class="map1"><img src="/public/chart/images/lbx.png" /></div>
            <div class="map2"><img src="/public/chart/images/jt.png" /></div>
            <div class="map3"><img src="/public/chart/images/map.png" /></div>
            <div class="map4" id="map_1"></div>
          </div>

          <div
            class="boxall"
            style="height: 100%; padding: 0.1rem 0.1rem 0.1rem 0.1rem"
          >
            <!-- <div
              class="allnav"
              id="dbj"
              style="width: 7.2rem; height: 3rem; margin-top: 0.3rem"
            ></div> -->

            <img
              src="/public/chart/images/page2.png "
              style="background: rgba(255, 255, 255, 0.5)"
            />
          </div>
        </li>

        <!-- 右侧 -->
        <li>
          <div class="boxall" style="height: 4.8rem">
            <div class="alltitle">反应节点格式</div>
            <div class="sycm">
              <ul class="clearfix">
                <li><span>反应物smiles</span></li>
                <li><span>生成物smiles</span></li>
                <li><span>试剂</span></li>
                <li><span>反应温度</span></li>
              </ul>
              <ul class="clearfix">
                <li><span>反应时长</span></li>
                <li><span>反应步骤</span></li>
                <li><span>产率</span></li>
                <li><span>反应类型</span></li>
              </ul>
              <ul class="clearfix">
                <li><span>表征</span></li>
                <li><span>是否手动导入</span></li>
                <li><span>反应来源</span></li>
              </ul>
            </div>

            <div class="addnew">
              <div class="tit02"><span>示例</span></div>
              <!-- <span style="color: rgba(255, 255, 255, 0.6); font-size: 0.08rem">
                示例数据加载中...
              </span> -->
              <span
                style="
                  color: rgba(255, 255, 255, 0.6);
                  font-size: 0.15rem;
                  line-height: 1.2;
                  display: block;
                  white-space: normal;
                  word-break: break-all;
                  padding: 0.1rem 0.2rem;
                "
              >
                反应类型：醋化反应
                <br />
                反应物smiles格式：*0
                [C@H](*)0[c@@H]2C0)0[C@@H]1CO；0={N+]([0-J)0；0=S(=0)(0)07
                <br />
                生成物smiles格式：0=[N+]([0-])0CC10C(0[N+](=0)[0-])C(0[N+](=0)[0-])C(0[N+](=0)[0-])C10C10C(CO[N+]{=0)[0-)C(O[N+](=0)[0-])C(O[N#](=0)[0-])C10[N+](=0)[0-；o7
                <br />
                试剂：W, X
                <br />
                反应温度：28–34℃
                <br />
                反应时长：1 h
                <br />
                反应步骤：向 100 mL 烧杯加入 5 mL 65% 硝酸与 15 mL 98%
                硫酸，冷却后加入约半个鸡蛋大小的医用脱脂棉，盖表面皿静置半小时。
                <br />
                表征：1H-NMR、13C-NMR、IR、硝化率
              </span>
            </div>
          </div>

          <div class="boxall" style="height: 4.5rem">
            <div class="alltitle">文献字段</div>
            <div class="sycm">
              <ul class="clearfix">
                <li><span>化合物标识符</span></li>
                <li><span>原子信息</span></li>
                <li><span>化学键信息</span></li>
                <li><span>坐标信息</span></li>
              </ul>
              <ul class="clearfix">
                <li><span>电荷</span></li>
                <li><span>化合物属性</span></li>
                <li><span>计数统计</span></li>
                <li><span>......</span></li>
              </ul>
            </div>

            <div class="addnew">
              <div class="tit02"><span>来源</span></div>
              <div class="journal-table">
                <table>
                  <thead>
                    <tr>
                      <th>英文名称</th>
                      <th>中文名称</th>
                      <th>核心焦点</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span>Nature Catalysis</span></td>
                      <td>《自然-催化》</td>
                      <td>
                        <span>催化</span>
                        科学及其应用
                      </td>
                    </tr>
                    <tr>
                      <td><span>Nature Chemical Biology</span></td>
                      <td>《自然-化学生物学》</td>
                      <td>
                        化学与
                        <span>生物学</span>
                        的交叉领域
                      </td>
                    </tr>
                    <tr>
                      <td><span>Nature Chemistry</span></td>
                      <td>《自然-化学》</td>
                      <td>
                        化学
                        <span>所有</span>
                        分支的综合性研究
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const loading = ref(true)
const timeText = ref('')
const router = useRouter()
let timers: number[] = []
let charts: Record<string, any> = {}

function addCssOnce(href: string) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }
}

function loadScriptOnce(src: string) {
  return new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = false
    s.onload = () => resolve()
    s.onerror = () => reject(new Error('Failed to load ' + src))
    document.body.appendChild(s)
  })
}

// 时钟
function startClock() {
  const tick = () => {
    const d = new Date()
    timeText.value = `${d.getFullYear()}年${
      d.getMonth() + 1
    }月${d.getDate()}日-${d.getHours()}时${d.getMinutes()}分${d.getSeconds()}秒`
  }
  tick()
  const t = window.setInterval(tick, 1000)
  timers.push(t)
}

// 可选：演示初始化一个 ECharts
function initChartsDemo() {
  const echarts = (window as any).echarts
  if (!echarts) return
  const el = document.getElementById('wxyg')
  if (el) {
    charts['wxyg'] = echarts.init(el)
    charts['wxyg'].setOption({
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [10, 20, 15] }],
    })
  }
}

onMounted(async () => {
  const forceClose = window.setTimeout(() => (loading.value = false), 5000)
  timers.push(forceClose as any)

  try {
    // 1) CSS
    addCssOnce('/public/chart/css/comon0.css')

    // 2) 依赖顺序加载
    await loadScriptOnce('/public/chart/js/jquery.js')
    await loadScriptOnce('/public/chart/js/echarts.min.js')
    await loadScriptOnce('/public/chart/js/echarts-gl.min.js')
    await loadScriptOnce('/public/chart/js/echarts-tool.js')
    await loadScriptOnce('/public/chart/js/timelineOption.js')
    await loadScriptOnce('/public/chart/js/jquery.waypoints.min.js')
    await loadScriptOnce('/public/chart/js/jquery.countup.min.js')

    // 3) 数字动画初始化
    const $ = (window as any).jQuery
    if ($ && $.fn) {
      const $counters = $('.counter')
      $counters.each(function () {
        const num = ($(this).text() || '').replace(/[^\d.]/g, '') || '0'
        $(this).text(num)
      })
      // 某些版本依赖 Waypoints 先 ready，延时一帧
      setTimeout(() => {
        if ($.fn.countUp)
          $counters.each(function () {
            $(this).countUp({ time: 800, delay: 10 })
          })
        else if ($.fn.counterUp)
          $counters.each(function () {
            $(this).counterUp({ time: 800, delay: 10 })
          })
      }, 100)
    }

    // 4) 示例图
    initChartsDemo()

    // 5) 时钟
    startClock()
  } catch (err) {
    console.error('静态资源加载失败：', err)
  } finally {
    // ✅ 无论成功或失败，都关闭loading（再延迟一点点让首屏更平滑）
    setTimeout(() => (loading.value = false), 200)
  }
})

onBeforeUnmount(() => {
  timers.forEach(clearInterval)
  timers = []
  Object.values(charts).forEach((c: any) => c?.dispose?.())
  charts = {}
})

const goToHome = () => {
  router.go(-1)
}
</script>

<style lang="scss" scoped>
.grid {
  margin-top: 5%;
  width: 80%;
  height: 10px;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-column-gap: 14px;
}
.line {
  position: relative;
  width: 90%;
  height: 7px;
}
.line::before,
.line::after {
  content: '';
  position: absolute;
  width: 4.5rem;
  height: 100%;
  border-radius: 7px;
  background-color: #ff0000;
}
.line::after {
  bottom: 0;
  background-color: #b22222;
  width: calc(80% - 10px);
}
.fire-monitor {
  min-height: 100vh;
}

.journal-table {
  width: 100%;
  margin-top: 0.2rem;
  overflow-x: auto;
  color: rgba(255, 255, 255, 0.7);
}

.journal-table table {
  width: 100%;
  border-collapse: collapse;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.14rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.08rem;
  overflow: hidden;
}

.journal-table th,
.journal-table td {
  padding: 0.12rem 0.2rem;
  text-align: left;
  color: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.journal-table th {
  font-weight: bold;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
}

.journal-table td span {
  color: rgba(255, 255, 255, 0.9);
}

.allnav0 {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.16rem;
  line-height: 1.8;
  display: block;
  white-space: normal;
  word-break: break-all;
  padding: 0.1rem 0.2rem;
}
.allnav0 li {
  margin-bottom: 0.2rem;
}
.allnav0 span {
  color: rgba(255, 255, 255, 0.6);
}
.allnav0 strong {
  color: rgba(255, 255, 255, 0.8);
}
</style>
