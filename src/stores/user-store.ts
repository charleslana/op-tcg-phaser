import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const userId = ref(0);
  function setUserId(newUserId: number) {
    userId.value = newUserId;
  }
  return { userId, setUserId };
});
