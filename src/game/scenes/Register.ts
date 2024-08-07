import { Button } from '../shared/Button';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class Register extends Scene {
  constructor() {
    super(SceneEnum.Register);
  }

  private inputUsername: InputText = <InputText>{};
  private inputPassword: InputText = <InputText>{};
  private inputConfirmPassword: InputText = <InputText>{};
  private error: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};

  init() {
    this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
  }

  create() {
    this.createRegisterText();
    this.createInputUsername();
    this.createInputPassword();
    this.createInputConfirmPassword();
    this.createRegisterButton();
    this.createLoginButton();
    this.createErrorText();
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
    this.add
      .text(width / 2, height / 5, 'Faça o cadastro da sua conta', {
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

  private createInputConfirmPassword(): void {
    const { width, height } = this.scale;
    this.inputConfirmPassword = new InputText(this);
    this.inputConfirmPassword.placeholder = 'Confirme a senha';
    this.inputConfirmPassword.create();
    this.inputConfirmPassword.toggleVisibility();
    this.inputConfirmPassword.changePosition(width / 2, height / 1.87);
  }

  private createRegisterButton(): void {
    const { width, height } = this.scale;
    const button = new Button(this);
    const buttonCreate = button.create(width / 2, height / 1.5, 'Cadastrar');
    buttonCreate.on('pointerdown', () => this.register(buttonCreate));
  }

  private register(button: Phaser.GameObjects.Image): void {
    console.log(`Username: ${this.inputUsername.text}`);
    console.log(`Password: ${this.inputPassword.text}`);
    console.log(`Confirm password: ${this.inputConfirmPassword.text}`);
    this.error.setVisible(false);
    button.input!.enabled = false;
    setTimeout(() => {
      this.error.setVisible(true);
      button.input!.enabled = true;
    }, 1500);
  }

  private createLoginButton(): void {
    const { width, height } = this.scale;
    const button = this.add
      .text(width / 2, height / 1.2, 'Fazer login', {
        font: '25px Arial',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    button.on('pointerdown', () => {
      this.scene.start(SceneEnum.Login);
    });
  }

  private createErrorText(): void {
    const { width, height } = this.scale;
    this.error = this.add
      .text(width / 2, height / 1.35, 'Error desconhecido encontrado.', {
        font: '18px Arial',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);
    this.error.setVisible(false);
  }
}
