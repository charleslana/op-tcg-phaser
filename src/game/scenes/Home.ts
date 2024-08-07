import { ButtonBeige } from '../shared/ButtonBeige';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';

export class Home extends Scene {
  constructor() {
    super(SceneEnum.Home);
  }

  init() {
    this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
  }

  create() {
    this.createMultiplayerButton();
    this.createLogoutButton();
  }

  private createMultiplayerButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create(width / 2, height / 3, 'Multiplayer', {});
    buttonCreate.on('pointerdown', () => null);
  }

  private createLogoutButton(): void {
    const { width, height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create(width - 100, 50, 'Sair', { scaleX: 0.7, scaleY: 1.5 });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Login));
  }
}
