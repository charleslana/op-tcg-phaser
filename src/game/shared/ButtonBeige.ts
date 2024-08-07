import * as Phaser from 'phaser';
import { ImageEnum } from '../enums/image-enum';

export class ButtonBeige extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
  }

  public create(
    positionX: number,
    positionY: number,
    text: string,
    { scaleX = 2, scaleY = 2.5 }
  ): Phaser.GameObjects.Image {
    const button = this.scene.add.image(550, 400, ImageEnum.ButtonBeige);
    button.setScale(scaleX, scaleY).setInteractive();
    button.setPosition(positionX, positionY);
    const buttonTextConfig = { fontFamily: 'LiberationSans', fontSize: '45px', fill: '#000000' };
    const buttonText = this.scene.add.text(470, 387, text, buttonTextConfig);
    buttonText.setOrigin(0.5, 0.5);
    buttonText.setPosition(button.x, button.y);
    return button;
  }
}
