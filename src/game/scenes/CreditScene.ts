import { ButtonBeige } from '../shared/ButtonBeige';
import { EventBus } from '../EventBus';
import { ImageEnum } from '../enums/image-enum';
import { Scene } from 'phaser';
import { SceneEnum } from '../enums/scene-enum';
import { Version } from '../shared/Version';

export class CreditScene extends Scene {
  constructor() {
    super(SceneEnum.Credit);
  }

  init() {
    const backgroundImage = this.add.image(0, 0, ImageEnum.Background).setOrigin(0);
    backgroundImage.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
  }

  create() {
    this.createByText();
    this.createDiscordButton();
    this.createCreditsText();
    this.createCreditListText();
    this.createBackButton();
    new Version(this);
    EventBus.emit('current-scene-ready', this);
  }

  private createByText(): void {
    this.add
      .text(200, 100, 'Desenvolvido por\nCharles', {
        fontSize: '25px',
        color: '#000000',
        fontFamily: 'AlineaSans',
        align: 'center',
      })
      .setOrigin(0);
  }

  private createDiscordButton(): void {
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: 300,
      positionY: 250,
      text: 'Discord',
      scaleX: 1.3,
      scaleY: 2,
    });
    buttonCreate.on('pointerdown', () => window.open('https://discord.gg/seulink', '_blank'));
  }

  private createCreditsText(): void {
    const { width } = this.scale;
    this.add
      .text(width - width / 3, 100, 'Agradecimentos e créditos:', {
        fontSize: '25px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      })
      .setOrigin(0);
  }

  private createCreditListText(): void {
    const { width } = this.scale;
    const lines = [
      'One Piece',
      'Inspirado em One Piece TCG Online Simulator por Batsu',
      'onlinewebfonts (Alinea Sans W01 Regular font)',
      'Phaser3',
      'rexUI Plugins',
      'phaser-font-plugin',
    ];
    const text = lines.join('\n');
    this.add
      .text(width - width / 3, 170, text, {
        fontSize: '20px',
        color: '#000000',
        fontFamily: 'AlineaSans',
      })
      .setOrigin(0);
  }

  private createBackButton(): void {
    const { height } = this.scale;
    const button = new ButtonBeige(this);
    const buttonCreate = button.create({
      positionX: 120,
      positionY: height / 1.1,
      text: 'Voltar',
      scaleX: 0.7,
      scaleY: 1.5,
    });
    buttonCreate.on('pointerdown', () => this.scene.start(SceneEnum.Home));
  }
}
