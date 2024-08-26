import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class BootScene extends Scene {
  constructor() {
    super(SceneEnum.Boot);
  }

  preload() {
    this.load.image(ImageEnum.Background, 'assets/images/background.jpg');
    this.load.font('AlineaSans', 'assets/fonts/AlineaSansW01Regular.ttf');
  }

  create() {
    this.scene.start(SceneEnum.Preloader);
  }
}
