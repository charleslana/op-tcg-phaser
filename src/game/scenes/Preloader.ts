import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class Preloader extends Scene {
  constructor() {
    super(SceneEnum.Preloader);
  }

  init() {
    this.createBg();
    this.createLoadingText();
    this.createProgressBar();
  }

  preload() {
    this.load.setPath('assets/images');
    this.load.image(ImageEnum.DeckBackground, 'deck-background.jpg');
    this.load.image(ImageEnum.StoneButtonFrame, 'stone-button-frame.png');
    this.load.image(ImageEnum.StoneButtonHovered, 'stone-button-in-set-hovered.png');
    this.load.image(ImageEnum.StoneButtonReady, 'stone-button-in-set-ready.png');
    this.load.image(ImageEnum.ButtonBeige, 'button-beige.png');
    // for (let index = 0; index < 50; index++) {
    //   this.load.image(index.toString(), 'deck-background.jpg');
    // }
  }

  create() {
    this.scene.start(SceneEnum.Home);
  }

  private createBg(): void {
    const bootBg = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    bootBg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  private createLoadingText(): void {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 2 + 130, 'Carregando...', {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#000000',
      })
      .setOrigin(0.5);
  }

  private createProgressBar(): void {
    const barWidth = 468;
    const barHeight = 32;
    const { width, height } = this.scale;
    const progressBarX = width / 2;
    const progressBarY = height / 2 + barHeight / 2 + 150;
    this.add.rectangle(progressBarX, progressBarY, barWidth, barHeight).setStrokeStyle(2, 0x000000);
    const progressIndicator = this.add.rectangle(
      progressBarX - barWidth / 2 + 4,
      progressBarY,
      4,
      barHeight - 4,
      0x000000
    );
    this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
      progressIndicator.width = 4 + (barWidth - 8) * progress;
    });
  }
}
