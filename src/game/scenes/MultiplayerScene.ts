import { ButtonBeige } from '../shared/ButtonBeige';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class MultiplayerScene extends Scene {
  constructor() {
    super(SceneEnum.Multiplayer);
  }

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createLobbyButton();
    this.createLobbyText();
    this.createPrivateButton();
    this.createPrivateText();
    this.createBackButton();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  private createLobbyButton(): void {
    const { height } = this.scale;
    const button = new ButtonBeige(this);
    button.create({
      positionX: 400,
      positionY: height / 3,
      text: 'Lobby',
    });
    button.onPointerDown(() => {
      this.scene.start(SceneEnum.Lobby);
    });
  }

  private createLobbyText(): void {
    const { height } = this.scale;
    this.add
      .text(400, height / 2.3, 'Entre aqui para jogar com lobbys públicos', {
        fontFamily: 'AlineaSans',
        fontSize: '18px',
        color: '#000000',
        align: 'center',
      })
      .setOrigin(0.5);
  }

  private createPrivateButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    button.create({
      positionX: width - 400,
      positionY: height / 3,
      text: 'Privado',
    });
    button.onPointerDown(() => {
      this.scene.start(SceneEnum.Private);
    });
  }

  private createPrivateText(): void {
    const { width, height } = this.scale;
    this.add
      .text(width - 400, height / 2.3, 'Crie seu lobby privado e envie o código\npara seu amigo', {
        fontFamily: 'AlineaSans',
        fontSize: '18px',
        color: '#000000',
        align: 'center',
      })
      .setOrigin(0.5);
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
      this.scene.start(SceneEnum.Home);
    });
  }
}
