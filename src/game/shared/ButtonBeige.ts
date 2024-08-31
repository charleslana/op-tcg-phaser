import * as Phaser from 'phaser';
import { AudioEnum } from '../enums/audio-enum';
import { ButtonBeigeInterface } from '../interfaces/button-beige-interface';
import { ImageEnum } from '../enums/image-enum';
import { useSettingsStore } from '@/stores/settings-store';

export class ButtonBeige extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
  }

  private button: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>{};
  private buttonText: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};
  private onPointerDownCallback?: () => void;
  private hoverOverlay: Phaser.GameObjects.Image = <Phaser.GameObjects.Image>{};

  public create(buttonBeige: ButtonBeigeInterface): Phaser.GameObjects.Image {
    this.button = this.scene.add.image(550, 400, ImageEnum.ButtonBeige);
    if (!buttonBeige.scaleX && !buttonBeige.scaleY) {
      this.button.setScale(2, 2.5).setInteractive();
    } else {
      this.button.setScale(buttonBeige.scaleX, buttonBeige.scaleY).setInteractive();
    }
    this.button.setPosition(buttonBeige.positionX, buttonBeige.positionY);
    const buttonTextConfig = { fontFamily: 'AlineaSans', fontSize: '45px', fill: '#000000' };
    this.buttonText = this.scene.add.text(470, 387, buttonBeige.text, buttonTextConfig);
    this.buttonText.setOrigin(0.5, 0.5);
    this.buttonText.setPosition(this.button.x, this.button.y);
    this.adjustTextToButton();
    this.button.on('pointerdown', () => {
      if (this.onPointerDownCallback) {
        this.onPointerDownCallback();
        const settingsStore = useSettingsStore();
        if (settingsStore.audio) {
          this.scene.sound.play(AudioEnum.Click);
        }
      }
    });
    this.createOverlayButton();
    return this.button;
  }

  public createOverlayButton(): void {
    this.hoverOverlay = this.scene.add
      .image(550, 400, ImageEnum.ButtonBeige)
      .setAlpha(0)
      .setScale(this.button.scaleX, this.button.scaleY)
      .setPosition(this.button.x, this.button.y);
    this.hoverOverlay.setTint(0x000000);
    this.button.on('pointerover', () => {
      this.hoverOverlay.setAlpha(0.4);
    });
    this.button.on('pointerout', () => {
      this.hoverOverlay.setAlpha(0);
    });
  }

  public hideButton(): void {
    this.button.setVisible(false);
    this.buttonText.setVisible(false);
    this.hoverOverlay.setVisible(false);
  }

  public showButton(text?: string): void {
    if (text) {
      this.buttonText.setText(text);
      this.adjustTextToButton();
    }
    this.button.setVisible(true);
    this.buttonText.setVisible(true);
    this.hoverOverlay.setVisible(true);
  }

  public changeText(newText: string): void {
    this.buttonText.setText(newText);
    this.adjustTextToButton();
  }

  public onPointerDown(callback: () => void): void {
    this.onPointerDownCallback = callback;
  }

  public offPointerDown(): void {
    this.onPointerDownCallback = undefined;
  }

  private adjustTextToButton(): void {
    const maxFontSize = 45;
    const minFontSize = 10;
    let fontSize = maxFontSize;
    this.buttonText.setFontSize(fontSize);
    const buttonBounds = this.button.getBounds();
    let textBounds = this.buttonText.getBounds();
    while (
      fontSize > minFontSize &&
      (textBounds.width > buttonBounds.width - 20 || textBounds.height > buttonBounds.height)
    ) {
      fontSize -= 1;
      this.buttonText.setFontSize(fontSize);
      textBounds = this.buttonText.getBounds();
    }
  }
}
