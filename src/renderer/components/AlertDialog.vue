<template>
  <div v-if="visible" class="alert-overlay">
    <div class="alert-box">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <button @click="close">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      title: '',
      message: '',
      resolve: null
    }
  },
  methods: {
    show(options) {
      this.title = options.title || '提示'
      this.message = options.message
      this.visible = true
      return new Promise((resolve) => {
        this.resolve = resolve
      })
    },
    close() {
      this.visible = false
      this.resolve?.()
    }
  }
}
</script>

<style scoped>
.alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.alert-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  max-width: 80%;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

button {
  margin-top: 15px;
  padding: 8px 16px;
  float: right;
}
</style>