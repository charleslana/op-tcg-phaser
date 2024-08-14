import { dataCard } from './card-store';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { UserDeckInterface } from '@/game/interfaces/user-deck-interface';
import { UserInterface } from '@/game/interfaces/user-interface';

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInterface>({
    id: 0,
    username: '',
    name: '',
    decks: [],
  });
  function setUser(newUser: UserInterface) {
    user.value = newUser;
  }
  function setData() {
    user.value = data;
  }
  return { user, setUser, setData };
});

const leaderCard = dataCard[0];
const otherCards = dataCard.slice(1);
let duplicatedCards = [...otherCards, ...otherCards, ...otherCards, ...otherCards];
duplicatedCards = duplicatedCards.slice(0, 50);
const finalDeck = [leaderCard, ...duplicatedCards];

const decks: UserDeckInterface[] = [
  {
    id: 1,
    name: 'Deck A',
    equipped: false,
    cards: finalDeck,
  },
  {
    id: 2,
    name: 'Deck B Colocar limite de cha',
    equipped: false,
    cards: finalDeck,
  },
  {
    id: 2,
    name: 'Deck C',
    equipped: true,
    cards: finalDeck,
  },
];

const data: UserInterface = { id: 1, username: 'charles', name: 'Jogador', decks: decks };
