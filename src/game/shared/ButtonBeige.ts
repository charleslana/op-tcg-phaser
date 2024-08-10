import * as Phaser from 'phaser';
import { ButtonBeigeInterface } from '../interfaces/button-beige-interface';
import { ImageEnum } from '../enums/image-enum';

export class ButtonBeige extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
  }

  public create(buttonBeige: ButtonBeigeInterface): Phaser.GameObjects.Image {
    const button = this.scene.add.image(550, 400, ImageEnum.ButtonBeige);
    if (!buttonBeige.scaleX && !buttonBeige.scaleY) {
      button.setScale(2, 2.5).setInteractive();
    } else {
      button.setScale(buttonBeige.scaleX, buttonBeige.scaleY).setInteractive();
    }
    button.setPosition(buttonBeige.positionX, buttonBeige.positionY);
    const buttonTextConfig = { fontFamily: 'LiberationSans', fontSize: '45px', fill: '#000000' };
    const buttonText = this.scene.add.text(470, 387, buttonBeige.text, buttonTextConfig);
    buttonText.setOrigin(0.5, 0.5);
    buttonText.setPosition(button.x, button.y);
    return button;
  }
}
