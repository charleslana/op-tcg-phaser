import { CharacterTypeEnum } from '../enums/character-type-enum';
import { ColorEnum } from '../enums/color-enum';

export interface CardInterface {
  id: number;
  name: string;
  image: string;
  descriptionPt: string | null;
  descriptionEn: string | null;
  characterType: CharacterTypeEnum;
  color: ColorEnum;
  cost?: number;
  power?: number;
  counter?: number;
}
