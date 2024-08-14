import { CharacterTypeEnum } from '../enums/character-type-enum';

export interface CardInterface {
  id: number;
  name: string;
  image: string;
  descriptionPt: string | null;
  descriptionEn: string | null;
  characterType: CharacterTypeEnum;
}
