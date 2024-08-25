import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const audioKey = 'audio';
  const musicKey = 'music';
  const audio = ref(getFromLocalStorage(audioKey, true));
  const music = ref(getFromLocalStorage(musicKey, true));
  function getFromLocalStorage(key: string, defaultValue: boolean): boolean {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  }
  function saveToLocalStorage(key: string, value: boolean) {
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

  function setMusic(value: boolean) {
    music.value = value;
    saveToLocalStorage(musicKey, value);
  }
  function initializeSettings() {
    audio.value = getFromLocalStorage(audioKey, true);
    music.value = getFromLocalStorage(musicKey, true);
  }
  return {
    audio,
    music,
    toggleAudio,
    toggleMusic,
    setAudio,
    setMusic,
    initializeSettings,
  };
});
