import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class Boot extends Scene {
  constructor() {
    super(SceneEnum.Boot);
  }

  preload() {
    this.load.image(ImageEnum.Background, 'assets/images/background.jpg');
  }

  create() {
    this.scene.start(SceneEnum.Preloader);
  }
}
