import * as Phaser from 'phaser';
import { ImageEnum } from '../enums/image-enum';

export class Button extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
  }

  public create(positionX: number, positionY: number, text: string): Phaser.GameObjects.Image {
    const button = this.scene.add.image(550, 400, ImageEnum.StoneButtonReady);
    button.setScale(1.2, 0.6).setInteractive();
    button.setPosition(positionX, positionY);
    const buttonTextConfig = { fontSize: '28px', fill: '#000000' };
    const buttonText = this.scene.add.text(470, 387, text, buttonTextConfig);
    buttonText.setOrigin(0.5, 0.5);
    buttonText.setPosition(button.x, button.y);
    this.animateButton(button);
    return button;
  }

  private animateButton(button: Phaser.GameObjects.Image): void {
    button.on('pointerover', function () {
      button.setTexture(ImageEnum.StoneButtonHovered);
    });
    button.on('pointerout', function () {
      button.setTexture(ImageEnum.StoneButtonReady);
    });
  }
}
