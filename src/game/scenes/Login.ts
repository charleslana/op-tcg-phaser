import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class Login extends Scene {
  constructor() {
    super(SceneEnum.Login);
  }

  private inputUsername: InputText = <InputText>{};
  private inputPassword: InputText = <InputText>{};

  init() {
    this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
  }

  create() {
    this.createLoginText();
    this.createInputUsername();
    this.createInputPassword();
    this.createLoginButton();
    this.createRegisterButton();
    this.createVersionText();
    EventBus.emit('current-scene-ready', this);
  }

  update(): void {
    this.inputUsername.update();
    this.inputPassword.update();
  }

  private createLoginText(): void {
    const { width, height } = this.scale;
    this.add
      .text(width / 2, height / 5, 'Faça login para entrar', {
        font: '25px Arial',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);
  }

  private createInputUsername(): void {
    const { width, height } = this.scale;
    this.inputUsername = new InputText(this);
    this.inputUsername.placeholder = 'Digite o username';
    this.inputUsername.create();
    this.inputUsername.changePosition(width / 2, height / 3);
  }

  private createInputPassword(): void {
    const { width, height } = this.scale;
    this.inputPassword = new InputText(this);
    this.inputPassword.placeholder = 'Digite a senha';
    this.inputPassword.create();
    this.inputPassword.toggleVisibility();
    this.inputPassword.changePosition(width / 2, height / 2.3);
  }

  private createLoginButton(): void {
    const { width, height } = this.scale;
    const startGameButton = this.add.image(550, 400, ImageEnum.StoneButtonReady);
    startGameButton.setScale(1.2, 0.6).setInteractive();
    startGameButton.setPosition(width / 2, height / 1.8);
    const buttonTextConfig = { fontSize: '28px', fill: '#000000' };
    const startGameText = this.add.text(470, 387, 'Login', buttonTextConfig);
    startGameText.setOrigin(0.5, 0.5);
    startGameText.setPosition(startGameButton.x, startGameButton.y);
    startGameButton.on('pointerdown', () => this.startGame());
    this.animateButton(startGameButton);
  }

  private startGame() {
    console.log(`Username: ${this.inputUsername.text}`);
    console.log(`Password: ${this.inputPassword.text}`);
    // const onFadeOutComplete = () => {
    //   console.log('FadeOut animation complete');
    // };
    // this.cameras.main.once('camerafadeoutcomplete', onFadeOutComplete);
    // this.cameras.main.fadeOut(1000);
    // const onShakeComplete = () => {
    //   console.log('Shake animation complete');
    // };
    // this.cameras.main.once('camerashakecomplete', onShakeComplete);
    // this.cameras.main.shake(1000, 0.003, false);
  }

  private animateButton(button: Phaser.GameObjects.Image) {
    button.on('pointerover', function () {
      button.setTexture(ImageEnum.StoneButtonHovered);
    });
    button.on('pointerout', function () {
      button.setTexture(ImageEnum.StoneButtonReady);
    });
  }

  private createRegisterButton(): void {
    const { width, height } = this.scale;
    const button = this.add
      .text(width / 2, height / 1.2, 'Fazer cadastro', {
        font: '25px Arial',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    button.on('pointerdown', () => {
      this.scene.start(SceneEnum.Register);
    });
  }

  private createVersionText(): void {
    const { width, height } = this.scale;
    this.add
      .text(width - 10, height - 10, 'versão 1.0.0', {
        font: '14px Arial',
        color: '#000000',
      })
      .setOrigin(1, 1);
  }
}
