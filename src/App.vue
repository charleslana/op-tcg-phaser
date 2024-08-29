<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PhaserGame from './game/PhaserGame.vue';
import { Scene } from 'phaser';
import { SceneEnum } from './game/enums/scene-enum';
import LoginView from './views/LoginView.vue';

const phaserRef = ref();
const isLogin = ref(false);

onMounted(() => {
  document.title = 'ONE PIECE TCG(Trading Card Game) Simulador';
});

function currentScene(scene: Scene): void {
  clearScene();
  if (scene.scene.key === SceneEnum.Login) {
    // isLogin.value = true;
  }
}

function clearScene(): void {
  isLogin.value = false;
}
</script>

<template>
  <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
  <LoginView v-if="isLogin" />
</template>
