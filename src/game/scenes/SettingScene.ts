import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class SettingScene extends Scene {
  constructor() {
    super(SceneEnum.Setting);
  }

  private inputName: InputText = <InputText>{};

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  update() {}
}
