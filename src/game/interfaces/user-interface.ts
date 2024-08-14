import { UserDeckInterface } from './user-deck-interface';

export interface UserInterface {
  id: number;
  username: string;
  name: string;
  decks: UserDeckInterface[];
}
