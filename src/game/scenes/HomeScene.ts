import * as Phaser from 'phaser';
import { ButtonBeige } from '../shared/ButtonBeige';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { useSettingsStore } from '@/stores/settings-store';
import { Version } from '../shared/Version';

export class HomeScene extends Scene {
  constructor() {
    super(SceneEnum.Home);
  }

  private settingsStore = useSettingsStore();

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createMultiplayerButton();
    this.createLogoutButton();
    this.createDeckButton();
    this.validateAudioMusicIcon();
    this.createAudioIcon();
    this.createMusicIcon();
    this.createSettingsButton();
    this.createCreditsButton();
    this.createHowToPlayButton();
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
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Multiplayer));
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
    buttonCreate.on('pointerdown', () => this.logout());
    this.createUserNameText(buttonCreate);
  }

  private logout(): void {
    this.scene.start(SceneEnum.Login);
  }

  private createUserNameText(buttonImage: Phaser.GameObjects.Image): void {
    const distance = 20;
    this.add
      .text(
        buttonImage.x - buttonImage.displayWidth / 2 - distance,
        buttonImage.y,
        'Jogador00001',
        {
          fontSize: '45px',
          color: '#000000',
          fontFamily: 'AlineaSans',
        }
      )
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

  private validateAudioMusicIcon(): void {
    this.settingsStore.initializeSettings();
  }

  private createAudioIcon(): void {
    const { width } = this.scale;
    const button = this.add.image(550, 400, ImageEnum.PanelBeige);
    button.setScale(0.7, 0.7).setInteractive();
    button.setPosition(width - 200, 200);
    const image = this.settingsStore.audio ? ImageEnum.AudioOn : ImageEnum.AudioOff;
    const icon = this.add.image(button.x, button.y, image);
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
      this.settingsStore.setAudio(false);
    } else {
      icon.setTexture(ImageEnum.AudioOn);
      this.settingsStore.setAudio(true);
    }
  }

  private createMusicIcon(): void {
    const { width } = this.scale;
    const button = this.add.image(550, 400, ImageEnum.PanelBeige);
    button.setScale(0.7, 0.7).setInteractive();
    button.setPosition(width - 200, 300);
    const image = this.settingsStore.music ? ImageEnum.MusicOn : ImageEnum.MusicOff;
    const icon = this.add.image(button.x, button.y, image);
    icon.setScale(1.2, 1.2);
    icon.setOrigin(0.5, 0.5);
    icon.setPosition(button.x, button.y);
    button.on('pointerdown', () => {
      this.toggleMusicIcon(icon);
    });
  }

  private toggleMusicIcon(icon: Phaser.GameObjects.Image): void {
    if (icon.texture.key === ImageEnum.MusicOn) {
      icon.setTexture(ImageEnum.MusicOff);
      this.settingsStore.setMusic(false);
    } else {
      icon.setTexture(ImageEnum.MusicOn);
      this.settingsStore.setMusic(true);
    }
  }

  private createSettingsButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: width - 300,
      positionY: height / 1.8,
      text: 'Configurações',
      scaleX: 1.5,
      scaleY: 1.7,
    });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Setting));
  }

  private createCreditsButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: width - 300,
      positionY: height / 1.3,
      text: 'Créditos',
      scaleX: 1,
      scaleY: 1.7,
    });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Credit));
  }

  private createHowToPlayButton(): void {
    const { height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: 200,
      positionY: height / 1.3,
      text: 'Como jogar',
      scaleX: 1.3,
      scaleY: 1.7,
    });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.HowToPlay));
  }
}
