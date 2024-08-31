import { ButtonAudio } from '../shared/ButtonAudio';
import { ButtonBeige } from '../shared/ButtonBeige';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class LobbyScene extends Scene {
  constructor() {
    super(SceneEnum.Lobby);
  }

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createText();
    new ButtonAudio(this);
    this.createBackButton();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  private createText(): void {
    this.add
      .text(0, 0, 'Lobby', {
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
      scaleX: 0.7,
      scaleY: 1.5,
    });
    button.onPointerDown(() => {
      this.scene.start(SceneEnum.Multiplayer);
    });
  }
}
