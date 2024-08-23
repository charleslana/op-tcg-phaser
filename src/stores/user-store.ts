import { CardInterface } from '@/game/interfaces/card-interface';
import { CharacterTypeEnum } from '@/game/enums/character-type-enum';
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

function createDeckWithLeader(leaderIndex: number, color: ColorEnum): CardInterface[] {
  const leaderCard = dataCard[leaderIndex];
  if (leaderCard.characterType !== CharacterTypeEnum.Leader) {
    throw new Error(`O card no índice ${leaderIndex} não é um líder.`);
  }
  const otherCards = dataCard.slice(0, leaderIndex).concat(dataCard.slice(leaderIndex + 1));
  const filteredCards = otherCards.filter(
    card => card.color.includes(color) && card.characterType !== CharacterTypeEnum.Leader
  );
  let duplicatedCards: CardInterface[] = [];
  while (duplicatedCards.length < 50) {
    duplicatedCards = [...duplicatedCards, ...filteredCards];
  }
  duplicatedCards = duplicatedCards.slice(0, 50);
  return [leaderCard, ...duplicatedCards];
}

const finalDeckRed = createDeckWithLeader(0, ColorEnum.Red);
const finalDeckGreen = createDeckWithLeader(17, ColorEnum.Green);
const finalDeckBlue = createDeckWithLeader(34, ColorEnum.Blue);
const finalDeckPurple = createDeckWithLeader(51, ColorEnum.Purple);

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
