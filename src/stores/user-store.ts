import { CardInterface } from '@/game/interfaces/card-interface';
import { ColorEnum } from '@/game/enums/color-enum';
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
  function getDeck(deckId: number): UserDeckInterface | undefined {
    return user.value.decks.find(deck => deck.id === deckId);
  }
  function setData() {
    user.value = data;
  }
  return { user, setUser, setData, getDeck };
});

const leaderCard = dataCard[0];
const otherCards = dataCard.slice(1);
const redCards = otherCards.filter(card => card.color === ColorEnum.Red);
let duplicatedRedCards: CardInterface[] = [];
while (duplicatedRedCards.length < 50) {
  duplicatedRedCards = [...duplicatedRedCards, ...redCards];
}
duplicatedRedCards = duplicatedRedCards.slice(0, 50);
const finalDeck = [leaderCard, ...duplicatedRedCards];

const decks: UserDeckInterface[] = [
  {
    id: 1,
    name: 'Deck A',
    equipped: true,
    cards: finalDeck,
  },
  {
    id: 2,
    name: 'Deck B Colocar limite de cha',
    equipped: false,
    cards: finalDeck,
  },
  {
    id: 3,
    name: 'Deck C',
    equipped: false,
    cards: finalDeck,
  },
  {
    id: 4,
    name: 'Deck D',
    equipped: false,
    cards: finalDeck,
  },
  {
    id: 5,
    name: 'Deck E',
    equipped: false,
    cards: finalDeck,
  },
  {
    id: 6,
    name: 'Deck F',
    equipped: false,
    cards: finalDeck,
  },
  {
    id: 7,
    name: 'Deck G',
    equipped: false,
    cards: finalDeck,
  },
  {
    id: 8,
    name: 'Deck H',
    equipped: false,
    cards: finalDeck,
  },
];

const data: UserInterface = { id: 1, username: 'charles', name: 'Jogador', decks: decks };
