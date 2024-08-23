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

// Deck Vermelho
let leaderCard = dataCard[0];
let otherCards = dataCard.slice(1);
const redCards = otherCards.filter(card => card.color.includes(ColorEnum.Red));
let duplicatedRedCards: CardInterface[] = [];
while (duplicatedRedCards.length < 50) {
  duplicatedRedCards = [...duplicatedRedCards, ...redCards];
}
duplicatedRedCards = duplicatedRedCards.slice(0, 50);
const finalDeckRed = [leaderCard, ...duplicatedRedCards];

// Deck Verde
const leaderCardIndexGreen = 17;
leaderCard = dataCard[leaderCardIndexGreen];
otherCards = dataCard
  .slice(0, leaderCardIndexGreen)
  .concat(dataCard.slice(leaderCardIndexGreen + 1));
const greenCards = otherCards.filter(card => card.color.includes(ColorEnum.Green));
let duplicatedGreenCards: CardInterface[] = [];
while (duplicatedGreenCards.length < 50) {
  duplicatedGreenCards = [...duplicatedGreenCards, ...greenCards];
}
duplicatedGreenCards = duplicatedGreenCards.slice(0, 50);
const finalDeckGreen = [leaderCard, ...duplicatedGreenCards];

// Deck Azul
const leaderCardIndexBlue = 34;
leaderCard = dataCard[leaderCardIndexBlue];
otherCards = dataCard.slice(0, leaderCardIndexBlue).concat(dataCard.slice(leaderCardIndexBlue + 1));
const blueCards = otherCards.filter(card => card.color.includes(ColorEnum.Blue));
let duplicatedBlueCards: CardInterface[] = [];
while (duplicatedBlueCards.length < 50) {
  duplicatedBlueCards = [...duplicatedBlueCards, ...blueCards];
}
duplicatedBlueCards = duplicatedBlueCards.slice(0, 50);
const finalDeckBlue = [leaderCard, ...duplicatedBlueCards];

// Deck Roxo
const leaderCardIndexPurple = 51;
leaderCard = dataCard[leaderCardIndexPurple];
otherCards = dataCard
  .slice(0, leaderCardIndexPurple)
  .concat(dataCard.slice(leaderCardIndexPurple + 1));
const purpleCards = otherCards.filter(card => card.color.includes(ColorEnum.Purple));
let duplicatedPurpleCards: CardInterface[] = [];
while (duplicatedPurpleCards.length < 50) {
  duplicatedPurpleCards = [...duplicatedPurpleCards, ...purpleCards];
}
duplicatedPurpleCards = duplicatedPurpleCards.slice(0, 50);
const finalDeckPurple = [leaderCard, ...duplicatedPurpleCards];

const decks: UserDeckInterface[] = [
  {
    id: 1,
    name: 'Deck Vermelho',
    equipped: true,
    cards: finalDeckRed,
  },
  {
    id: 2,
    name: 'Deck Verde',
    equipped: false,
    cards: finalDeckGreen,
  },
  {
    id: 3,
    name: 'Deck Azul',
    equipped: false,
    cards: finalDeckBlue,
  },
  {
    id: 4,
    name: 'Deck Roxo',
    equipped: false,
    cards: finalDeckPurple,
  },
  {
    id: 5,
    name: 'Deck E Colocar limite de cha',
    equipped: false,
    cards: finalDeckRed,
  },
  {
    id: 6,
    name: 'Deck F',
    equipped: false,
    cards: finalDeckRed,
  },
  {
    id: 7,
    name: 'Deck G',
    equipped: false,
    cards: finalDeckRed,
  },
  {
    id: 8,
    name: 'Deck H',
    equipped: false,
    cards: finalDeckRed,
  },
];

const data: UserInterface = { id: 1, username: 'charles', name: 'Jogador', decks: decks };
