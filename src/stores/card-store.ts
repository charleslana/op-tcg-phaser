import { CardInterface } from '@/game/interfaces/card-interface';
import { CharacterTypeEnum } from '@/game/enums/character-type-enum';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCardStore = defineStore('cards', () => {
  const cards = ref<CardInterface[]>([]);
  function setCards(newCards: CardInterface[]) {
    cards.value = newCards;
  }
  function setData() {
    cards.value = dataCard;
  }
  return { cards, setCards, setData };
});

export const dataCard: CardInterface[] = [
  {
    id: 1,
    name: 'Monkey. D. Luffy',
    image: 'ST01-001',
    descriptionPt:
      '[Ativar: Principal] [Uma vez por turno] Dê a este Líder ou até 1 dos seus Personagens descansado 1 carta DON!!.',
    descriptionEn:
      '[Activate: Main] [Once Per Turn] Give this Leader or up to 1 of your Characters 1 rested DON!! card.',
    characterType: CharacterTypeEnum.Leader,
  },
  {
    id: 2,
    name: 'Usopp',
    image: 'ST01-002',
    descriptionPt:
      '[DON!! X2] [Ao Atacar] Seu oponente não pode ativar um Personagem [Bloqueador] que tenha 5000 ou mais de Poder durante esta batalha. [Gatilho] Jogue esta carta.',
    descriptionEn:
      '[DON!! X2] [When Attacking] Your opponent cannot activate a [Blocker] Character that has 5000 or more Power during this battle. [Trigger] Play this card.',
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 3,
    name: '',
    image: 'ST01-003',
    descriptionPt: null,
    descriptionEn: null,
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 4,
    name: '',
    image: 'ST01-004',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 5,
    name: '',
    image: 'ST01-005',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 6,
    name: '',
    image: 'ST01-006',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 7,
    name: '',
    image: 'ST01-007',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 8,
    name: '',
    image: 'ST01-008',
    descriptionPt: null,
    descriptionEn: null,
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 9,
    name: '',
    image: 'ST01-009',
    descriptionPt: null,
    descriptionEn: null,
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 10,
    name: '',
    image: 'ST01-010',
    descriptionPt: null,
    descriptionEn: null,
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 11,
    name: '',
    image: 'ST01-011',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 12,
    name: '',
    image: 'ST01-012',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 13,
    name: '',
    image: 'ST01-013',
    descriptionPt: null,
    descriptionEn: null,
    characterType: CharacterTypeEnum.Character,
  },
  {
    id: 14,
    name: '',
    image: 'ST01-014',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Event,
  },
  {
    id: 15,
    name: '',
    image: 'ST01-015',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Event,
  },
  {
    id: 16,
    name: '',
    image: 'ST01-016',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Event,
  },
  {
    id: 17,
    name: '',
    image: 'ST01-017',
    descriptionPt: '',
    descriptionEn: '',
    characterType: CharacterTypeEnum.Stage,
  },
];
