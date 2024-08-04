<script setup lang="ts">
import { ref } from 'vue';
import type { MainMenu } from './game/scenes/MainMenu';
import PhaserGame from './game/PhaserGame.vue';

const canMoveSprite = ref();
const phaserRef = ref();

const currentScene = (scene: MainMenu) => {
  canMoveSprite.value = scene.scene.key !== 'MainMenu';
};
</script>

<template>
  <PhaserGame ref="phaserRef" @current-active-scene="currentScene" />
</template>
