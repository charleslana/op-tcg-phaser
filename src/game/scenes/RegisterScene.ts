import * as Phaser from 'phaser';
import { ButtonBeige } from '../shared/ButtonBeige';
import { ButtonLanguage } from '../shared/ButtonLanguage';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class RegisterScene extends Scene {
  constructor() {
    super(SceneEnum.Register);
  }

  private inputUsername: InputText = <InputText>{};
  private inputPassword: InputText = <InputText>{};
  private inputConfirmPassword: InputText = <InputText>{};
  private error: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};
  private loginButton: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createRegisterText();
    this.createInputUsername();
    this.createInputPassword();
    this.createInputConfirmPassword();
    this.createRegisterButton();
    this.createLoginButton();
    this.createErrorText();
    new ButtonLanguage(this);
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.inputUsername.update();
    this.inputPassword.update();
    this.inputConfirmPassword.update();
  }

  private createRegisterText(): void {
    const { width, height } = this.scale;
    const textObject = this.add
      .text(width / 2, height / 5, 'Faça o cadastro da sua conta', {
        fontFamily: 'AlineaSans',
        fontSize: '25px',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);
    textObject.translation = this.translation.add(textObject, {
      translationKey: 'register_text',
    });
  }

  private createInputUsername(): void {
    const { width, height } = this.scale;
    this.inputUsername = new InputText(this);
    this.inputUsername.placeholder = 'input_username';
    this.inputUsername.create();
    this.inputUsername.changePosition(width / 2, height / 3);
  }

  private createInputPassword(): void {
    const { width, height } = this.scale;
    this.inputPassword = new InputText(this);
    this.inputPassword.placeholder = 'input_username_password';
    this.inputPassword.create();
    this.inputPassword.toggleVisibility();
    this.inputPassword.changePosition(width / 2, height / 2.3);
  }

  private createInputConfirmPassword(): void {
    const { width, height } = this.scale;
    this.inputConfirmPassword = new InputText(this);
    this.inputConfirmPassword.placeholder = 'input_username_confirm_password';
    this.inputConfirmPassword.create();
    this.inputConfirmPassword.toggleVisibility();
    this.inputConfirmPassword.changePosition(width / 2, height / 1.87);
  }

  private createRegisterButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: width / 2,
      positionY: height / 1.5,
      text: 'Cadastrar',
      key: 'register_button',
      scaleX: 1.3,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.register(buttonCreate));
  }

  private register(button: Phaser.GameObjects.Image): void {
    console.log(`Username: ${this.inputUsername.text}`);
    console.log(`Password: ${this.inputPassword.text}`);
    console.log(`Confirm password: ${this.inputConfirmPassword.text}`);
    this.error.setVisible(false);
    button.input!.enabled = false;
    this.loginButton.disableInteractive();
    setTimeout(() => {
      this.error.setVisible(true);
      button.input!.enabled = true;
      this.loginButton.setInteractive();
    }, 1500);
  }

  private createLoginButton(): void {
    const { width, height } = this.scale;
    this.loginButton = this.add
      .text(width / 2, height / 1.2, 'Fazer login', {
        fontFamily: 'AlineaSans',
        fontSize: '25px',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    this.loginButton.translation = this.translation.add(this.loginButton, {
      translationKey: 'register_login_text',
    });
    this.loginButton.on('pointerdown', () => {
      this.scene.start(SceneEnum.Login);
    });
  }

  private createErrorText(): void {
    const { width, height } = this.scale;
    this.error = this.add
      .text(width / 2, height / 1.35, 'Erro desconhecido encontrado.', {
        fontFamily: 'AlineaSans',
        fontSize: '18px',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);
    this.error.setVisible(false);
  }
}
