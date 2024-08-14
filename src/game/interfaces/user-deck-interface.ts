import { CardInterface } from './card-interface';

export interface UserDeckInterface {
  id: number;
  name: string;
  equipped: boolean;
  cards: CardInterface[];
}
