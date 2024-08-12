import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class Preloader extends Scene {
  constructor() {
    super(SceneEnum.Preloader);
  }

  init() {
    this.createBg();
    this.createTitleText();
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
    this.load.image(ImageEnum.PanelBeige, 'panel-beige.png');
    this.load.image(ImageEnum.DonCard, 'Cards/Don/Don.png');
    this.load.image(ImageEnum.ST01_001_Card, 'Cards/ST01/ST01-001.png');
    this.load.image(ImageEnum.ST01_002_Card, 'Cards/ST01/ST01-002.png');
    this.load.image(ImageEnum.ST01_003_Card, 'Cards/ST01/ST01-003.png');
    this.load.image(ImageEnum.ST01_004_Card, 'Cards/ST01/ST01-004.png');
    this.load.image(ImageEnum.ST01_005_Card, 'Cards/ST01/ST01-005.png');
    this.load.image(ImageEnum.ST01_006_Card, 'Cards/ST01/ST01-006.png');
    this.load.image(ImageEnum.ST01_007_Card, 'Cards/ST01/ST01-007.png');
    this.load.image(ImageEnum.ST01_008_Card, 'Cards/ST01/ST01-008.png');
    this.load.image(ImageEnum.ST01_009_Card, 'Cards/ST01/ST01-009.png');
    this.load.image(ImageEnum.ST01_010_Card, 'Cards/ST01/ST01-010.png');
    this.load.image(ImageEnum.ST01_011_Card, 'Cards/ST01/ST01-011.png');
    this.load.image(ImageEnum.ST01_012_Card, 'Cards/ST01/ST01-012.png');
    this.load.image(ImageEnum.ST01_013_Card, 'Cards/ST01/ST01-013.png');
    this.load.image(ImageEnum.ST01_014_Card, 'Cards/ST01/ST01-014.png');
    this.load.image(ImageEnum.ST01_015_Card, 'Cards/ST01/ST01-015.png');
    this.load.image(ImageEnum.ST01_016_Card, 'Cards/ST01/ST01-016.png');
    this.load.image(ImageEnum.ST01_017_Card, 'Cards/ST01/ST01-017.png');
    // for (let index = 0; index < 50; index++) {
    //   this.load.image(index.toString(), 'deck-background.jpg');
    // }
  }

  create() {
    this.scene.start(SceneEnum.Deck);
  }

  private createBg(): void {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  private createTitleText(): void {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 4, 'ONE PIECE TCG(Trading Card Game)\nSimulador', {
        fontFamily: 'LiberationSans',
        fontSize: '48px',
        color: '#000000',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
  }

  private createLoadingText(): void {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 2 + 130, 'Carregando...', {
        fontFamily: 'LiberationSans',
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
