import * as Phaser from 'phaser';

export interface InputStateInterface {
  name: string;
  nameText: Phaser.GameObjects.Text;
  isEnteringName: boolean;
  formCursor: Phaser.GameObjects.Text;
  isHidden: boolean;
}
