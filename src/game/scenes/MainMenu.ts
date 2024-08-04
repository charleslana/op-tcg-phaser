import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { ImageEnum } from '../enums/image-enum';

export class MainMenu extends Scene {
  constructor() {
    super(SceneEnum.MainMenu);
  }

  init() {
    this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
  }

  create() {
    EventBus.emit('current-scene-ready', this);
  }
}
