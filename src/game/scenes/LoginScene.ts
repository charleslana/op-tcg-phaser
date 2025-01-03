import * as Phaser from 'phaser';
import { ButtonBeige } from '../shared/ButtonBeige';
import { ButtonLanguage } from '../shared/ButtonLanguage';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { useUserStore } from '@/stores/user-store';
import { Version } from '../shared/Version';

export class LoginScene extends Scene {
  constructor() {
    super(SceneEnum.Login);
  }

  private inputUsername: InputText = <InputText>{};
  private inputPassword: InputText = <InputText>{};
  private error: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};
  private registerButton: Phaser.GameObjects.Text = <Phaser.GameObjects.Text>{};

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
    const userStore = useUserStore();
    userStore.setUser({ id: 1, username: '', name: 'Jogador', decks: [] });
  }

  create() {
    this.createLoginText();
    this.createInputUsername();
    this.createInputPassword();
    this.createLoginButton();
    this.createRegisterButton();
    this.createErrorText();
    new ButtonLanguage(this);
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.inputUsername.update();
    this.inputPassword.update();
  }

  private createLoginText(): void {
    const { width, height } = this.scale;
    const textObject = this.add
      .text(width / 2, height / 5, 'Faça login para entrar', {
        fontFamily: 'AlineaSans',
        fontSize: '25px',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);
    textObject.translation = this.translation.add(textObject, {
      translationKey: 'login_text',
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

  private createLoginButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: width / 2,
      positionY: height / 1.8,
      text: 'Entrar',
      key: 'login_button',
      scaleX: 0.9,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.login(buttonCreate));
  }

  private login(button: Phaser.GameObjects.Image): void {
    console.log(`Username: ${this.inputUsername.text}`);
    console.log(`Password: ${this.inputPassword.text}`);
    const bypass = true;
    if (bypass) {
      this.scene.start(SceneEnum.Home);
      return;
    }
    this.error.setVisible(false);
    button.input!.enabled = false;
    this.registerButton.disableInteractive();
    setTimeout(() => {
      this.error.setVisible(true);
      button.input!.enabled = true;
      this.registerButton.setInteractive();
    }, 1500);
    this.loginAnimation();
  }

  private createRegisterButton(): void {
    const { width, height } = this.scale;
    this.registerButton = this.add
      .text(width / 2, height / 1.2, 'Fazer cadastro', {
        fontFamily: 'AlineaSans',
        fontSize: '25px',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true });
    this.registerButton.translation = this.translation.add(this.registerButton, {
      translationKey: 'login_register_text',
    });
    this.registerButton.on('pointerdown', () => {
      this.scene.start(SceneEnum.Register);
    });
  }

  private loginAnimation(): void {
    const onFadeOutComplete = () => {
      console.log('FadeOut animation complete');
      this.cameras.main.fadeIn(0);
    };
    this.cameras.main.once('camerafadeoutcomplete', onFadeOutComplete);
    this.cameras.main.fadeOut(1000);
    const onShakeComplete = () => {
      console.log('Shake animation complete');
    };
    this.cameras.main.once('camerashakecomplete', onShakeComplete);
    this.cameras.main.shake(1000, 0.003, false);
  }

  private createErrorText(): void {
    const { width, height } = this.scale;
    this.error = this.add
      .text(width / 2, height / 1.6, 'Erro desconhecido encontrado.', {
        fontFamily: 'AlineaSans',
        fontSize: '18px',
        color: '#000000',
      })
      .setOrigin(0.5, 0.5);
    this.error.setVisible(false);
  }
}
