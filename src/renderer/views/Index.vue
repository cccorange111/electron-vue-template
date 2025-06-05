<template>
  <div class="container">
    <button class="start-button" @click="goToHome">开始</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

// 跳转到 /home 路由
const goToHome = () => {
  router.push("/home");
};
</script>

<style lang="scss" scoped>
.container {
  background-image: url("@renderer/assets/background.jpg");
  background-size: 100% 100%; 
  background-repeat: no-repeat; 
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.start-button {
  margin-top:150px;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: #000000;
  background-color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
}

// .start-button:hover {
//   background-color: #0056b3;
// }

.start-button:active {
  transform: scale(0.98);
}
</style>
