import * as Phaser from 'phaser';
import { ButtonBeige } from '../shared/ButtonBeige';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class HomeScene extends Scene {
  constructor() {
    super(SceneEnum.Home);
  }

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createMultiplayerButton();
    this.createLogoutButton();
    this.createDeckButton();
    this.createAudioIcon();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  private createMultiplayerButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: width / 2,
      positionY: height / 3,
      text: 'Multijogador',
    });
    buttonCreate.on('pointerdown', () => null);
  }

  private createLogoutButton(): void {
    const { width } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: width - 100,
      positionY: 50,
      text: 'Sair',
      scaleX: 0.7,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Login));
    this.createUserNameText(buttonCreate);
  }

  private createUserNameText(buttonImage: Phaser.GameObjects.Image): void {
    const distance = 20;
    this.add
      .text(buttonImage.x - buttonImage.displayWidth / 2 - distance, buttonImage.y, 'Charles', {
        fontSize: '45px',
        color: '#000000',
        fontFamily: 'LiberationSans',
      })
      .setOrigin(1, 0.5);
  }

  private createDeckButton(): void {
    const { height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: 200,
      positionY: height / 1.8,
      text: 'Deck',
      scaleX: 0.7,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Deck));
  }

  private createAudioIcon(): void {
    const { width } = this.scale;
    const button = this.add.image(550, 400, ImageEnum.PanelBeige);
    button.setScale(0.7, 0.7).setInteractive();
    button.setPosition(width - 200, 200);
    const icon = this.add.image(button.x, button.y, ImageEnum.AudioOn);
    icon.setScale(1.2, 1.2);
    icon.setOrigin(0.5, 0.5);
    icon.setPosition(button.x, button.y);
    button.on('pointerdown', () => {
      this.toggleAudioIcon(icon);
    });
  }

  private toggleAudioIcon(icon: Phaser.GameObjects.Image): void {
    if (icon.texture.key === ImageEnum.AudioOn) {
      icon.setTexture(ImageEnum.AudioOff);
    } else {
      icon.setTexture(ImageEnum.AudioOn);
    }
  }
}
