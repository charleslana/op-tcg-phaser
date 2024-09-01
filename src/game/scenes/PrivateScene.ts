import { ButtonBeige } from '../shared/ButtonBeige';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class PrivateScene extends Scene {
  constructor() {
    super(SceneEnum.Private);
  }

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createText();
    this.createBackButton();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  private createText(): void {
    this.add
      .text(0, 0, 'Privado', {
        fontSize: '45px',
        color: '#000000',
        fontFamily: 'AlineaSans',
        align: 'center',
      })
      .setOrigin(0);
  }

  private createBackButton(): void {
    const { height } = this.scale;
    const button = new ButtonBeige(this);
    button.create({
      positionX: 120,
      positionY: height / 1.1,
      text: 'Voltar',
      key: 'back_button',
      scaleX: 0.7,
      scaleY: 1.5,
    });
    button.onPointerDown(() => {
      this.scene.start(SceneEnum.Multiplayer);
    });
  }
}
