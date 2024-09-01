import * as Phaser from 'phaser';
import { AudioEnum } from '../enums/audio-enum';
import { ImageEnum } from '../enums/image-enum';
import { useSettingsStore } from '@/stores/settings-store';

export class ButtonAudio extends Phaser.GameObjects.Container {
  constructor(scene: Phaser.Scene) {
    super(scene);
    this.scene.add.existing(this);
    this.create();
  }

  private settingsStore = useSettingsStore();

  private create(): void {
    this.validateAudioMusicIcon();
    this.createAudioIcon();
    this.createMusicIcon();
  }

  private validateAudioMusicIcon(): void {
    this.settingsStore.initializeSettings();
  }

  private createAudioIcon(): void {
    const { width } = this.scene.scale;
    const button = this.scene.add.image(550, 400, ImageEnum.PanelBeige);
    button.setScale(0.7, 0.7).setInteractive();
    button.setPosition(width - 200, 200);
    const image = this.settingsStore.audio ? ImageEnum.AudioOn : ImageEnum.AudioOff;
    const icon = this.scene.add.image(button.x, button.y, image);
    icon.setScale(1.2, 1.2);
    icon.setOrigin(0.5, 0.5);
    icon.setPosition(button.x, button.y);
    button.on('pointerdown', () => {
      this.toggleAudioIcon(icon);
      if (this.settingsStore.audio) {
        this.scene.sound.play(AudioEnum.Click);
      }
    });
    this.createOverlayButton(button);
  }

  private toggleAudioIcon(icon: Phaser.GameObjects.Image): void {
    if (icon.texture.key === ImageEnum.AudioOn) {
      icon.setTexture(ImageEnum.AudioOff);
      this.settingsStore.setAudio(false);
    } else {
      icon.setTexture(ImageEnum.AudioOn);
      this.settingsStore.setAudio(true);
    }
  }

  private createMusicIcon(): void {
    const { width } = this.scene.scale;
    const button = this.scene.add.image(550, 400, ImageEnum.PanelBeige);
    button.setScale(0.7, 0.7).setInteractive();
    button.setPosition(width - 200, 300);
    const image = this.settingsStore.music ? ImageEnum.MusicOn : ImageEnum.MusicOff;
    const icon = this.scene.add.image(button.x, button.y, image);
    icon.setScale(1.2, 1.2);
    icon.setOrigin(0.5, 0.5);
    icon.setPosition(button.x, button.y);
    button.on('pointerdown', () => {
      this.toggleMusicIcon(icon);
      if (this.settingsStore.audio) {
        this.scene.sound.play(AudioEnum.Click);
      }
    });
    this.createOverlayButton(button);
  }

  private toggleMusicIcon(icon: Phaser.GameObjects.Image): void {
    if (icon.texture.key === ImageEnum.MusicOn) {
      icon.setTexture(ImageEnum.MusicOff);
      this.settingsStore.setMusic(false, this.scene);
    } else {
      icon.setTexture(ImageEnum.MusicOn);
      this.settingsStore.setMusic(true, this.scene);
    }
  }

  private createOverlayButton(button: Phaser.GameObjects.Image): void {
    const hoverOverlay = this.scene.add
      .image(550, 400, ImageEnum.PanelBeige)
      .setAlpha(0)
      .setScale(button.scaleX, button.scaleY)
      .setPosition(button.x, button.y);
    hoverOverlay.setTint(0x000000);
    button.on('pointerover', () => {
      hoverOverlay.setAlpha(0.4);
    });
    button.on('pointerout', () => {
      hoverOverlay.setAlpha(0);
    });
  }
}
