import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class Preloader extends Scene {
  constructor() {
    super(SceneEnum.Preloader);
  }

  init() {
    this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    this.load.on('progress', (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.setPath('assets/images');
    this.load.image(ImageEnum.DeckBackground, 'deck-background.jpg');
    // for (let index = 0; index < 50; index++) {
    //   this.load.image(index.toString(), 'deck-background.jpg');
    // }
  }

  create() {
    this.scene.start(SceneEnum.MainMenu);
  }
}
