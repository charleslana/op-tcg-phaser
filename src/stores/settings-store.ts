import * as Phaser from 'phaser';
import { AudioEnum } from '@/game/enums/audio-enum';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const audioKey = 'audio';
  const musicKey = 'music';
  const audio = ref(getFromLocalStorage(audioKey, true));
  const music = ref(getFromLocalStorage(musicKey, true));
  const bgMusic = ref<Phaser.Sound.BaseSound | null>(null);
  const languageKey = 'language';
  const language = ref(getFromLocalStorage(languageKey, getBrowserLanguage()));
  function getFromLocalStorage(key: string, defaultValue: unknown): unknown {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  }
  function saveToLocalStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function toggleAudio() {
    audio.value = !audio.value;
    saveToLocalStorage(audioKey, audio.value);
  }
  function toggleMusic() {
    music.value = !music.value;
    saveToLocalStorage(musicKey, music.value);
  }
  function setAudio(value: boolean) {
    audio.value = value;
    saveToLocalStorage(audioKey, value);
  }

  function setMusic(value: boolean, scene: Phaser.Scene) {
    music.value = value;
    saveToLocalStorage(musicKey, value);
    if (!value && bgMusic.value) {
      stopBackgroundMusic();
      return;
    }
    playBackgroundMusic(scene);
  }
  function initializeSettings() {
    audio.value = getFromLocalStorage(audioKey, true);
    music.value = getFromLocalStorage(musicKey, true);
  }
  function playBackgroundMusic(scene: Phaser.Scene) {
    if (!bgMusic.value && music.value) {
      bgMusic.value = scene.sound.add(AudioEnum.Background, { volume: 0.5, loop: true });
      bgMusic.value.play();
    }
  }
  function stopBackgroundMusic() {
    if (bgMusic.value) {
      bgMusic.value.stop();
      bgMusic.value = null;
    }
  }
  function setLanguage(value: string) {
    language.value = value;
    saveToLocalStorage(languageKey, value);
  }

  function getBrowserLanguage(): string {
    const lang = navigator.language;
    return lang.startsWith('pt') ? 'pt' : 'en';
  }
  function setDefaultLanguage(scene: Phaser.Scene) {
    scene.translation.changeLanguage(language.value as string);
  }
  return {
    audio,
    music,
    language,
    toggleAudio,
    toggleMusic,
    setAudio,
    setMusic,
    playBackgroundMusic,
    stopBackgroundMusic,
    initializeSettings,
    setLanguage,
    setDefaultLanguage,
  };
});
