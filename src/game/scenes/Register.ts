import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class Register extends Scene {
  constructor() {
    super(SceneEnum.Register);
  }

  init() {
    this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
  }

  create() {
    this.createLoginButton();
    this.createVersionText();
    EventBus.emit('current-scene-ready', this);
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
