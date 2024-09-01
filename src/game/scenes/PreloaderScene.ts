import * as Phaser from 'phaser';
import { AudioEnum } from '../enums/audio-enum';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class PreloaderScene extends Scene {
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
    this.load.setPath('assets');
    this.load.image(ImageEnum.BrazilFlag, 'images/flag-brazil.png');
    this.load.image(ImageEnum.EnglishFlag, 'images/flag-english.png');
    this.load.image(ImageEnum.DeckBackground, 'images/deck-background.jpg');
    this.load.image(ImageEnum.ButtonBeige, 'images/button-beige.png');
    this.load.image(ImageEnum.PanelBeige, 'images/panel-beige.png');
    this.load.image(ImageEnum.AudioOn, 'images/audio-on.png');
    this.load.image(ImageEnum.AudioOff, 'images/audio-off.png');
    this.load.image(ImageEnum.MusicOn, 'images/music-on.png');
    this.load.image(ImageEnum.MusicOff, 'images/music-off.png');
    this.load.image(ImageEnum.DonCard, 'images/Cards/Don/Don.png');
    this.loadOPDeck1();
    this.loadStartDeck1();
    this.loadStartDeck2();
    this.loadStartDeck3();
    this.loadStartDeck4();
    this.loadAudio();
  }

  create() {
    this.scene.start(SceneEnum.Login);
  }

  private createBg(): void {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  private createTitleText(): void {
    const { width, height } = this.scale;
    const textObject = this.add
      .text(width / 2, height / 4, 'ONE PIECE TCG(Trading Card Game)\nSimulador', {
        fontFamily: 'AlineaSans',
        fontSize: '48px',
        color: '#000000',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
    textObject.translation = this.translation.add(textObject, {
      translationKey: 'logo_name',
      interpolation: ['ONE PIECE TCG(Trading Card Game'],
    });
  }

  private createLoadingText(): void {
    const { width, height } = this.scale;
    const textObject = this.add
      .text(width / 2, height / 2 + 130, 'Carregando...', {
        fontFamily: 'AlineaSans',
        fontSize: '24px',
        color: '#000000',
      })
      .setOrigin(0.5);
    textObject.translation = this.translation.add(textObject, {
      translationKey: 'loading',
      interpolation: ['...'],
    });
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

  private loadOPDeck1(): void {
    this.load.image(ImageEnum.OP01_001_Card, 'images/Cards/OP01/OP01-001.png');
    this.load.image(ImageEnum.OP01_002_Card, 'images/Cards/OP01/OP01-002.png');
    this.load.image(ImageEnum.OP01_003_Card, 'images/Cards/OP01/OP01-003.png');
  }

  private loadStartDeck1(): void {
    this.load.image(ImageEnum.ST01_001_Card, 'images/Cards/ST01/ST01-001.png');
    this.load.image(ImageEnum.ST01_002_Card, 'images/Cards/ST01/ST01-002.png');
    this.load.image(ImageEnum.ST01_003_Card, 'images/Cards/ST01/ST01-003.png');
    this.load.image(ImageEnum.ST01_004_Card, 'images/Cards/ST01/ST01-004.png');
    this.load.image(ImageEnum.ST01_005_Card, 'images/Cards/ST01/ST01-005.png');
    this.load.image(ImageEnum.ST01_006_Card, 'images/Cards/ST01/ST01-006.png');
    this.load.image(ImageEnum.ST01_007_Card, 'images/Cards/ST01/ST01-007.png');
    this.load.image(ImageEnum.ST01_008_Card, 'images/Cards/ST01/ST01-008.png');
    this.load.image(ImageEnum.ST01_009_Card, 'images/Cards/ST01/ST01-009.png');
    this.load.image(ImageEnum.ST01_010_Card, 'images/Cards/ST01/ST01-010.png');
    this.load.image(ImageEnum.ST01_011_Card, 'images/Cards/ST01/ST01-011.png');
    this.load.image(ImageEnum.ST01_012_Card, 'images/Cards/ST01/ST01-012.png');
    this.load.image(ImageEnum.ST01_013_Card, 'images/Cards/ST01/ST01-013.png');
    this.load.image(ImageEnum.ST01_014_Card, 'images/Cards/ST01/ST01-014.png');
    this.load.image(ImageEnum.ST01_015_Card, 'images/Cards/ST01/ST01-015.png');
    this.load.image(ImageEnum.ST01_016_Card, 'images/Cards/ST01/ST01-016.png');
    this.load.image(ImageEnum.ST01_017_Card, 'images/Cards/ST01/ST01-017.png');
  }

  private loadStartDeck2(): void {
    this.load.image(ImageEnum.ST02_001_Card, 'images/Cards/ST02/ST02-001.png');
    this.load.image(ImageEnum.ST02_002_Card, 'images/Cards/ST02/ST02-002.png');
    this.load.image(ImageEnum.ST02_003_Card, 'images/Cards/ST02/ST02-003.png');
    this.load.image(ImageEnum.ST02_004_Card, 'images/Cards/ST02/ST02-004.png');
    this.load.image(ImageEnum.ST02_005_Card, 'images/Cards/ST02/ST02-005.png');
    this.load.image(ImageEnum.ST02_006_Card, 'images/Cards/ST02/ST02-006.png');
    this.load.image(ImageEnum.ST02_007_Card, 'images/Cards/ST02/ST02-007.png');
    this.load.image(ImageEnum.ST02_008_Card, 'images/Cards/ST02/ST02-008.png');
    this.load.image(ImageEnum.ST02_009_Card, 'images/Cards/ST02/ST02-009.png');
    this.load.image(ImageEnum.ST02_010_Card, 'images/Cards/ST02/ST02-010.png');
    this.load.image(ImageEnum.ST02_011_Card, 'images/Cards/ST02/ST02-011.png');
    this.load.image(ImageEnum.ST02_012_Card, 'images/Cards/ST02/ST02-012.png');
    this.load.image(ImageEnum.ST02_013_Card, 'images/Cards/ST02/ST02-013.png');
    this.load.image(ImageEnum.ST02_014_Card, 'images/Cards/ST02/ST02-014.png');
    this.load.image(ImageEnum.ST02_015_Card, 'images/Cards/ST02/ST02-015.png');
    this.load.image(ImageEnum.ST02_016_Card, 'images/Cards/ST02/ST02-016.png');
    this.load.image(ImageEnum.ST02_017_Card, 'images/Cards/ST02/ST02-017.png');
  }

  private loadStartDeck3(): void {
    this.load.image(ImageEnum.ST03_001_Card, 'images/Cards/ST03/ST03-001.png');
    this.load.image(ImageEnum.ST03_002_Card, 'images/Cards/ST03/ST03-002.png');
    this.load.image(ImageEnum.ST03_003_Card, 'images/Cards/ST03/ST03-003.png');
    this.load.image(ImageEnum.ST03_004_Card, 'images/Cards/ST03/ST03-004.png');
    this.load.image(ImageEnum.ST03_005_Card, 'images/Cards/ST03/ST03-005.png');
    this.load.image(ImageEnum.ST03_006_Card, 'images/Cards/ST03/ST03-006.png');
    this.load.image(ImageEnum.ST03_007_Card, 'images/Cards/ST03/ST03-007.png');
    this.load.image(ImageEnum.ST03_008_Card, 'images/Cards/ST03/ST03-008.png');
    this.load.image(ImageEnum.ST03_009_Card, 'images/Cards/ST03/ST03-009.png');
    this.load.image(ImageEnum.ST03_010_Card, 'images/Cards/ST03/ST03-010.png');
    this.load.image(ImageEnum.ST03_011_Card, 'images/Cards/ST03/ST03-011.png');
    this.load.image(ImageEnum.ST03_012_Card, 'images/Cards/ST03/ST03-012.png');
    this.load.image(ImageEnum.ST03_013_Card, 'images/Cards/ST03/ST03-013.png');
    this.load.image(ImageEnum.ST03_014_Card, 'images/Cards/ST03/ST03-014.png');
    this.load.image(ImageEnum.ST03_015_Card, 'images/Cards/ST03/ST03-015.png');
    this.load.image(ImageEnum.ST03_016_Card, 'images/Cards/ST03/ST03-016.png');
    this.load.image(ImageEnum.ST03_017_Card, 'images/Cards/ST03/ST03-017.png');
  }

  private loadStartDeck4(): void {
    this.load.image(ImageEnum.ST04_001_Card, 'images/Cards/ST04/ST04-001.png');
    this.load.image(ImageEnum.ST04_002_Card, 'images/Cards/ST04/ST04-002.png');
    this.load.image(ImageEnum.ST04_003_Card, 'images/Cards/ST04/ST04-003.png');
    this.load.image(ImageEnum.ST04_004_Card, 'images/Cards/ST04/ST04-004.png');
    this.load.image(ImageEnum.ST04_005_Card, 'images/Cards/ST04/ST04-005.png');
    this.load.image(ImageEnum.ST04_006_Card, 'images/Cards/ST04/ST04-006.png');
    this.load.image(ImageEnum.ST04_007_Card, 'images/Cards/ST04/ST04-007.png');
    this.load.image(ImageEnum.ST04_008_Card, 'images/Cards/ST04/ST04-008.png');
    this.load.image(ImageEnum.ST04_009_Card, 'images/Cards/ST04/ST04-009.png');
    this.load.image(ImageEnum.ST04_010_Card, 'images/Cards/ST04/ST04-010.png');
    this.load.image(ImageEnum.ST04_011_Card, 'images/Cards/ST04/ST04-011.png');
    this.load.image(ImageEnum.ST04_012_Card, 'images/Cards/ST04/ST04-012.png');
    this.load.image(ImageEnum.ST04_013_Card, 'images/Cards/ST04/ST04-013.png');
    this.load.image(ImageEnum.ST04_014_Card, 'images/Cards/ST04/ST04-014.png');
    this.load.image(ImageEnum.ST04_015_Card, 'images/Cards/ST04/ST04-015.png');
    this.load.image(ImageEnum.ST04_016_Card, 'images/Cards/ST04/ST04-016.png');
    this.load.image(ImageEnum.ST04_017_Card, 'images/Cards/ST04/ST04-017.png');
  }

  private loadAudio(): void {
    this.load.audio(AudioEnum.Background, 'audio/background.ogg');
    this.load.audio(AudioEnum.Click, 'audio/click.ogg');
  }
}
