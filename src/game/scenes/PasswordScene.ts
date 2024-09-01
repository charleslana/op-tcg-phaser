import { ButtonBeige } from '../shared/ButtonBeige';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { InputText } from '../shared/InputText';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Toast } from '../shared/Toast';
import { Version } from '../shared/Version';

export class PasswordScene extends Scene {
  constructor() {
    super(SceneEnum.Password);
  }

  private offsetY = 200;
  private inputCurrentPassword: InputText = <InputText>{};
  private inputNewPassword: InputText = <InputText>{};
  private inputConfirmPassword: InputText = <InputText>{};
  private toast: Toast = <Toast>{};

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.toast = new Toast(this);
    this.createCurrentPasswordText();
    this.createInputCurrentPassword();
    this.createNewPasswordText();
    this.createInputNewPassword();
    this.createConfirmPasswordText();
    this.createInputConfirmPassword();
    this.createUpdateButton();
    this.createBackButton();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    this.inputCurrentPassword.update();
    this.inputNewPassword.update();
    this.inputConfirmPassword.update();
  }

  private createCurrentPasswordText(): void {
    const { width } = this.scale;
    this.add
      .text(width / 2, 50 + this.offsetY, 'Senha atual', {
        fontSize: '20px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      })
      .setOrigin(0.5);
  }

  private createInputCurrentPassword(): void {
    const { width } = this.scale;
    this.inputCurrentPassword = new InputText(this);
    this.inputCurrentPassword.placeholder = '';
    this.inputCurrentPassword.create();
    this.inputCurrentPassword.toggleVisibility();
    this.inputCurrentPassword.changePosition(width / 2, 110 + this.offsetY);
  }

  private createNewPasswordText(): void {
    const { width } = this.scale;
    this.add
      .text(width / 2, 180 + this.offsetY, 'Nova senha', {
        fontSize: '20px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      })
      .setOrigin(0.5);
  }

  private createInputNewPassword(): void {
    const { width } = this.scale;
    this.inputNewPassword = new InputText(this);
    this.inputNewPassword.placeholder = '';
    this.inputNewPassword.create();
    this.inputNewPassword.toggleVisibility();
    this.inputNewPassword.changePosition(width / 2, 240 + this.offsetY);
  }

  private createConfirmPasswordText(): void {
    const { width } = this.scale;
    this.add
      .text(width / 2, 310 + this.offsetY, 'Confirmar senha', {
        fontSize: '20px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      })
      .setOrigin(0.5);
  }

  private createInputConfirmPassword(): void {
    const { width } = this.scale;
    this.inputConfirmPassword = new InputText(this);
    this.inputConfirmPassword.placeholder = '';
    this.inputConfirmPassword.create();
    this.inputConfirmPassword.toggleVisibility();
    this.inputConfirmPassword.changePosition(width / 2, 370 + this.offsetY);
  }

  private createUpdateButton(): void {
    const { width } = this.scale;
    const button = new ButtonBeige(this);
    button.create({
      positionX: width / 2,
      positionY: 480 + this.offsetY,
      text: 'Alterar',
      key: 'update_button',
      scaleX: 0.7,
      scaleY: 1.5,
    });
    button.onPointerDown(() => {
      this.updatePassword();
    });
  }

  private updatePassword(): void {
    this.toast.show('A senha atual é inválida');
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
      this.scene.start(SceneEnum.Setting);
    });
  }
}
